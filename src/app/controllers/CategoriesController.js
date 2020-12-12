import * as Yup from 'yup';

import Category from '../schemas/Category';
import HostCategory from '../schemas/HostCategory';

class CategoryController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // eslint-disable-next-line object-curly-newline
    const { name } = req.body;

    const categoryAlreadyExists = await Category.findOne({ name });

    if (categoryAlreadyExists) {
      return res.status(400).json({ error: 'Category already exists' });
    }

    await Category.create({
      name,
    });

    return res.json({
      message: 'Category created with success',
    });
  }

  async find(req, res) {
    const { category_id } = req.query;

    const hostsByCategories = await HostCategory.find({ category_id });

    return res.json({
      hosts: hostsByCategories,
    });
  }

  async all(_, res) {
    const allCategories = await Category.find();

    return res.json({
      categories: allCategories,
    });
  }
}

export default new CategoryController();
