import * as Yup from 'yup';

import Host from '../schemas/Host';
import HostCategory from '../schemas/HostCategory';
import User from '../schemas/User';
import Star from '../schemas/Star';

import { getAverageStars } from '../services/getAverageStars';

class HostController {
  async store(req, res) {
    const schema = Yup.object().shape({
      city: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      phone: Yup.string().required(),
      about: Yup.string().required(),
      category_id: Yup.array().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // eslint-disable-next-line object-curly-newline
    const { city, email, phone, about, services, category_id } = req.body;
    const { userId } = req;

    const userAlreadyExist = await Host.findOne({ phone });

    if (userAlreadyExist) {
      return res.status(400).json({ error: 'You already a host' });
    }

    const { name, _id } = await User.findOne({ _id: userId });

    await Host.create({
      city,
      email,
      phone,
      about,
      user_id: userId,
      services,
      name,
    });

    // eslint-disable-next-line arrow-parens
    category_id.forEach(async category => {
      await HostCategory.create({
        category_id: category,
        user: {
          user_id: _id,
          name,
          email,
        },
      });
    });

    return res.json({
      message: 'Host created with success',
    });
  }

  async index(_, res) {
    const hosts = await Host.find();

    // eslint-disable-next-line arrow-parens
    const hostWithRating = hosts.map(async host => {
      const rate = await Star.find({ user_id: host.user_id });

      const averageRate = getAverageStars(rate);
      return {
        host,
        rate: averageRate,
      };
    });

    return res.json({
      hosts: await Promise.all(hostWithRating),
    });
  }
}

export default new HostController();
