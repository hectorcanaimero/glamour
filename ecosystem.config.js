module.exports = {
  apps : [
    {
      name: "cndr.me - API",
      script: "./app.js",
      instances: 1,
      cron_restart: '0 0 * * *',
      max_memory_restart: "1000M",
      watch: true,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }
  ]
};