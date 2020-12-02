import PushMessage from '../models/PushMessage';
import Petshop from '../models/Petshop';

class PushMessageController {
  async save(req, res) {
    const { petshopId } = req.params;
    const { message, status, user_id } = req.body;

    try {
      const push = await PushMessage.create({
        message,
        petshop_id: petshopId,
        status,
        user_id,
      });

      return res.json({
        message: 'Push saved with success',
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        error: true,
        message: 'Error save push',
      });
    }
  }

  async all(req, res) {
    const { userId } = req;

    try {
      const notifications = await PushMessage.findAll({
        where: {
          user_id: userId,
        },

        include: [
          {
            model: Petshop,
            as: 'petshop',
            attributes: ['id', 'name', 'url_avatar', 'address', 'avatar'],
          },
        ],
        order: ['created_at'],
      });

      return res.json({
        notifications,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        error: true,
        message: 'failed find push message',
      });
    }
  }

  async delete(req, res) {
    try {
      await PushMessage.destroy({ truncate: true });

      return res.json({
        message: 'deleted with sucess',
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        error: true,
        message: 'failed delete',
      });
    }
  }

  async update(req, res) {
    const { idNotification } = req.params;

    try {
      const notification = await PushMessage.findOne({
        where: {
          id: idNotification,
        },
      });

      await notification.update({ read: true });

      return res.json({
        message: 'read change with sucess',
      });
    } catch (e) {
      console.log(error);
      return res.status(400).json({
        error: 'error update notification status',
      });
    }
  }
}

export default new PushMessageController();
