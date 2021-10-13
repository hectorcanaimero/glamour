const cache = require('express-expeditious');

const defaultOptions = {
    namespace: 'expresscache',
    defaultTtl: '1 day', //TODO: 60 * 1000
    statusCodeExpires: {
        404: '5 minutes',
        500: 0 // 1 minute in milliseconds
    }
};

const cacheInit = cache(defaultOptions);

module.exports = { cacheInit };
