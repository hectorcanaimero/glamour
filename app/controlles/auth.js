const { httpError } = require('../helpers/handleError');
const { encrypt, compare } = require('../helpers/handleBcrypt');
const { tokenSign } = require('../helpers/token');

const userModel = require('../models/users');

const login = async(req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).send({ message: 'Usuario não existe!' });
    const checkPassword = await compare(password, user.password);
    if (!checkPassword) return res.status(409).send({ message: 'Password invalido' });
    const token = await tokenSign(user);
    user.password = null;
    return res.status(200).send({user, token});
  }
  catch (e) { httpError(res, e); }
};

const register = async (req, res) => {
  try {
    const { email, password, phone, name } = req.body;
    const passwordHash = await encrypt(password);
    const user = await userModel.findOne({ email });
    if (user) return res.status(404).send({ message: 'Email já cadastrado!' });
    const register = await userModel.create({ email, name,  phone, password: passwordHash });
    if (!register) return res.status(404).send({ message: 'Register not Found!' });
    const item = await userModel.findOne({ email });
    item.password = null;
    return res.status(201).send(item);
  }
  catch (e) { httpError(res, e); }
};

module.exports = { login, register };