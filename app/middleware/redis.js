const redis = require("redis");
const { promisify } = require('util');

const config = {
  port: 6379,
  host: "127.0.0.1",
  // host: "173.230.137.242",
};

const client = redis.createClient(config);
const setAsyncEx = promisify(client.setex).bind(client);
const getAsync = promisify(client.get).bind(client);

client.on('error', err => console.log('Error ' + err));

async function save(key, value, ttlSeconds = 60*60*24) {
  return await setAsyncEx(key, ttlSeconds, JSON.stringify(value));
}

async function get(key) {
  console.log('Response REDIS')
  const jsonString = await getAsync(key);
  if (jsonString) return JSON.parse(jsonString);
}

module.exports = { save, get };