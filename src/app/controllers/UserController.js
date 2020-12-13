import * as Yup from 'yup';

import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

// import User from '../models/User';
import User from '../schemas/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const existsUser = await User.findOne({ email: req.body.email });

    if (existsUser) {
      return res.status(400).json({ error: 'users already exists' });
    }

    const user = await User.create(req.body);

    const { id, name, email, image } = user;

    return res.json({
      id,
      name,
      email,
      image,
      token: jwt.sign({ id }, authConfig.hash, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async update(req, res) {
    const { filename: avatar } = req.file;
    const { userId } = req;

    await User.update(
      { _id: userId },
      { image: avatar, name: req.body.name, email: req.body.email }
    );

    const { name, email, image, _id, url } = await User.findOne({
      _id: userId,
    });

    return res.json({
      name,
      email,
      image,
      _id,
      url,
    });
  }
}

export default new UserController();
