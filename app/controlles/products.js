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
const updateFavorite = async (req, res) => {
    const { host } = req.params;
    const { like } = req.body;
    try {
        let item = await products.findOne({ codProduto: host });
        if (item) {
            await products.update({ codProduto: host }, { like: like });
            return res.status(200).send( await products.findOne({ codProduto: host }));
        } else {
            return res.status(407).send({ message: 'Não foi encontrado nenhum rewgistro'});
        }
    } catch (e) {
        httpError(res, e);
    }
};

const getProductEan = async (req, res) => {
    const { ean } = req.params;
    const item = await products.findOne({ lstEan: { $in: Number(ean) }});
    return res.status(200).send(item);
};

module.exports = { getItems, getProductEan, getItemById, getItemByCode, updateFavorite  };