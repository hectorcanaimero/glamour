const { httpError } = require('../helpers/handleError');
const { encrypt, compare } = require('../helpers/handleBcrypt');
const { tokenSign } = require('../helpers/token');

const userModel = require('../models/users');

const login = async(req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    console.log(user);
    if (!user) {
      res.status(404);
      res.send({ message: 'Usuario não existe!' });
    }
    const checkPassword = await compare(password, user.password);
    console.log(checkPassword    );
    const tokenSession = await tokenSign(user);
    if (checkPassword) { 
      res.send({
        role: user.role, email: user.email,
        name: user.name, token: tokenSession
      });
      return;
    }
    if (!checkPassword) {
      res.status(409);
      res.send({ message: 'Password invalido' });
      return;
    }
  } catch (e) { httpError(res, e); }
};

const register = async (req, res) => {
  try {
      const { email, password, phone, name } = req.body;
      const passwordHash = await encrypt(password);
      const user = await userModel.findOne({ email });
      if (!user) {
        const registerUser = await userModel.create({ email, name,  phone, password: passwordHash });
        res.send({
          role: registerUser.role, email: registerUser.email,
          name: registerUser.name, phone: registerUser.phone,
          createdAt: registerUser.createdAt, updateAt: registerUser.updateAt 
        });
      } else {
        res.status(409);
        res.send({ error: 'Email Repeart' });
      }
  } 
  catch (e) { httpError(res, e); }
};

module.exports = { login, register };