require('dotenv').config();
const request = require('request');
const https = require('https');



const getMaster = async (req, res) => {
  const { collection } = req.params;
  const options = { method: "GET", url: `${process.env.API}/dados/${collection}`, "rejectUnauthorized": false };
  request(options, (error, response, body) => {
    if (error) return res.status(400).send(error);
    return res.status(200).json(JSON.parse(body));
  });
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
    return res.send(body);
  });
};


const postPessoa = (req, res) => {
  const { collection } = req.params;
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
