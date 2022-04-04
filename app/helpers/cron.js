const shell = require('shelljs');
const cron = require('node-cron');
const monitor = require('../controlles/monitor');

module.exports = cron.schedule('0 7 * * *', () => {
  console.log('---------------------');
  console.log('Running Cron Job');
  shell.echo('Database backup complete');
  monitor.getProduct();
  monitor.getElectro();
  monitor.getOferta();
});

