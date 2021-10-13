const mongoose = require('mongoose');

const dbConnect = () => {
    const DB_URI = process.env.DB_URI;
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, res) => {
        if (!err) {
            console.log('**** CONEXION CORRECTA PRODUCTS ****');
        } else {
            console.log('***** ERROR DE CONEXION PRODUCTS ****');
        }
    });
};


const dbConnectNotProducts = () => {
    const DB_URI = process.env.DB_UR1;
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, res) => {
        if (!err) {
            console.log('**** CONEXION CORRECTA NOT PRODUCTS ****');
        } else {
            console.log('***** ERROR DE CONEXION NOT PRODUCTS ****');
        }
    });
};


module.exports = { dbConnect, dbConnectNotProducts };