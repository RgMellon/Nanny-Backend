import * as Yup from 'yup';
import Pet from '../schemas/Pet';

class PetsController {
  async store(req, res) {
    const { filename: avatar } = req.file;
    const { name, size, age } = req.body;
    const { userId } = req;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      age: Yup.string().required(),
      size: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const pet = await Pet.create({
      name,
      size,
      age,
      user_id: userId,
      avatar,
    });

    return res.json(pet);
  }

  async pets(req, res) {
    const { userId } = req;

    const pets = await Pet.findAll({ where: { user_id: userId } });

    return res.json(pets);
  }
}
export default new PetsController();
