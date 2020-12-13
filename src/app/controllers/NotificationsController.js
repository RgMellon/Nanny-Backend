import Notification from '../schemas/Notification';
import User from '../schemas/User';

class NotificationsController {
  async index(req, res) {
    const { userId } = req;

    const notifications = await Notification.find({
      user_id: userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    const { id } = req.params;
    // const notification = await Notification.findById(id);

    const notification = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

    return res.json(notification);
  }

  async store(req, res) {
    const { title, content, user_id, phone } = req.body;

    const { userId } = req;

    const userLogged = await User.findOne({ _id: userId });

    const payloadUser = {
      title,
      content,
      user: {
        phone,
        name: userLogged.name,
        // eslint-disable-next-line no-underscore-dangle
        user_id: userLogged._id,
        image: userLogged.image,
        email: userLogged.email,
      },
      user_id,
      status: false,
    };

    await Notification.create(payloadUser);

    return res.json({ message: 'Sended Notification' });
  }

  async find(req, res) {
    const { id_notification } = req.query;

    const notification = await Notification.findOne({
      _id: id_notification,
    });

    return res.json({ notification });
  }
}

export default new NotificationsController();
