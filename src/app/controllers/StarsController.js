/* eslint-disable array-callback-return */
/* eslint-disable func-names */
import * as Yup from 'yup';

import Star from '../schemas/Star';

class StarsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      star: Yup.string().required(),
      user_id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // eslint-disable-next-line object-curly-newline
    const { star, user_id } = req.body;

    await Star.create({
      star,
      user_id,
    });

    return res.json({
      message: 'Rated with success!',
    });
  }

  async find(req, res) {
    const { user_id } = req.query;

    const rates = await Star.find({ user_id });
    const quantityRates = rates.length;

    // eslint-disable-next-line prefer-arrow-callback
    const sumStar = rates.reduce(function(initialValue, rate) {
      return initialValue + rate.star;
    }, 0);

    const avaregaStars = (sumStar / quantityRates).toFixed(1);

    return res.json({
      avaregaStars,
    });
  }
}

export default new StarsController();
