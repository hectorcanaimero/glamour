const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const controller = require('../controlles/palestras');

router.get('/', auth.checkAuth, controller.getAll);
router.get('/:id', auth.checkAuth, controller.getById);



module.exports = router;