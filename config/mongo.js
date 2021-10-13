const mongoose = require('mongoose');

const dbConnect = () => {
    const DB_URI = process.env.DB_URI;
    mongoose.createConnection(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true },
        (err, res) => {
            if (!err) { console.log('**** CONEXION CORRECTA PRODUCTS ****'); } 
            else { console.log('***** ERROR DE CONEXION PRODUCTS ****'); }
        });
};

const dbConnectAdmin = () => {
    const DB_URI = process.env.DB_URI_ADMIN;
    mongoose.createConnection(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true },
    (err, res) => {
        if (!err) { console.log('**** CONEXION CORRECTA PRODUCTS ****'); } 
        else { console.log('***** ERROR DE CONEXION PRODUCTS ****'); }
    });
};




module.exports = { dbConnect, dbConnectAdmin };