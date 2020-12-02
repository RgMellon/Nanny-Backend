import User from '../models/User';
import * as Yup from 'yup';

class UserDataController {
  async store(req, res) {
    const schema = Yup.object().shape({
      cep: Yup.string(),
      district: Yup.string(),
      address: Yup.string(),
      city: Yup.string(),
      phone: Yup.string(),
      address_number: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { userId } = req;

    const {
      cep,
      district,
      address,
      state,
      city,
      phone,
      address_number,
    } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(401).json({ error: 'User doesnt exists' });
    }

    try {
      const updatedUser = await user.update({
        cep,
        district,
        address,
        state,
        city,
        phone,
        address_number,
      });

      return res.json({
        user: updatedUser,
      });
    } catch (e) {
      console.log(e);

      return res.status(400).json({
        error: 'Fail to update user',
      });
    }
  }
}

export default new UserDataController();
