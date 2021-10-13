const epxress = require('express');
const router = epxress.Router();
const fs = require('fs');

const pathRouter = `${__dirname}`;

const removeExtension = (fileName) => fileName.split('.').shift();

fs.readdirSync(pathRouter).filter((file) => {
    const fileWithOutExt = removeExtension(file);
    const skip = ['index'].includes(fileWithOutExt);
    if (!skip) {
        console.log(fileWithOutExt);
        router.use(`/${fileWithOutExt}`, require(`./${fileWithOutExt}`));
    }
});

router.get('*', (req, res) => {
    res.status(404);
    res.send({ error: 'Not found' });
});

router.get('index', (req, res) => res.send({ version: 'v1' }));

module.exports = router;