
const { verifyToken } = require('../helpers/token');
const userModel = require('../models/users');

const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await verifyToken(token);
        if (tokenData._id) {
            next();
        } else {
            res.status(409);
            res.send({ erro: 'Sem permissão para acessar esses dados' });
        }
    } catch (e) {
        console.log(e);
        res.status(409);
        res.send({ erro: 'Sem permissão para acessar esses dados' });
    }

};


const checkRoleAuth = (roles) => async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop(); 
        const tokenData = await verifyToken(token);
        const userData = await userModel.findById(tokenData._id); 

        if ([].concat(roles).includes(userData.role)) {
            next();
        } else {
            res.status(409);
            res.send({ erro: 'Sem permissão para acessar esses dados' });
        }

    } catch (e) {
        console.log(e);
        res.status(409);
        res.send({ erro: 'Sem permissão para acessar esses dados' });
    }
};

module.exports = {checkRoleAuth, checkAuth };