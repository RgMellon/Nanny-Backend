import Appointment from '../models/Appointment';
import Pet from '../models/Pet';
import Procedure from '../models/Procedure';
import User from '../models/User';
// import { format, parseISO, isBefore, subHours } from 'date-fns';
// import { zonedTimeToUtc } from 'date-fns-tz';

class LastAppointmentController {
  async last(req, res) {
    const { id } = req.params;

    const lastAppointment = await Appointment.findOne({
      where: {
        petshop_id: id,
      },
      attributes: ['id', 'date'],
      include: [
        {
          model: Pet,
          as: 'pets',
          attributes: ['id', 'url', 'avatar'],
        },
        {
          model: Procedure,
          as: 'procedure',
          attributes: ['id', 'title'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    return res.json({
      appointment: lastAppointment,
    });
  }
}
export default new LastAppointmentController();
