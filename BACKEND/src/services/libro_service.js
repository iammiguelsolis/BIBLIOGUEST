const model = require('../models/libro_model');

exports.getLibros = async (pagination = {}, data = {}) => {
  const { page, limit } = pagination;
  const libros = await model.getLibros(pagination, data);
  const total = await model.countLibros(data);

  return {
    data: libros,
    pagination: {
      current_page: page,
      total_pages: Math.ceil(total / limit),
      total_records: total,
      per_page: limit,
    },
  };
};

exports.getLibroById = async (idLibro) => {
  const libro = await model.getLibroById(idLibro);
  return libro || null;
};

exports.getLibroDetalleById = async (idLibro) => {
  const rows = await model.getLibroDetalleById(idLibro);
  if (!rows || rows.length === 0) return null;

  const base = rows[0];

  const autoresMap = new Map();
  const categoriasMap = new Map();
  const etiquetasMap = new Map();

  for (const row of rows) {

    if (row.ID_AUTOR) {
      if (!autoresMap.has(row.ID_AUTOR)) {
        autoresMap.set(row.ID_AUTOR, {
          idAutor: row.ID_AUTOR,
          nombre: row.AUTOR_NOMBRE,
          apellido: row.AUTOR_APELLIDO,
        });
      }
    }

    if (row.ID_CATEGORIA) {
      if (!categoriasMap.has(row.ID_CATEGORIA)) {
        categoriasMap.set(row.ID_CATEGORIA, {
          idCategoria: row.ID_CATEGORIA,
          nombre: row.CATEGORIA_NOMBRE,
        });
      }
    }

    if (row.ID_ETIQUETA) {
      if (!etiquetasMap.has(row.ID_ETIQUETA)) {
        etiquetasMap.set(row.ID_ETIQUETA, {
          idEtiqueta: row.ID_ETIQUETA,
          nombre: row.ETIQUETA_NOMBRE,
        });
      }
    }
  }

  return {
    idLibro: base.ID_LIBRO,
    isbn: base.ISBN,
    titulo: base.TITULO,
    subtitulo: base.SUBTITULO,
    editorial: base.EDITORIAL,
    nroEdicion: base.NRO_EDICION,
    anio: base.ANIO,
    autores: Array.from(autoresMap.values()),
    categorias: Array.from(categoriasMap.values()),
    etiquetas: Array.from(etiquetasMap.values()),
  };
};

exports.createLibro = async (data) => {
  const idLibro = await model.createLibro(data);
  return { idLibro };
};

exports.updateLibro = async (idLibro, data) => {
  const rowsAffected = await model.updateLibro(idLibro, data);
  return rowsAffected;
};

exports.deleteLibro = async (idLibro) => {
  const rowsAffected = await model.deleteLibro(idLibro);
  return rowsAffected;
};

//---------- AUTORES DEL LIBRO -------------

exports.setAutoresLibro = async (idLibro, idsAutores) => {
  await model.setAutoresLibro(idLibro, idsAutores);
  return true;
};

exports.removeAutorLibro = async (idLibro, idAutor) => {
  const rowsAffected = await model.removeAutorLibro(idLibro, idAutor);
  return rowsAffected;
};

//---------------- CATEGORIAS DEL LIBRO -----------

exports.setCategoriasLibro = async (idLibro, idsCategorias) => {
  await model.setCategoriasLibro(idLibro, idsCategorias);
  return true;
};

exports.removeCategoriaLibro = async (idLibro, idCategoria) => {
  const rowsAffected = await model.removeCategoriaLibro(idLibro, idCategoria);
  return rowsAffected;
};

//-------------- ETIQUETAS DEL LIBRO ------------------

exports.setEtiquetasLibro = async (idLibro, idsEtiquetas) => {
  await model.setEtiquetasLibro(idLibro, idsEtiquetas);
  return true;
};

exports.removeEtiquetaLibro = async (idLibro, idEtiqueta) => {
  const rowsAffected = await model.removeEtiquetaLibro(idLibro, idEtiqueta);
  return rowsAffected;
};