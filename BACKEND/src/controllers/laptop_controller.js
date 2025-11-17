const service = require('../services/laptop_service');
const respuesta = require('../util/respuestas');

exports.getHorariosLaptopsDisponibles = async (req, res) => {
  try{
    const dataBusqueda = req.query;
    const result = await service.getHorariosLaptopsDisponibles(dataBusqueda);
    respuesta.success(req, res, result, 200);
  } catch (error){
    respuesta.error(req, res, error.message, 500);
  }
}