const express = require('express');
const router = express.Router();

const controller = require('../controllers/cubiculo_controller');
const validation = require('../middleware/validation');

router.get('/cubiculo', validation.validatePagination, controller.getCubiculo);
router.get('/cubiculo/:id', controller.getCubiculoById);
router.post('/cubiculo', controller.createCubiculo);
router.put('/cubiculo/:id', controller.updateCubiculo);
router.delete('/cubiculo/:id', controller.deleteCubiculo);

module.exports = router;
