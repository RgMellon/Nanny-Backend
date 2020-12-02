import Procedure from '../models/Procedure';
import * as Yup from 'yup';

class ProceduresController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { filename } = req.file;
    const { petshop_id } = req.params;
    const { title, description, price } = req.body;

    if (!petshop_id) {
      return res.status(400).json({ error: 'Invalid param' });
    }

    try {
      await Procedure.create({
        title,
        description,
        avatar: filename,
        petshop_id,
        price,
      });

      return res.json({ success: true });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ error: 'error create procedure' });
    }
  }

  async all(req, res) {
    const { petshop_id } = req.params;

    const proceduresByPetshops = await Procedure.findAll({
      where: {
        petshop_id,
      },
    });

    return res.json(proceduresByPetshops);
  }

  async delete(req, res) {
    const { petshop_id, procedure_id } = req.params;

    const procedure = await Procedure.findOne({
      where: {
        petshop_id,
        id: procedure_id,
      },
    });

    if (procedure.petshop_id != petshop_id) {
      return res.status(403).json({ error: 'Unauthorized delete procedure' });
    }

    procedure.destroy(procedure.id);

    return res.json({ message: 'Procedure deleted with sucess' });
  }
}

export default new ProceduresController();
