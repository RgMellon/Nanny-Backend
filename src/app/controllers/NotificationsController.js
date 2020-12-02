import Notification from '../schemas/Notification';
import Petshop from '../models/Petshop';

class NotificationsController {
  async index(req, res) {
    const { userId } = req;

    const isOwner = await Petshop.findOne({
      where: {
        user_id: userId,
      },
    });

    if (!isOwner) {
      return res.status(400).json({ error: 'this user dont have petshop' });
    }

    const notifications = await Notification.find({
      petshop: isOwner.id,
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

  async delete(req, res) {
    // const { userId } = req;

    try {
      await Notification.deleteMany({
        petshop: 4,
      });
    } catch (e) {
      console.tron.log(e);
      return res.status(400).json({ error: 'problem remove' });
    }
  }
}

export default new NotificationsController();
