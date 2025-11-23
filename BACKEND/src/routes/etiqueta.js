const express = require('express');
const router = express.Router();

const controller = require('../controllers/etiqueta_controller');
const validation = require('../middleware/validation');

router.get('/etiqueta', validation.validatePagination, controller.getEtiqueta);
router.get('/etiqueta/:id', controller.getEtiquetaById);
router.post('/etiqueta', controller.createEtiqueta);
router.put('/etiqueta/:id', controller.updateEtiqueta);
router.delete('/etiqueta/:id', controller.deleteEtiqueta);

module.exports = router;
