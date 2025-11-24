const express = require('express');
const router = express.Router();

const controller = require('../controllers/reservaCubiculo_controller');
const validation = require('../middleware/validation');

router.get('/reservaCubiculo', validation.validatePagination, controller.getReservaCubiculo);
router.get('/reservaCubiculo/:id', controller.getReservaCubiculoById);
router.get('/reservaCubiculo/:id/detalle', controller.getReservaCubiculoDetalle);
router.post('/reservaCubiculo', controller.crearReservaCubiculo);
router.post('/reservaCubiculo/:id/aceptar', controller.aceptarInvitacion);
router.post('/reservaCubiculo/:id/rechazar', controller.rechazarInvitacion);
router.post('/reservaCubiculo/:id/confirmar', controller.confirmarReserva);
router.post('/reservaCubiculo/:id/ingreso', controller.registrarIngreso);
router.post('/reservaCubiculo/:id/finalizar', controller.finalizarReserva);
router.delete('/reservaCubiculo/:id', controller.cancelarReserva);

module.exports = router;
