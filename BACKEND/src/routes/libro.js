const express = require('express');
const router = express.Router();
const controller = require('../controllers/libro_controller');
const validation = require('../middleware/validation');

router.get('/libro', validation.validatePagination, controller.getAtenciones);

module.exports = router;