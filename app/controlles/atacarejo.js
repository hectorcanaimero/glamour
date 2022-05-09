require('dotenv').config();
const request = require('request');
const https = require('https');

const getMaster = async (req, res) => {
  const { collection } = req.params;
  const options = { method: "GET", url: `${process.env.API}/dados/${collection}`, "rejectUnauthorized": false };
  request(options, (error, response, body) => {
    if (error) return res.status(400).send(error);
    // if (collection === 'listaLojaFavorita') return getLoja(res, body);
    return res.status(200).send(body);
  });
};

const getLoja = (res, body) => {
  const data = [];
  body = JSON.parse(body);
  const find = body.filter(row => row.id === 603);
  for (let i = 0; i < body.length; i++) {
    const element = body[i];
    element.nome = element.nome.replace('GARANTE', 'GIGANTE');
    if(element.id !== 603) data.push(element);
  }
  return res.status(200).send(data);
};

const getSearch = async (req, res) => {
  const { cpf, cnpj } = req.headers;
  const { collection } = req.params;
  const options= {
    "rejectUnauthorized": false, headers: {},
    method: "GET", url: `${process.env.API}/manutencao/${collection}`,
  };
  if (collection === 'buscaPessoaFisica') options.headers = {'cpf': `${cpf}`};
  if (collection === 'buscaPessoaJuridica') options.headers = {'cnpj': `${cnpj}`};
  request(options, (error, response, body) => {
    if (error) return res.status(400).send(error);
    body = JSON.parse(body);
    return res.status(200).send(body);
  });
};

const postPessoa = (req, res) => {
  const options = {
    'method': 'POST',
    'rejectUnauthorized': false,
    'headers': { 'Content-Type': 'application/json' },
    'url': `${process.env.API}/manutencao/${collection}`,
    body: JSON.stringify(req.body)
  };
  request(options, function (error, response) {
    if (error) return res.send(error);
    res.send(JSON.parse(response.body));
  });
};

module.exports = { getMaster, getSearch, postPessoa };