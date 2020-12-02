import Petshop from '../models/Petshop';
import * as Yup from 'yup';

import { verifyIsOpen } from '../aux/verifyIsOpen';

class PetshopsController {
  async store(req, res) {
    const {
      name,
      address,
      address_number,
      city,
      district,
      phone,
      openTime,
      closeTime,
    } = req.body;

    const { userId } = req;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address: Yup.string().required(),
      address_number: Yup.number().required(),
      city: Yup.string().required(),
      district: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { avatar, background_image } = req.files;
    const avatarFileName = avatar[0].filename;
    const backgroundImageFileName = background_image[0].filename;

    try {
      await Petshop.create({
        name,
        avatar: avatarFileName,
        background_image: backgroundImageFileName,
        address,
        address_number,
        city,
        district,
        phone,
        user_id: userId,
        openTime,
        closeTime,
      });
      return res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: 'Erro crate store' });
    }
  }

  async all(req, res) {
    const allPetshops = await Petshop.findAll();

    const str = JSON.stringify(allPetshops);

    const parse = JSON.parse(str);

    const petshops = parse.map(item => ({
      ...item,
      isOpen: verifyIsOpen(item.openTime, item.closeTime),
    }));

    return res.json(petshops);
  }

  async detail(req, res) {
    const { id_petshop } = req.params;

    if (!id_petshop) {
      return res.status(400).json({
        error: 'id petshop is invalid id',
      });
    }

    const petshop = await Petshop.findAll({
      where: { id: id_petshop },
    });

    return res.json(petshop);
  }
}
export default new PetshopsController();
