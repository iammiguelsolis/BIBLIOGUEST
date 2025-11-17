const model = require('../models/laptop_model');

exports.getHorariosLaptopsDisponibles = async (data) => {
  const horarios = await model.getHorariosLaptopsDisponibles(data);
  return horarios;
}