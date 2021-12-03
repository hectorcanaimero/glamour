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
    if(body.errors[0].code) return res.status(401).send({message: body.errors[0].message});
    return res.status(200).json(body);
  });
};


const postPessoa = (req, res) => {
  const { collection } = req.params;
  const url = `${process.env.API}/manutencao/${collection}`;
  const headers = {
    'codLoja': '603',
    'accept': 'application/json;charset=UTF-8',
    'Content-Type': 'application/json;charset=UTF-8',
  };
  console.log('43 ', req.body);
  // const options = { url, headers, method: 'POST' };
  request.post(url, { form: req.body, headers }, (error, response, body) => {
    console.log('41 ', body);
  });
  res.send(req.body);
};

module.exports = { getMaster, getSearch, postPessoa };
