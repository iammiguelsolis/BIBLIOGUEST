const express = require('express');
const router = express.Router();

const controller = require('../controllers/categoria_controller');
const validation = require('../middleware/validation');

router.get('/categoria', validation.validatePagination, controller.getCategoria);
router.get('/categoria/:id', controller.getCategoriaById);
router.post('/categoria', controller.createCategoria);
router.put('/categoria/:id', controller.updateCategoria);
router.delete('/categoria/:id', controller.deleteCategoria);

module.exports = router;
