const express = require('express');
const router = express.Router();
const controller = require('../controllers/laptop_controller');
const validation = require('../middleware/validation');

router.get('/laptop/disponibilidad', controller.getHorariosLaptopsDisponibles);

module.exports = router;