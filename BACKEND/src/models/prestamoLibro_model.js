const db = require('../config/db');
const oracledb = require('oracledb');

// ----------------- HELPERS -----------------

function parseFecha(fechaStr) {
  if (!fechaStr) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fechaStr)) {
    throw new Error('Formato de fecha inválido. Use YYYY-MM-DD');
  }
  const [anio, mes, dia] = fechaStr.split('-').map(Number);
  const date = new Date(anio, mes - 1, dia);
  if (isNaN(date.getTime())) throw new Error('Fecha inválida');
  return date;
}


exports.countPrestamos = async (data = {}) => {
  const {
    idUsuario,
    idBibliotecario,
    idEjemplar,
    estado,
    fechaInicioDesde,
    fechaInicioHasta,
    fechaFinDesde,
    fechaFinHasta,
  } = data;

  let query = `
    SELECT COUNT(*) AS total
    FROM PRESTAMOLIBRO
    WHERE 1 = 1
  `;

  const binds = {};

  if (idUsuario) {
    query += ` AND ID_USUARIO = :idUsuario`;
    binds.idUsuario = Number(idUsuario);
  }

  if (idBibliotecario) {
    query += ` AND ID_BIBLIOTECARIO = :idBibliotecario`;
    binds.idBibliotecario = Number(idBibliotecario);
  }

  if (idEjemplar) {
    query += ` AND ID_EJEMPLAR = :idEjemplar`;
    binds.idEjemplar = Number(idEjemplar);
  }

  if (estado) {
    query += ` AND UPPER(ESTADO) = UPPER(:estado)`;
    binds.estado = estado;
  }

  if (fechaInicioDesde) {
    query += ` AND TRUNC(FECHA_INICIO) >= TO_DATE(:fechaInicioDesde, 'YYYY-MM-DD')`;
    binds.fechaInicioDesde = fechaInicioDesde;
  }

  if (fechaInicioHasta) {
    query += ` AND TRUNC(FECHA_INICIO) <= TO_DATE(:fechaInicioHasta, 'YYYY-MM-DD')`;
    binds.fechaInicioHasta = fechaInicioHasta;
  }

  if (fechaFinDesde) {
    query += ` AND TRUNC(FECHA_FIN) >= TO_DATE(:fechaFinDesde, 'YYYY-MM-DD')`;
    binds.fechaFinDesde = fechaFinDesde;
  }

  if (fechaFinHasta) {
    query += ` AND TRUNC(FECHA_FIN) <= TO_DATE(:fechaFinHasta, 'YYYY-MM-DD')`;
    binds.fechaFinHasta = fechaFinHasta;
  }

  const result = await db.query(query, binds);
  return result[0].rows[0].TOTAL || 0;
};

exports.getPrestamos = async (pagination = {}, data = {}) => {
  const { page, limit } = pagination;
  const {
    idUsuario,
    idBibliotecario,
    idEjemplar,
    estado,
    fechaInicioDesde,
    fechaInicioHasta,
    fechaFinDesde,
    fechaFinHasta,
  } = data;

  let query = `
    SELECT
      ID_PRESTAMO,
      ID_USUARIO,
      ID_BIBLIOTECARIO,
      ID_EJEMPLAR,
      FECHA_SOLICITUD,
      FECHA_INICIO,
      FECHA_FIN,
      FECHA_DEVOLUCION_REAL,
      ESTADO
    FROM PRESTAMOLIBRO
    WHERE 1 = 1
  `;

  const binds = {};

  if (idUsuario) {
    query += ` AND ID_USUARIO = :idUsuario`;
    binds.idUsuario = Number(idUsuario);
  }

  if (idBibliotecario) {
    query += ` AND ID_BIBLIOTECARIO = :idBibliotecario`;
    binds.idBibliotecario = Number(idBibliotecario);
  }

  if (idEjemplar) {
    query += ` AND ID_EJEMPLAR = :idEjemplar`;
    binds.idEjemplar = Number(idEjemplar);
  }

  if (estado) {
    query += ` AND UPPER(ESTADO) = UPPER(:estado)`;
    binds.estado = estado;
  }

  if (fechaInicioDesde) {
    query += ` AND TRUNC(FECHA_INICIO) >= TO_DATE(:fechaInicioDesde, 'YYYY-MM-DD')`;
    binds.fechaInicioDesde = fechaInicioDesde;
  }

  if (fechaInicioHasta) {
    query += ` AND TRUNC(FECHA_INICIO) <= TO_DATE(:fechaInicioHasta, 'YYYY-MM-DD')`;
    binds.fechaInicioHasta = fechaInicioHasta;
  }

  if (fechaFinDesde) {
    query += ` AND TRUNC(FECHA_FIN) >= TO_DATE(:fechaFinDesde, 'YYYY-MM-DD')`;
    binds.fechaFinDesde = fechaFinDesde;
  }

  if (fechaFinHasta) {
    query += ` AND TRUNC(FECHA_FIN) <= TO_DATE(:fechaFinHasta, 'YYYY-MM-DD')`;
    binds.fechaFinHasta = fechaFinHasta;
  }

  query += `
    ORDER BY FECHA_INICIO DESC, ID_PRESTAMO DESC
    OFFSET :offset ROWS FETCH NEXT :limit ROWS ONLY
  `;

  const offset = (page - 1) * limit;
  const queryParams = { ...binds, offset, limit };

  const result = await db.query(query, queryParams);
  return result[0].rows;
};


exports.getPrestamoById = async (idPrestamo) => {
  const query = `
    SELECT
      ID_PRESTAMO,
      ID_USUARIO,
      ID_BIBLIOTECARIO,
      ID_EJEMPLAR,
      FECHA_SOLICITUD,
      FECHA_INICIO,
      FECHA_FIN,
      FECHA_DEVOLUCION_REAL,
      ESTADO
    FROM PRESTAMOLIBRO
    WHERE ID_PRESTAMO = :idPrestamo
  `;

  const result = await db.query(query, { idPrestamo: Number(idPrestamo) });
  return result[0].rows[0];
};


exports.getPrestamoDetalleById = async (idPrestamo) => {
  // Usa la vista VW_PRESTAMO_DETALLE que ya tiene todos los JOINs
  const query = `
    SELECT * FROM VW_PRESTAMO_DETALLE
    WHERE ID_PRESTAMO = :idPrestamo
  `;

  const result = await db.query(query, { idPrestamo: Number(idPrestamo) });
  return result[0].rows[0] || null;
};


exports.createPrestamo = async (data) => {
  let connection;
  try {
    connection = await db.getConnection();

    const idUsuario = parseInt(data.idUsuario, 10);
    const idEjemplar = parseInt(data.idEjemplar, 10);
    const fechaInicioStr = data.fechaInicio;
    const fechaFinStr = data.fechaFin;

    if (
      !Number.isInteger(idUsuario) ||
      !Number.isInteger(idEjemplar) ||
      !fechaInicioStr ||
      !fechaFinStr
    ) {
      throw new Error(
        'Parámetros requeridos: idUsuario, idEjemplar, fechaInicio, fechaFin'
      );
    }

    const fechaInicio = parseFecha(fechaInicioStr);
    const fechaFin = parseFecha(fechaFinStr);

    const result = await connection.execute(
      `
      BEGIN
        PKG_PRESTAMOS.crear(
          :p_usuario,
          :p_ejemplar,
          :p_fecha_inicio,
          :p_fecha_fin,
          :p_id_prestamo
        );
      END;
      `,
      {
        p_usuario:      { val: idUsuario,   type: oracledb.NUMBER },
        p_ejemplar:     { val: idEjemplar,  type: oracledb.NUMBER },
        p_fecha_inicio: { val: fechaInicio, type: oracledb.DATE },
        p_fecha_fin:    { val: fechaFin,    type: oracledb.DATE },
        p_id_prestamo:  { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
      }
    );

    await connection.commit();

    const idPrestamo = result.outBinds.p_id_prestamo;
    return Array.isArray(idPrestamo) ? idPrestamo[0] : idPrestamo;
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


exports.devolverPrestamo = async (idPrestamo, fechaDevolucionStr) => {
  let connection;
  try {
    connection = await db.getConnection();

    const id = parseInt(idPrestamo, 10);
    if (!Number.isInteger(id)) {
      throw new Error('idPrestamo inválido');
    }

    let plsql;
    const binds = {
      p_prestamo: { val: id, type: oracledb.NUMBER },
    };

    if (fechaDevolucionStr) {
      const fecha = parseFecha(fechaDevolucionStr);
      plsql = `
        BEGIN
          PKG_PRESTAMOS.devolver(:p_prestamo, :p_fecha);
        END;
      `;
      binds.p_fecha = { val: fecha, type: oracledb.DATE };
    } else {
      plsql = `
        BEGIN
          PKG_PRESTAMOS.devolver(:p_prestamo);
        END;
      `;
    }

    await connection.execute(plsql, binds);
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


exports.asignarBibliotecario = async (idPrestamo, idBibliotecario) => {
  let connection;
  try {
    connection = await db.getConnection();

    const idP = parseInt(idPrestamo, 10);
    const idB = parseInt(idBibliotecario, 10);

    if (!Number.isInteger(idP) || !Number.isInteger(idB)) {
      throw new Error(
        'Parámetros requeridos: idPrestamo e idBibliotecario (números enteros)'
      );
    }

    await connection.execute(
      `
      BEGIN
        PKG_PRESTAMOS.entregar(
          :p_prestamo,
          :p_bibliotecario
        );
      END;
      `,
      {
        p_prestamo:      { val: idP, type: oracledb.NUMBER },
        p_bibliotecario: { val: idB, type: oracledb.NUMBER },
      }
    );

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

exports.cancelarPrestamo = async (idPrestamo) => {
  const connection = await db.getConnection();
  try {
    const id = parseInt(idPrestamo, 10);
    if (!Number.isInteger(id)) {
      throw new Error('idPrestamo inválido');
    }

    await connection.execute(
      `
      BEGIN
        PKG_PRESTAMOS.cancelar(:p_prestamo);
      END;
      `,
      {
        p_prestamo: { val: id, type: oracledb.NUMBER },
      }
    );

    await connection.commit();
    return true;
  } catch (error) {
    try { await connection.rollback(); } catch {}
    throw error;
  } finally {
    try { await connection.close(); } catch {}
  }
};

