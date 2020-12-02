import User from '../models/User';

class VerifyRegisterController {
  async verify(req, res) {
    const { userId } = req;

    const user = await User.findByPk(userId);

    console.log(user);

    return res.json({
      user,
    });
  }
}

export default new VerifyRegisterController();
