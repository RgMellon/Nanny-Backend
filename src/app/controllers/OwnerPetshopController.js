import Petshop from '../models/Petshop';

class OwnerPetshopController {
  async index(req, res) {
    const { userId } = req;

    const petshopFromUser = await Petshop.findOne({
      where: {
        user_id: userId,
      },
    });

    res.json(petshopFromUser);
  }
}
export default new OwnerPetshopController();
