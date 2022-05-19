const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controller = require('../controlles/clients');
const palestras = require('../controlles/palestras');
const images = require('../middleware/images');
//TODO: clients !

router.get('/', auth.checkAuth, controller.getAll);
router.get('/:id', auth.checkAuth, controller.getById);

router.post('/receitas', images.upload, controller.createReceita);
router.get('/:cpf/receita', auth.checkAuth, controller.getByCpfReceita);
router.get('/receitas/validate', auth.checkAuth, controller.validateCadastroReceitas);

router.post('/palestras', controller.createPalestra);
router.get('/:cpf/palestra/:palestra', controller.getByCpfPalestra);
router.get('/palestras/:palestra/validate', controller.validateCadastroPalestra);


module.exports = router;