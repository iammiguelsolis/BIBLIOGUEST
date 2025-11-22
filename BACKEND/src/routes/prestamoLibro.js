const express = require('express');
const router = express.Router();
const controller = require('../controllers/prestamoLibro_controller');
const validation = require('../middleware/validation');

router.get('/prestamoLibro', validation.validatePagination, controller.getPrestamo);
router.get('/prestamoLibro/:id', controller.getPrestamoById);
router.get('/prestamoLibro/:id/detalle', controller.getPrestamoDetalleById);
router.post('/prestamoLibro', controller.createPrestamo);
router.post('/prestamoLibro/:id/entregar', controller.asignarBibliotecario);
router.post('/prestamoLibro/:id/devolver', controller.devolverPrestamo);
router.post('/prestamoLibro/:id/cancelar', controller.cancelarPrestamo);

module.exports = router;