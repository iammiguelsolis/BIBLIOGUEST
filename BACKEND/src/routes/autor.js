const express = require('express');
const router = express.Router();

const controller = require('../controllers/autor_controller');
const validation = require('../middleware/validation');

router.get('/autor', validation.validatePagination, controller.getAutor);
router.get('/autor/:id', controller.getAutorById);
router.post('/autor', controller.createAutor);
router.put('/autor/:id', controller.updateAutor);
router.delete('/autor/:id', controller.deleteAutor);

module.exports = router;
