const usuarioModel = require('../models/usuario_model');
const respuesta = require('../util/respuestas');

// ============================================================
// GET - Listar usuarios (biblio/admin)
// ============================================================

exports.getUsuarios = async (req, res, next) => {
  try {
    const { page, limit } = req.pagination || { page: 1, limit: 10 };
    const { nombre, codigo, correo, estado, idUnidad } = req.query;

    const filtros = { nombre, codigo, correo, estado, idUnidad };

    const total = await usuarioModel.countUsuarios(filtros);
    const usuarios = await usuarioModel.getUsuarios({ page, limit }, filtros);

    respuesta.success(req, res, {
      total,
      page,
      limit,
      data: usuarios
    }, 200);
  } catch (error) {
    next(error);
  }
};

// ============================================================
// GET - Usuario por ID (biblio/admin)
// ============================================================

exports.getUsuarioById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const usuario = await usuarioModel.getUsuarioById(id);

    if (!usuario) {
      return respuesta.error(req, res, 'Usuario no encontrado', 404);
    }

    respuesta.success(req, res, usuario, 200);
  } catch (error) {
    next(error);
  }
};

// ============================================================
// GET - Mis invitaciones pendientes (estudiante autenticado)
// ============================================================

exports.getMisInvitaciones = async (req, res, next) => {
  try {
    const idUsuario = req.usuario.id;
    const rol = req.usuario.rol;

    // Solo estudiantes reciben invitaciones
    if (rol !== 'estudiante') {
      return respuesta.success(req, res, [], 200);
    }

    const invitaciones = await usuarioModel.getInvitacionesPendientes(idUsuario);
    respuesta.success(req, res, invitaciones, 200);
  } catch (error) {
    next(error);
  }
};

// ============================================================
// GET - Mis reservas de cubículo (estudiante autenticado)
// ============================================================

exports.getMisReservasCubiculo = async (req, res, next) => {
  try {
    const idUsuario = req.usuario.id;
    const rol = req.usuario.rol;

    if (rol !== 'estudiante') {
      return respuesta.success(req, res, [], 200);
    }

    const reservas = await usuarioModel.getMisReservasCubiculo(idUsuario);
    respuesta.success(req, res, reservas, 200);
  } catch (error) {
    next(error);
  }
};
