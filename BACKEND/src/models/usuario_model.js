const db = require('../config/db');

// ============================================================
// COUNT Y LIST USUARIOS
// ============================================================

exports.countUsuarios = async (data = {}) => {
  const { nombre, codigo, correo, estado, idUnidad } = data;

  let query = `
    SELECT COUNT(*) AS total
    FROM Usuario
    WHERE 1 = 1
  `;
  const binds = {};

  if (nombre) {
    query += ` AND UPPER(nombre) LIKE UPPER(:nombre)`;
    binds.nombre = `%${nombre}%`;
  }

  if (codigo) {
    query += ` AND codigo_institucional = :codigo`;
    binds.codigo = codigo;
  }

  if (correo) {
    query += ` AND UPPER(correo) LIKE UPPER(:correo)`;
    binds.correo = `%${correo}%`;
  }

  if (estado) {
    query += ` AND UPPER(estado) = UPPER(:estado)`;
    binds.estado = estado;
  }

  if (idUnidad) {
    query += ` AND id_unidad = :idUnidad`;
    binds.idUnidad = Number(idUnidad);
  }

  const result = await db.query(query, binds);
  return result[0].rows[0].TOTAL || 0;
};

exports.getUsuarios = async (pagination = {}, data = {}) => {
  const { page, limit } = pagination;
  const { nombre, codigo, correo, estado, idUnidad } = data;

  let query = `
    SELECT
      u.id_usuario,
      u.nombre,
      u.codigo_institucional,
      u.correo,
      u.estado,
      u.id_unidad,
      ua.nombre AS nombre_unidad
    FROM Usuario u
    LEFT JOIN UnidadAcademica ua ON ua.id_unidad = u.id_unidad
    WHERE 1 = 1
  `;
  const binds = {};

  if (nombre) {
    query += ` AND UPPER(u.nombre) LIKE UPPER(:nombre)`;
    binds.nombre = `%${nombre}%`;
  }

  if (codigo) {
    query += ` AND u.codigo_institucional = :codigo`;
    binds.codigo = codigo;
  }

  if (correo) {
    query += ` AND UPPER(u.correo) LIKE UPPER(:correo)`;
    binds.correo = `%${correo}%`;
  }

  if (estado) {
    query += ` AND UPPER(u.estado) = UPPER(:estado)`;
    binds.estado = estado;
  }

  if (idUnidad) {
    query += ` AND u.id_unidad = :idUnidad`;
    binds.idUnidad = Number(idUnidad);
  }

  query += `
    ORDER BY u.nombre
    OFFSET :offset ROWS FETCH NEXT :limit ROWS ONLY
  `;

  const offset = (page - 1) * limit;
  const queryParams = { ...binds, offset, limit };

  const result = await db.query(query, queryParams);
  return result[0].rows;
};

// ============================================================
// GET BY ID
// ============================================================

exports.getUsuarioById = async (idUsuario) => {
  const query = `
    SELECT
      u.id_usuario,
      u.nombre,
      u.codigo_institucional,
      u.correo,
      u.estado,
      u.id_unidad,
      ua.nombre AS nombre_unidad
    FROM Usuario u
    LEFT JOIN UnidadAcademica ua ON ua.id_unidad = u.id_unidad
    WHERE u.id_usuario = :idUsuario
  `;

  const result = await db.query(query, { idUsuario: Number(idUsuario) });
  return result[0].rows[0] || null;
};

// ============================================================
// INVITACIONES PENDIENTES
// Obtener reservas de cubículos donde el usuario fue invitado
// ============================================================

exports.getInvitacionesPendientes = async (idUsuario) => {
  // Usa la vista VW_USUARIO_INVITACIONES que ya tiene los JOINs y filtros
  const query = `
    SELECT * FROM VW_USUARIO_INVITACIONES
    WHERE ID_USUARIO = :idUsuario
    ORDER BY FECHA_RESERVA, HORA_INICIO
  `;

  const result = await db.query(query, { idUsuario: Number(idUsuario) });
  return result[0].rows;
};

// ============================================================
// MIS RESERVAS (donde el usuario es parte del grupo)
// ============================================================

exports.getMisReservasCubiculo = async (idUsuario) => {
  const query = `
    SELECT
      r.id_reserva,
      r.id_cubiculo,
      r.fecha_reserva,
      r.hora_inicio,
      r.hora_fin,
      r.estado AS estado_reserva,
      c.capacidad AS capacidad_cubiculo,
      b.nombre AS nombre_biblioteca,
      ugu.estado_miembro
    FROM UsuarioGrupoUsuarios ugu
    JOIN ReservaCubiculo r ON r.id_grupo_usuarios = ugu.id_grupo_usuarios
    JOIN Cubiculo c ON c.id_cubiculo = r.id_cubiculo
    JOIN Biblioteca b ON b.id_biblioteca = c.id_biblioteca
    WHERE ugu.id_usuario = :idUsuario
      AND ugu.estado_miembro IN ('aceptado', 'pendiente')
    ORDER BY r.fecha_reserva DESC, r.hora_inicio
  `;

  const result = await db.query(query, { idUsuario: Number(idUsuario) });
  return result[0].rows;
};
