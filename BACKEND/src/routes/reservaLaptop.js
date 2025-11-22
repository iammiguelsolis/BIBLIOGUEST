const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservaLaptop_controller');
const validation = require('../middleware/validation');

router.get('/reservaLaptop', validation.validatePagination, controller.getReserva);
router.get('/reservaLaptop/disponibilidad', controller.getDisponibilidad);
router.get('/reservaLaptop/:id', controller.getReservaByID);
router.post('/reservaLaptop', controller.crearReserva);
router.post('/reservaLaptop/:id/finalizar', controller.finalizarReserva);
router.delete('/reservaLaptop/:id', controller.cancelarReserva);

module.exports = router;
