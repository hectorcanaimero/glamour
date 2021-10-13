require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { join } = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');
const { dbConnect } = require('./config/mongo');
dbConnect();


const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1', require('./app/routes'));
app.use(express.static(join(__dirname, 'public'), { etag: false, maxAge: '5000' }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('API lista por el puerto ', PORT));