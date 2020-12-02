import View from '../models/View';
import Petshop from '../models/Petshop';

class ViewsPetshopsController {
  async store(req, res) {
    const { id_petshop } = req.params;

    if (!id_petshop) {
      return res.json({
        message: 'petshop id is required',
      });
    }

    const viewStore = await View.findOne({
      where: {
        petshop_id: id_petshop,
      },
    });

    if (!viewStore) {
      View.create({
        views: 1,
        petshop_id: id_petshop,
      });

      return res.json({ success: 'created new view' });
    }

    let newViews = viewStore.views + 1;
    await View.update(
      { views: newViews },
      {
        where: {
          petshop_id: id_petshop,
        },
      }
    );

    return res.json({ success: 'add view' });
  }

  async index(req, res) {
    const allViews = await View.findAll({
      include: [
        {
          model: Petshop,
          as: 'petshop',
          attributes: ['id', 'name', 'url_avatar', 'avatar', 'address'],
        },
      ],

      order: [['views', 'DESC']],
    });

    return res.json(allViews);
  }
}

export default new ViewsPetshopsController();
