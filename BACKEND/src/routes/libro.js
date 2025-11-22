const express = require('express');
const router = express.Router();
const controller = require('../controllers/libro_controller');
const validation = require('../middleware/validation');

router.get('/libro', validation.validatePagination, controller.getLibros);
router.get('/libro/:id', controller.getLibroById);
router.get('/libro/:id/detalle', controller.getLibroDetalleById);
router.post('/libro', controller.createLibro);
router.put('/libro/:id', controller.updateLibro);
router.delete('/libro/:id', controller.deleteLibro);
//Autores
router.post('/libro/:id/autores', controller.setAutoresLibro);
router.delete('/libro/:id/autores/:idAutor', controller.removeAutorLibro);
//Categorías
router.post('/libro/:id/categorias', controller.setCategoriasLibro);
router.delete('/libro/:id/categorias/:idCategoria', controller.removeCategoriaLibro);
//Etiquetas
router.post('/libro/:id/etiquetas', controller.setEtiquetasLibro);
router.delete('/libro/:id/etiquetas/:idEtiqueta', controller.removeEtiquetaLibro);

module.exports = router;