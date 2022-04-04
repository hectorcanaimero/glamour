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

  request(options, (err, rsp, body) => {
    console.log(body);
    console.log('ERR ', err);
    JSON.stringify(body);
  });
};


module.exports = { send };
