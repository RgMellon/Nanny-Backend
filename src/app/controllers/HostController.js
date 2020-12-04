import * as Yup from 'yup';

import Host from '../schemas/Host';

class HostController {
  async store(req, res) {
    const schema = Yup.object().shape({
      city: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      phone: Yup.string().required(),
      about: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // eslint-disable-next-line object-curly-newline
    const { city, email, phone, about, services } = req.body;
    const { userId } = req;

    const userAlreadyExist = await Host.findOne({ phone });

    if (userAlreadyExist) {
      return res.status(400).json({ error: 'You already a host' });
    }

    await Host.create({
      city,
      email,
      phone,
      about,
      user_id: userId,
      services,
    });

    return res.json({
      message: 'Host created with success',
    });
  }

  async index(_, res) {
    const hosts = await Host.find();

    return res.json({
      hosts,
    });
  }
}

export default new HostController();
