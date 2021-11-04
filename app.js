require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { join } = require('path');
// const swaggerJsdoc = require("swagger-jsdoc");
// const swaggerUi = require('swagger-ui-express');

const specs = swaggerJsdoc(require('./config/optionsSwagger'));
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1', require('./app/routes'));
app.use(express.static(join(__dirname, 'public'), { etag: false, maxAge: '5000' }));
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('API lista por el puerto ', PORT));