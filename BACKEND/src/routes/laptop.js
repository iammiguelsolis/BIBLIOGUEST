const express = require('express');
const router = express.Router();
const controller = require('../controllers/laptop_controller');
const validation = require('../middleware/validation');

router.get('/laptop', validation.validatePagination, controller.getLaptop);
router.get('/laptop/:idLaptop', controller.getLaptopById);
router.post('/laptop', controller.createLaptop);
router.put('/laptop/:idLaptop', controller.updateLaptop);
router.delete('/laptop/:idLaptop', controller.disableLaptop);

module.exports = router;