const { httpError } = require('../helpers/handleError');
const products = require('../models/products');

const getItems = async (req, res) => {
    try {
        const items = await products.find({}).select('-lstPosicaoLojaAtual');
        res.send({ data: items });
    } catch (e) {
        httpError(res, e);
    }
};

const getItemById = async (req, res) => {
    const id = req.params.id;
    try {
        const items = await products.findById(id).select('-lstPosicaoLojaAtual');
        res.send({ data: items });
    } catch (e) {
        httpError(res, e);
    }
};

const getItemByCode = async (req, res) => {
    const codProduto = req.params.code;
    try {
        const items = await products.findOne({codProduto}).select('-lstPosicaoLojaAtual');
        res.send({ data: items });
    } catch (e) {
        httpError(res, e);
    }
};
    // "codProduto": 378410
const updateMasFavoriteProduct = async (req, res) => {
    const { codProduto } = req.body;
    const filter = { codProduto };
    const update = { like: 1 };
    try {
        let item = await products.findOne({codProduto, 'like': { '$exists': true, $ne: null }});
        if (item) {
            update.like = item.like + 1;
            await products.findOneAndUpdate(filter, update);
        } else {
            await products.findOneAndUpdate(filter, update);
        }
        item = await products.findOne({codProduto});
        return res.status(200).send(item);
    } catch (e) {
        httpError(res, e);
    }
}

const updateMenosFavoriteProduct = async (req, res) => {
    const { codProduto } = req.body;
    const filter = { codProduto };
    const update = { like: 0 };
    try {
        let item = await products.findOne({codProduto, 'like': { '$exists': true, $ne: null }});
        if (item) {
            const value = item.like < 1 ? 0 : item.like -1;
            update.like = value;
            await products.findOneAndUpdate(filter, update);
        } else {
            await products.findOneAndUpdate(filter, update);
        }
        item = await products.findOne({codProduto});
        return res.status(200).send(item);
    } catch (e) {
        httpError(res, e);
    }
}

module.exports = { getItems, getItemById, getItemByCode, updateMasFavoriteProduct, updateMenosFavoriteProduct };