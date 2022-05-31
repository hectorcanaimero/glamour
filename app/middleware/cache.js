const cache = require('express-expeditious');

const defaultOptions = {
    namespace: 'expresscache',
    defaultTtl: '1 day', //TODO: 60 * 1000
};

const cacheInit = cache(defaultOptions);

module.exports = { cacheInit };
