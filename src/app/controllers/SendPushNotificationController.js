import { Expo } from 'expo-server-sdk';

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
}

export default new SendPushNotificationController();
