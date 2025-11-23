const db = require('../config/db');
const oracledb = require('oracledb');

exports.countLibros = async (data = {}) => {
  const { isbn, titulo, subtitulo, editorial, anio } = data;

  let query = `
    SELECT COUNT(*) AS total
    FROM LIBRO
    WHERE 1 = 1
  `;

  const binds = {};

  if (isbn) {
    query += ` AND UPPER(ISBN) = UPPER(:isbn)`;
    binds.isbn = isbn;
  }

  if (titulo) {
    query += ` AND UPPER(TITULO) LIKE UPPER(:titulo)`;
    binds.titulo = `%${titulo}%`;
  }

  if (subtitulo) {
    query += ` AND UPPER(SUBTITULO) LIKE UPPER(:subtitulo)`;
    binds.subtitulo = `%${subtitulo}%`;
  }

  if (editorial) {
    query += ` AND UPPER(EDITORIAL) LIKE UPPER(:editorial)`;
    binds.editorial = `%${editorial}%`;
  }

  if (anio) {
    query += ` AND ANIO = :anio`;
    binds.anio = Number(anio);
  }

  const result = await db.query(query, binds);
  return result[0].rows[0].TOTAL || 0;
};

exports.getLibros = async (pagination = {}, data = {}) => {
  const { page, limit } = pagination;
  const { isbn, titulo, subtitulo, editorial, anio } = data;

  let query = `
    SELECT
      ID_LIBRO,
      ISBN,
      TITULO,
      SUBTITULO,
      EDITORIAL,
      NRO_EDICION,
      ANIO
    FROM LIBRO
    WHERE 1 = 1
  `;

  const binds = {};

  if (isbn) {
    query += ` AND UPPER(ISBN) = UPPER(:isbn)`;
    binds.isbn = isbn;
  }

  if (titulo) {
    query += ` AND UPPER(TITULO) LIKE UPPER(:titulo)`;
    binds.titulo = `%${titulo}%`;
  }

  if (subtitulo) {
    query += ` AND UPPER(SUBTITULO) LIKE UPPER(:subtitulo)`;
    binds.subtitulo = `%${subtitulo}%`;
  }

  if (editorial) {
    query += ` AND UPPER(EDITORIAL) LIKE UPPER(:editorial)`;
    binds.editorial = `%${editorial}%`;
  }

  if (anio) {
    query += ` AND ANIO = :anio`;
    binds.anio = Number(anio);
  }

  query += `
    ORDER BY ID_LIBRO
    OFFSET :offset ROWS FETCH NEXT :limit ROWS ONLY
  `;

  const offset = (page - 1) * limit;
  const queryParams = { ...binds, offset, limit };

  const result = await db.query(query, queryParams);
  return result[0].rows;
};


exports.getLibroById = async (idLibro) => {
  const query = `
    SELECT
      ID_LIBRO,
      ISBN,
      TITULO,
      SUBTITULO,
      EDITORIAL,
      NRO_EDICION,
      ANIO
    FROM LIBRO
    WHERE ID_LIBRO = :idLibro
  `;

  const result = await db.query(query, { idLibro: Number(idLibro) });
  return result[0].rows[0];
};


exports.getLibroDetalleById = async (idLibro) => {
  const query = `
    SELECT
      l.ID_LIBRO,
      l.ISBN,
      l.TITULO,
      l.SUBTITULO,
      l.EDITORIAL,
      l.NRO_EDICION,
      l.ANIO,
      a.ID_AUTOR,
      a.NOMBRE  AS AUTOR_NOMBRE,
      a.APELLIDO AS AUTOR_APELLIDO,
      c.ID_CATEGORIA,
      c.NOMBRE AS CATEGORIA_NOMBRE,
      e.ID_ETIQUETA,
      e.NOMBRE AS ETIQUETA_NOMBRE
    FROM LIBRO l
    LEFT JOIN LIBROAUTOR la      ON la.ID_LIBRO = l.ID_LIBRO
    LEFT JOIN AUTOR a            ON a.ID_AUTOR = la.ID_AUTOR
    LEFT JOIN CATEGORIASLIBRO cl ON cl.ID_LIBRO = l.ID_LIBRO
    LEFT JOIN CATEGORIAS c       ON c.ID_CATEGORIA = cl.ID_CATEGORIA
    LEFT JOIN LIBROETIQUETAS le  ON le.ID_LIBRO = l.ID_LIBRO
    LEFT JOIN ETIQUETAS e        ON e.ID_ETIQUETA = le.ID_ETIQUETA
    WHERE l.ID_LIBRO = :idLibro
  `;

  const result = await db.query(query, { idLibro: Number(idLibro) });
  return result[0].rows;
};

exports.createLibro = async (data) => {
  let connection;
  try {
    connection = await db.getConnection();

    const {
      isbn,
      titulo,
      subtitulo,
      editorial,
      nroEdicion,
      anio,
    } = data;

    const result = await connection.execute(
      `
      INSERT INTO LIBRO (
        ISBN,
        TITULO,
        SUBTITULO,
        EDITORIAL,
        NRO_EDICION,
        ANIO
      ) VALUES (
        :isbn,
        :titulo,
        :subtitulo,
        :editorial,
        :nroEdicion,
        :anio
      )
      RETURNING ID_LIBRO INTO :idLibro
      `,
      {
        isbn,
        titulo,
        subtitulo,
        editorial,
        nroEdicion: nroEdicion !== undefined && nroEdicion !== null ? Number(nroEdicion) : null,
        anio: anio !== undefined && anio !== null ? Number(anio) : null,
        idLibro: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
      }
    );

    await connection.commit();

    const idLibro = result.outBinds.idLibro[0];
    return idLibro;
  } catch (error) {
    if (connection) {
      try { await connection.rollback(); } catch {}
    }
    throw error;
  } finally {
    if (connection) {
      try { await connection.close(); } catch {}
    }
  }
};

exports.updateLibro = async (idLibro, data) => {
  let connection;
  try {
    connection = await db.getConnection();

    const {
      isbn,
      titulo,
      subtitulo,
      editorial,
      nroEdicion,
      anio,
    } = data;

    const sets = [];
    const binds = { idLibro: Number(idLibro) };

    if (isbn !== undefined) {
      sets.push('ISBN = :isbn');
      binds.isbn = isbn;
    }
    if (titulo !== undefined) {
      sets.push('TITULO = :titulo');
      binds.titulo = titulo;
    }
    if (subtitulo !== undefined) {
      sets.push('SUBTITULO = :subtitulo');
      binds.subtitulo = subtitulo;
    }
    if (editorial !== undefined) {
      sets.push('EDITORIAL = :editorial');
      binds.editorial = editorial;
    }
    if (nroEdicion !== undefined) {
      sets.push('NRO_EDICION = :nroEdicion');
      binds.nroEdicion = nroEdicion !== null ? Number(nroEdicion) : null;
    }
    if (anio !== undefined) {
      sets.push('ANIO = :anio');
      binds.anio = anio !== null ? Number(anio) : null;
    }

    if (sets.length === 0) {
      return 0;
    }

    const query = `
      UPDATE LIBRO
      SET ${sets.join(', ')}
      WHERE ID_LIBRO = :idLibro
    `;

    const result = await connection.execute(query, binds);
    await connection.commit();

    return result.rowsAffected || 0;
  } catch (error) {
    if (connection) {
      try { await connection.rollback(); } catch {}
    }
    throw error;
  } finally {
    if (connection) {
      try { await connection.close(); } catch {}
    }
  }
};

exports.deleteLibro = async (idLibro) => {
  let connection;
  try {
    connection = await db.getConnection();

    const result = await connection.execute(
      `
      DELETE FROM LIBRO
      WHERE ID_LIBRO = :idLibro
      `,
      { idLibro: Number(idLibro) }
    );

    await connection.commit();
    return result.rowsAffected || 0;
  } catch (error) {
    if (connection) {
      try { await connection.rollback(); } catch {}
    }
    throw error;
  } finally {
    if (connection) {
      try { await connection.close(); } catch {}
    }
  }
};

//------------------ AUTORES DEL LIBRO ---------------- 

exports.setAutoresLibro = async (idLibro, idsAutores = []) => {
  let connection;
  try {
    connection = await db.getConnection();

    const idLibroNum = Number(idLibro);

    await connection.execute(
      `DELETE FROM LIBROAUTOR WHERE ID_LIBRO = :idLibro`,
      { idLibro: idLibroNum }
    );

    if (Array.isArray(idsAutores) && idsAutores.length > 0) {
      const sqlInsert = `
        INSERT INTO LIBROAUTOR (ID_LIBRO, ID_AUTOR)
        VALUES (:idLibro, :idAutor)
      `;
      for (const idAutor of idsAutores) {
        await connection.execute(sqlInsert, {
          idLibro: idLibroNum,
          idAutor: Number(idAutor),
        });
      }
    }

    await connection.commit();
    return true;
  } catch (error) {
    if (connection) {
      try { await connection.rollback(); } catch {}
    }
    throw error;
  } finally {
    if (connection) {
      try { await connection.close(); } catch {}
    }
  }
};

exports.removeAutorLibro = async (idLibro, idAutor) => {
  let connection;
  try {
    connection = await db.getConnection();

    const result = await connection.execute(
      `
      DELETE FROM LIBROAUTOR
      WHERE ID_LIBRO = :idLibro
        AND ID_AUTOR = :idAutor
      `,
      {
        idLibro: Number(idLibro),
        idAutor: Number(idAutor),
      }
    );

    await connection.commit();
    return result.rowsAffected || 0;
  } catch (error) {
    if (connection) {
      try { await connection.rollback(); } catch {}
    }
    throw error;
  } finally {
    if (connection) {
      try { await connection.close(); } catch {}
    }
  }
};

//----------------- CATEGORIAS DEL LIBRO -------------------

exports.setCategoriasLibro = async (idLibro, idsCategorias = []) => {
  let connection;
  try {
    connection = await db.getConnection();

    const idLibroNum = Number(idLibro);

    await connection.execute(
      `DELETE FROM CATEGORIASLIBRO WHERE ID_LIBRO = :idLibro`,
      { idLibro: idLibroNum }
    );

    if (Array.isArray(idsCategorias) && idsCategorias.length > 0) {
      const sqlInsert = `
        INSERT INTO CATEGORIASLIBRO (ID_CATEGORIA, ID_LIBRO)
        VALUES (:idCategoria, :idLibro)
      `;
      for (const idCategoria of idsCategorias) {
        await connection.execute(sqlInsert, {
          idLibro: idLibroNum,
          idCategoria: Number(idCategoria),
        });
      }
    }

    await connection.commit();
    return true;
  } catch (error) {
    if (connection) {
      try { await connection.rollback(); } catch {}
    }
    throw error;
  } finally {
    if (connection) {
      try { await connection.close(); } catch {}
    }
  }
};

exports.removeCategoriaLibro = async (idLibro, idCategoria) => {
  let connection;
  try {
    connection = await db.getConnection();

    const result = await connection.execute(
      `
      DELETE FROM CATEGORIASLIBRO
      WHERE ID_LIBRO = :idLibro
        AND ID_CATEGORIA = :idCategoria
      `,
      {
        idLibro: Number(idLibro),
        idCategoria: Number(idCategoria),
      }
    );

    await connection.commit();
    return result.rowsAffected || 0;
  } catch (error) {
    if (connection) {
      try { await connection.rollback(); } catch {}
    }
    throw error;
  } finally {
    if (connection) {
      try { await connection.close(); } catch {}
    }
  }
};

//-------------------- ETIQUETAS DEL LIBRO --------------------

exports.setEtiquetasLibro = async (idLibro, idsEtiquetas = []) => {
  let connection;
  try {
    connection = await db.getConnection();

    const idLibroNum = Number(idLibro);

    await connection.execute(
      `DELETE FROM LIBROETIQUETAS WHERE ID_LIBRO = :idLibro`,
      { idLibro: idLibroNum }
    );

    if (Array.isArray(idsEtiquetas) && idsEtiquetas.length > 0) {
      const sqlInsert = `
        INSERT INTO LIBROETIQUETAS (ID_LIBRO, ID_ETIQUETA)
        VALUES (:idLibro, :idEtiqueta)
      `;
      for (const idEtiqueta of idsEtiquetas) {
        await connection.execute(sqlInsert, {
          idLibro: idLibroNum,
          idEtiqueta: Number(idEtiqueta),
        });
      }
    }

    await connection.commit();
    return true;
  } catch (error) {
    if (connection) {
      try { await connection.rollback(); } catch {}
    }
    throw error;
  } finally {
    if (connection) {
      try { await connection.close(); } catch {}
    }
  }
};

exports.removeEtiquetaLibro = async (idLibro, idEtiqueta) => {
  let connection;
  try {
    connection = await db.getConnection();

    const result = await connection.execute(
      `
      DELETE FROM LIBROETIQUETAS
      WHERE ID_LIBRO = :idLibro
        AND ID_ETIQUETA = :idEtiqueta
      `,
      {
        idLibro: Number(idLibro),
        idEtiqueta: Number(idEtiqueta),
      }
    );

    await connection.commit();
    return result.rowsAffected || 0;
  } catch (error) {
    if (connection) {
      try { await connection.rollback(); } catch {}
    }
    throw error;
  } finally {
    if (connection) {
      try { await connection.close(); } catch {}
    }
  }
};