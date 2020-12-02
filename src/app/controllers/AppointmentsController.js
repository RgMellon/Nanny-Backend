import Appointment from '../models/Appointment';
import Petshop from '../models/Petshop';
import Pet from '../models/Pet';
import Procedure from '../models/Procedure';

import { format, parseISO, isBefore, subHours } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

import pt from 'date-fns/locale/pt-BR';

import * as Yup from 'yup';

import Notification from '../schemas/Notification';
import User from '../models/User';

class AppointmentsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      petshop_id: Yup.number().required(),
      pet_id: Yup.number().required(),
      procedure_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    const { userId } = req;
    const { petshop_id, pet_id, date, procedure_id } = req.body;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    if (isBefore(parseISO(date), new Date())) {
      return res.status(400).json({
        error: 'Past date are not permited',
      });
    }

    try {
      const appointment = await Appointment.create({
        date,
        user_id: userId,
        petshop_id,
        pet_id,
        procedure_id,
      });

      /*
       * subtrai menos uma hora, foi feito pois a lib esta levando em conta
       * que o Brasil esta no horario de verao, porem n esta mais
       */

      const formatedDate = format(
        subHours(parseISO(date), process.env.TIMEZONE),
        "'dia' dd 'de' MMMM', às' H:mm'h'",
        {
          locale: pt,
        }
      );

      const user = await User.findByPk(userId);
      // console.log(userId);

      // Salva no mongo  a notificacao do usuario
      await Notification.create({
        content: `Novo agendamento de ${user.name} para ${formatedDate}`,
        petshop: petshop_id,
        date: formatedDate,
        appointmentId: appointment.id,
      });

      // usando o socket para emitir quando um posto foi criado
      // é pego o id do petshop para verificar se o mesmo esta online
      const ownerSocket = req.connectedUsers[petshop_id];

      if (ownerSocket) {
        req.io.to(ownerSocket).emit('notification', {
          succes: true,
        });
      }

      return res.status(200).json(appointment);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        error: 'failed create appointment',
      });
    }
  }

  async get(req, res) {
    const { userId } = req;

    const appointments = await Appointment.findAll({
      where: { user_id: userId },
      order: ['date'],
      include: [
        {
          model: Pet,
          as: 'pets',
          attributes: ['id', 'name', 'url', 'avatar'],
        },

        {
          model: Petshop,
          as: 'petshop',
          attributes: ['id', 'name', 'url_avatar', 'address', 'avatar'],
        },

        {
          model: Procedure,
          as: 'procedure',
          attributes: ['id', 'title', 'url'],
        },
      ],
    });

    return res.json({
      appointments: appointments,
    });
  }
}
export default new AppointmentsController();
