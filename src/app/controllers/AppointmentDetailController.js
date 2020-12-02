import Appointment from '../models/Appointment';
import Petshop from '../models/Petshop';
import Pet from '../models/Pet';
import Procedure from '../models/Procedure';
import User from '../models/User';

import { format, parseISO, isBefore, subHours } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

import pt from 'date-fns/locale/pt-BR';

import * as Yup from 'yup';

import Notification from '../schemas/Notification';
import User from '../models/User';

class AppointmentDetailController {
  async index(req, res) {
    const { userId } = req;

    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: Pet,
          as: 'pets',
          attributes: ['id', 'name', 'url', 'avatar'],
        },

        {
          model: Procedure,
          as: 'procedure',
          attributes: ['id', 'title', 'url', 'avatar'],
        },

        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
      order: ['date'],
    });

    return res.json({
      appointment: appointment,
    });
  }
}
export default new AppointmentDetailController();
