const { httpError } = require('../helpers/handleError')
const { encrypt, compare } = require('../helpers/handleBcrypt')
const { tokenSign } = require('../helpers/token')
const userModel = require('../models/users')


const login = async(req, res) => {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
      res.status(404)
      res.send({ error: 'User not found' })
    }
    const checkPassword = await compare(password, user.password) //TODO: Contraseña!
    //TODO JWT 👉
    const tokenSession = await tokenSign(user) //TODO: 2d2d2d2d2d2d2
    if (checkPassword) { 
      delete user['password']
      console.log(user);
      res.send({
        role: user.role,
        email: user.email,
        name: user.name,
        token: tokenSession
      })
      return
    }
    if (!checkPassword) {
      res.status(409)
      res.send({ error: 'Invalid password' })
      return
    }
  } catch (e) {
      httpError(res, e)
  }
}

const register = async (req, res) => {
  try {
      const { email, password, phone, name } = req.body
      const passwordHash = await encrypt(password)
      const registerUser = await userModel.create({ email, name,  phone, password: passwordHash })
      res.send({ data: registerUser })

  } catch (e) {
      httpError(res, e)
  }
}

module.exports = { login, register }