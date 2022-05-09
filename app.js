require('dotenv').config();
const cors = require('cors');
const { join } = require('path');
const express = require('express');
const task = require('./app/helpers/cron');

const app = express();
const cacheTime = 86400000 * 30;

app.use(cors());
app.use(express.json());
app.use(require('express-status-monitor')());
app.use('/api/v1', require('./app/routes'));
app.use(express.static(join(__dirname, 'public'), { etag: false, maxAge: cacheTime }));

task.start();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('API lista por el puerto ', PORT));