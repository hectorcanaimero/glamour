const cache = require('../middleware/redis');
const { httpError } = require('../helpers/handleError');
const menus = require('../models/menus');

const getMenus = async (req, res) => {
  try {
    // TODO: REDIS
    const cacheKey = `menus_departamentos`;
    const cachedData = await cache.get(cacheKey);
    if (cachedData) return res.status(200).json(cachedData);
    // TODO: MONGO
    const items = await menus.find({});
    if (!items) return res.status(401).send({ message: 'Error not load menus' });
    items.forEach(el => {
      el.image = `https://api.cndr.me/app/categoria/${el.codMercadologico}.svg`;
    });
    await cache.save(cacheKey, items, 60*60*24);
    res.status(200).send(items);
  }
  catch (e) { httpError(res, e); }
};
  const getMenusBySlug = async (req, res) => {
    const { slug } = req.params;
    try {
      // TODO: REDIS
      const cacheKey = `menus_slug_${slug}`;
      const cachedData = await cache.get(cacheKey);
      if (cachedData) return res.status(200).json(cachedData);
      // TODO: MONGO
      const items = await menus.find({slug});
      if (!items)  return res.status(400).send({ message: 'Data is not Found!' });
      await cache.save(cacheKey, items[0], 60*60*24);
      return res.status(200).send(items[0]);
    }
    catch (e) { httpError(res, e); }
};

const getMenusByCode = async (req, res) => {
    const { code } = req.params;
    try {
      // TODO: REDIS
      const cacheKey = `menus_code_${code}`;
      const cachedData = await cache.get(cacheKey);
      if (cachedData) return res.status(200).json(cachedData);
      // TODO: MONGO
      const items = await menus.find({codMercadologico: code});
      if (!items)  return res.status(400).send({ message: 'Data is not Found!' });
      await cache.save(cacheKey, items, 60*60*24);
      return res.status(200).send(items);
    }
    catch (e) { httpError(res, e); }
};

module.exports = { getMenus, getMenusBySlug, getMenusByCode };