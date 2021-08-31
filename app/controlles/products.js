const { httpError } = require('../helpers/handleError')
const products = require('../models/products')

const getItems = async (req, res) => {
    try {
        const items = await products.find({}).select('-lstPosicaoLojaAtual')
        res.send({ data: items })
    } catch (e) {
        httpError(res, e)
    }
}

const getItemById = async (req, res) => {
    const id = req.params.id
    try {
        const items = await products.findById(id).select('-lstPosicaoLojaAtual')
        res.send({ data: items })
    } catch (e) {
        httpError(res, e)
    }
}

const getItemByCode = async (req, res) => {
    const codProduto = req.params.code
    try {
        const items = await products.findOne({codProduto}).select('-lstPosicaoLojaAtual')
        res.send({ data: items })
    } catch (e) {
        httpError(res, e)
    }
}



module.exports = { getItems, getItemById, getItemByCode }