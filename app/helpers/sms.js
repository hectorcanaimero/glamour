const request = require('request');

const send = (text) => {
  const body = {
    messages: [ {
      from: 'Monitor Servidor Condor', text: `Monitor Servidor Condor.\n${text}`,
      destinations: [ { to: '+5541998819501' }, { to: '+5541999771533' }, { to: '+5541988376893' } ],
    } ]
  };
  const options = {
    'method': 'POST', "rejectUnauthorized": false,
    'url': `${process.env.SMS_URL}/sms/2/text/advanced`,
    'headers': {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `${process.env.SMS_TOKEN}`
    },
    'body': JSON.stringify(body)
  };
  request(options, (err, res, body) => {
    console.log(body);
    console.log('ERR ', err);
    JSON.stringify(body);
  });
};

const sendPublic = (phone, data) => {
  const value = convertData(data);
  const body = {
    messages: [ {
      from: process.env.SMS_FROM,
      text: `${process.env.SMS_MSG1} ${value} ${process.env.SMS_MSG2}`,
      destinations: [ { to: `+55${phone}` } ],
    } ]
  };
  const options = {
    'method': 'POST', "rejectUnauthorized": false,
    'url': `${process.env.SMS_URL}/sms/2/text/advanced`,
    'headers': {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `${process.env.SMS_TOKEN}`
    },
    'body': JSON.stringify(body)
  };
  request(options, (err, res, body) => {
    console.log('BODY ', body);
    console.log('ERR ', err);
    JSON.stringify(body);
  });
};

const convertData = (data) => {
  const arr = data.split('T');
  const day = arr[0].split('-');
  const hour = arr[1].split(':');
  return `${day[2]}-${day[1]}-${day[0]} às ${hour[0]}:${hour[1]}`;
};

module.exports = { send, sendPublic };
