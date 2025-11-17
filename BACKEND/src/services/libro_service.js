const model = require('../models/libro_model');

exports.getLibros = async (pagination = {}) => {
  const { page, limit } = pagination;
  const libros = await model.getAllLibros(pagination);
  const total = await model.countLibros();

  return {
    data: libros,
    pagination: {
      current_page: page,
      total_pages: Math.ceil(total / limit),
      total_records: total,
      per_page: limit
    }
  };
}