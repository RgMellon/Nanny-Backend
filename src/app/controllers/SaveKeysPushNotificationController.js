import PushNotification from '../../app/models/PushNotification';

class SaveKeysPushNotificationController {
  async store(req, res) {
    const { userId } = req;
    const { user_id_push, push_token } = req.body;

    const configUser = await PushNotification.findOne({
      where: {
        user_id: userId,
        push_token,
        user_id_push,
      },
    });

    if (!configUser) {
      try {
        PushNotification.create({
          push_token,
          user_id_push,
          user_id: userId,
        });

        return res.json({
          message: 'configs saved',
        });
      } catch (e) {
        return res.status(400).json({
          message: 'configs not created',
        });
      }
    }

    return res.json({
      message: 'configs already saved',
    });
  }

  async get(req, res) {
    const all = await PushNotification.findAll();

    return res.json({
      pushs: all,
    });
  }
}
export default new SaveKeysPushNotificationController();
