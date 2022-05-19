const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const controller = require('../controlles/palestras');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);



module.exports = router;