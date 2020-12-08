import KeyPushNotification from '../schemas/KeyPushNotification';

class SaveKeysPushNotificationController {
  async store(req, res) {
    const { push_token } = req.body;

    const { userId } = req;

    const findTokenUser = await KeyPushNotification.findOne({
      user_id: userId,
    });

    if (!findTokenUser) {
      await KeyPushNotification.create({
        user_id: userId,
        push_token,
      });
    }

    if (findTokenUser.push_token === push_token) {
      return res.json({ message: 'All set!' });
    }

    if (findTokenUser.push_token !== push_token) {
      await KeyPushNotification.update({ user_id: userId }, { push_token });
      return res.json({ message: 'Update with sucess' });
    }

    return res.json({
      message: 'Token saved with sucess',
    });
  }
}
export default new SaveKeysPushNotificationController();
