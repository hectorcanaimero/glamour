const nodemailer = require("nodemailer");

sendApp = async (req, res) => {
  let transporter, mailOptions;
  const data = req.body;
  console.log(data);
  mailOptions = {
    to: process.env.MAIL_TO,
    from: 'Aplicativo Clube Condor',
    cc: ['hector.velasques@condor.com.br', 'fernando.nunes@condor.com.br'],
    subject: 'sac@condor.com.br',
    html: dataMail(data)
  };
  transporter = nodemailer.createTransport({
    type: "SMTP",
    host: process.env.MAIL_SMTP,
    secure: false,
    port: process.env.MAIL_PORT,
    auth: { user: process.env.APP_MAIL_USER, pass: process.env.APP_MAIL_PASS },
    tls: {
      minVersion: 'TLSv1',
      rejectUnauthorized: false,
      ciphers: 'HIGH:MEDIUM:!aNULL:!eNULL:@STRENGTH:!DH:!kEDH'
    }
  });
  transporter.sendMail(mailOptions)
  .then((info) => {
    console.log(info);
    const message = {  status: true, message: process.env.MESSAGE_SUCCESS };
    console.log(message);
    transporter.close();
    return res.status(201).json(message);
  })
  .catch((err) => {
    console.log(err);
    const message = {  status: false, message: process.env.MESSAGE_ERROR };
    transporter.close();
    return res.status(403).json(message);
  });
};

dataMail = (data) => {
  const value = `<h1 style="font-weight: 700; border-bottom: 1px solid #000; padding-bottom: 1rem; margin-bottom: 2.5rem">Assunto: App Clube Condor</h1>
    <h2 style="text-align: center;">Loja que quer contatar: <br>${data.loja}</h2>
    <h2 style="font-weight: 700; border-bottom: 1px solid #000; padding-bottom: 1rem; margin-bottom: 2rem">Dados básicos</h2>
    <p><strong>Nome:</strong> ${data.nome}</p>
    <p><strong>Sexo:</strong> ${data.sexo}</p>
    <p><strong>Data de Nascimento:</strong> ${data.nascimento}</p>
    <p><strong>CPF:</strong> ${data.cpfcnpj}</p>
    <p><strong>Estado Civil:</strong> ${data.estadocivil}</p>
    <p><strong>Grupo Familiar:</strong> ${data.grupofamiliar}</p>
    <p><strong>Profissão:</strong> ${data.profissao}</p>
    <h2 style="font-weight: 700; border-bottom: 1px solid #000; padding-bottom: 1rem; margin-bottom: 2rem">Dados de contato</h2>
    <p><strong>E-mail:</strong> ${data.email}</p>
    <p><strong>Telefone:</strong> ${data.celular}</p>
    <h2 style="font-weight: 700; border-bottom: 1px solid #000; padding-bottom: 1rem; margin-bottom: 2rem">Dados de endereço</h2>
    <p><strong>CEP:</strong> ${data.cep}</p>
    <p><strong>Bairro:</strong> ${data.bairro}</p>
    <p><strong>Rua:</strong> ${data.rua}</p>
    <p><strong>Número:</strong> ${data.numero}</p>
    <p><strong>Complemento:</strong> ${data.complemento}</p>
    <p><strong>Cidade:</strong> ${data.cidade}</p>
    <p><strong>UF:</strong> ${data.estado}</p>
    <h2 style="font-weight: 700; border-bottom: 1px solid #000; padding-bottom: 1rem; margin-bottom: 2rem">Mensagem</h2>
    <p>${data.mensagem}</p>`;
  return value;
};

module.exports = { sendApp };