import Banner from '../models/Banner';

class BannersController {
  async store(req, res) {
    const { filename } = req.file;
    const { title } = req.body;

    Banner.create({
      banner: filename,
      title,
    });

    return res.json({ sucess: 'banner saved' });
  }

  async all(req, res) {
    const allBanners = await Banner.findAll();
    return res.json(allBanners);
  }
}

export default new BannersController();
