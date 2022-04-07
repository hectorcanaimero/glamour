const request = require('request');
const sms = require('../helpers/sms');
const products = require('../models/products');

const getProdutos = async (req, res) => {
  await getProduct();
  return res.status(204).send();
};

const getProduct = async () => {
  const data = await products.exists();
  if (!data) return sms.send("A porcaria da API de Produtos não carrego certo, liga para o Venezuelano :( ");
};

const getEletro = (req, res) => {
  this.getElectro();
  return res.status(204).send();
};

const getElectro = async() => {
  const data = await products.count({ line: 5 });
  if (data === 0) return sms.send('A porcaria da API de Eletro não carrego certo, liga para o Venezuelano');
};

const getOfertas = (req, res) => {
  const options= {
    "rejectUnauthorized": false, method: "GET",
    url: `https://marketing.condor.com.br/api/Campanhas/count`,
  };

  request(options, (error, rsp, body) => {
    if (error) return res.status(400).send(error);
    const data = JSON.parse(body);
    if(data.count === 0) return sms.send('A porcaria da API de Ofertas não carrego certo, liga para o Venezuelano');
    return res.status(200).send(data);
  });
};
const getOferta = () => {
  const options= {
    "rejectUnauthorized": false, method: "GET",
    url: `https://marketing.condor.com.br/api/Campanhas/count`,
  };

  request(options, (error, rsp, body) => {
    if (error) return res.status(400).send(error);
    const data = JSON.parse(body);
    if(data.count === 0) return sms.send('A porcaria da API de Ofertas não carrego certo, liga para o Venezuelano');
  });
};

module.exports = { getProdutos, getEletro, getElectro, getOfertas, getOferta, getProduct };