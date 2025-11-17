const service = require('../services/libro_service');
const respuesta = require('../util/respuestas');

exports.getAtenciones = async (req, res) => {
  try{
    const pagination = {
      page: req.query.page || 1,
      limit: req.query.limit || 100
    };

    const result = await service.getLibros(pagination);

    respuesta.success(req, res, result, 200);
  } catch (error){
    respuesta.error(req, res, error.message, 500);
  }
}