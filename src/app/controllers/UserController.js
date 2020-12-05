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

    const { id, name, email } = user;

    return res.json({
      id,
      name,
      email,
      token: jwt.sign({ id }, authConfig.hash, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(401).json({ error: 'User already exists' });
      }
    }

    if (oldPassword && !(await user.check(oldPassword))) {
      return res.status(401).json({ error: 'password does not match' });
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({
      email,
      name,
      provider,
      id,
    });
  }
}

export default new UserController();
