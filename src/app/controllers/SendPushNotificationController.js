import { Expo } from 'expo-server-sdk';

import KeyPushNotificationSchema from '../schemas/KeyPushNotification';

const expo = new Expo({});

class SendPushNotificationController {
  async send(req, res) {
    const { pushId, body, title } = req.body;

    const message = [
      {
        to: pushId,
        sound: 'default',
        title,
        body,
        data: { withSome: 'data' },
        priority: 'high',
      },
    ];

    expo.chunkPushNotifications(message);

    const chunk = expo.chunkPushNotifications(message);

    await expo.sendPushNotificationsAsync(chunk[0]);

    return res.json({
      message: 'Push sended with sucess',
    });
  }

  async sendUser(req, res) {
    const { body, title, user_id } = req.body;

    const { push_token } = await KeyPushNotificationSchema.findOne({
      user_id,
    });

    const message = [
      {
        to: push_token,
        sound: 'default',
        title,
        body,
        data: { withSome: 'data' },
        priority: 'high',
      },
    ];

    expo.chunkPushNotifications(message);

    const chunk = expo.chunkPushNotifications(message);

    await expo.sendPushNotificationsAsync(chunk[0]);

    return res.json({
      message: 'Push sended with sucess',
    });
  }
}

export default new SendPushNotificationController();
