import OneSignalClient from 'node-onesignal-api';
import PushNotification from '../models/PushNotification';
import Petshop from '../models/Petshop';

class SendPushNotificationToPetshopController {
  async send(req, res) {
    const { petshopId } = req.params;
    const { message } = req.body;

    const petshop = await Petshop.findByPk(petshopId);

    const user = await PushNotification.findAll({
      where: {
        user_id: petshop.user_id,
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
      ok: 'push send with success',
    });
  }
}
export default new SendPushNotificationToPetshopController();
