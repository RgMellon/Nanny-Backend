import Appointment from '../models/Appointment';
import Pet from '../models/Pet';
import Procedure from '../models/Procedure';
import User from '../models/User';

import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

class FilterAppointmentController {
  async index(req, res) {
    const { date, page = 1, status = 0 } = req.query;
    const { id } = req.params;

    const parseDate = parseISO(date);

    const appointments = await Appointment.findAll({
      where: {
        date: {
          [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)],
        },
        petshop_id: id,
      },

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
      order: ['date'],
    });

    const pending = await appointments.filter(item => item.status == 0);
    const finished = await appointments.filter(item => item.status == 1);
    const canceled = await appointments.filter(item => item.status == 2);

    const obj = {
      0: pending,
      1: finished,
      2: canceled,
    };

    const filtredAppointments = obj[status];

    return res.json({
      appointments: filtredAppointments,
      countPending: pending.length,
      countFinished: finished.length,
      countCanceled: canceled.length,
    });
  }
}
export default new FilterAppointmentController();
