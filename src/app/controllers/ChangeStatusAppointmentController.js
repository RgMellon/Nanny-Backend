import Appointment from '../models/Appointment';

class ChangeStatusAppointmentController {
  async change(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(401).json({
        message: 'appointment not found',
      });
    }

    try {
      await appointment.update({ status });

      return res.json({
        message: 'appointment updated with success',
      });
    } catch (e) {
      return res.status(400).json({
        error: 'fail update appointment',
      });
    }
  }
}

export default new ChangeStatusAppointmentController();
