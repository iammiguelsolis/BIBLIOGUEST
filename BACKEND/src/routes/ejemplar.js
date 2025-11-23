const express = require('express');
const router = express.Router();
const controller = require('../controllers/ejemplar_controller');
const validation = require('../middleware/validation');

router.get('/ejemplar', validation.validatePagination, controller.getEjemplar);
router.get('/ejemplar/:id', controller.getEjemplarById);
router.post('/ejemplar', controller.createEjemplar);
router.put('/ejemplar/:id', controller.updateEjemplar);
router.delete('/ejemplar/:id', controller.deleteEjemplar);
router.post('/ejemplar/:id/deteriorar', controller.deteriorarEjemplar);
router.post('/ejemplar/:id/restaurar', controller.restaurarEjemplar);

module.exports = router;