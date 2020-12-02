import Petshop from '../models/Petshop';
import Procedure from '../models/Procedure';

class PetshopsController {
  async detail(req, res) {
    const { id_petshop } = req.params;

    if (!id_petshop) {
      return res.status(400).json({
        error: 'id petshop is invalid id',
      });
    }

    const petshop = await Petshop.findAll({
      where: { id: id_petshop },

      include: [
        {
          model: Procedure,
          as: 'procedures',
          attributes: [
            'id',
            'title',
            'description',
            'avatar',
            'createdAt',
            'url',
            'price',
          ],
        },
      ],
    });

    return res.json(petshop);
  }
}
export default new PetshopsController();
