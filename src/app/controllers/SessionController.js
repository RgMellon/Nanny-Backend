import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import * as Yup from 'yup';

import authConfig from '../../config/auth';

import User from '../schemas/User';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) return res.status(401).json({ error: 'Users not found' });

    if (!(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ error: 'password does not match' });

    const { id, name } = user;

    return res.json({
      user: {
        name,
        email,
        id,
      },
      token: jwt.sign({ id }, authConfig.hash, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
