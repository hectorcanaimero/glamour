const { httpError } = require('../helpers/handleError')
const userModel = require('../models/users')

const { encrypt } = require('../helpers/handleBcrypt')

const createItem = async (req, res) => {
  try {
    const { name, position, phone, email } = req.body
    const resDetail = await userModel.create({ name, position, phone, email })
    res.status(200)
    res.send({ data: resDetail })
  } catch (e) {
    httpError(res, e)
  }
}


module.exports = { createItem }
