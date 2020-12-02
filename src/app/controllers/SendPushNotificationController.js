import OneSignalClient from 'node-onesignal-api';
import PushNotification from '../models/PushNotification';

class SendPushNotificationController {
  async send(req, res) {
    const { id } = req.params;
    const { message } = req.body;

    const user = await PushNotification.findAll({
      where: {
        user_id: id,
      },
    });

    const userId = user.map(item => item.user_id_push);

    const client = new OneSignalClient({
      appId: process.env.ONE_SIGNAL_APP_ID,
      restApiKey: process.env.ONE_SIGNAL_API_KEY,
    });

    client
      .createNotification({
        contents: {
          contents: message,
        },
        specific: {
          include_player_ids: userId,
        },

        attachments: {
          data: {
            hello: 'world',
          },
        },
      })
      .then(success => {
        console.log(success);
      });

    return res.json({
      ok: true,
    });
  }
}
export default new SendPushNotificationController();
