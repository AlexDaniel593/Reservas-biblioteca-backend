const Sala = require('../models/Sala');
const Reserva = require('../models/Reserva');

// @desc    Obtener todas las salas
// @route   GET /api/salas
// @access  Public
exports.getSalas = async (req, res) => {
  try {
    const salas = await Sala.find();

    res.status(200).json({
      success: true,
      count: salas.length,
      data: salas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener salas',
      error: error.message
    });
  }
};

// @desc    Obtener una sala por ID
// @route   GET /api/salas/:id
// @access  Public
exports.getSala = async (req, res) => {
  try {
    const sala = await Sala.findById(req.params.id);

    if (!sala) {
      return res.status(404).json({
        success: false,
        message: 'Sala no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      data: sala
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener sala',
      error: error.message
    });
  }
};

// @desc    Crear nueva sala
// @route   POST /api/salas
// @access  Private/Admin
exports.createSala = async (req, res) => {
  try {
    const sala = await Sala.create(req.body);

    res.status(201).json({
      success: true,
      data: sala
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear sala',
      error: error.message
    });
  }
};

// @desc    Actualizar sala
// @route   PUT /api/salas/:id
// @access  Private/Admin
exports.updateSala = async (req, res) => {
  try {
    const sala = await Sala.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!sala) {
      return res.status(404).json({
        success: false,
        message: 'Sala no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      data: sala
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar sala',
      error: error.message
    });
  }
};

// @desc    Eliminar sala
// @route   DELETE /api/salas/:id
// @access  Private/Admin
exports.deleteSala = async (req, res) => {
  try {
    const sala = await Sala.findByIdAndDelete(req.params.id);

    if (!sala) {
      return res.status(404).json({
        success: false,
        message: 'Sala no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Sala eliminada correctamente',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar sala',
      error: error.message
    });
  }
};

// @desc    Consultar disponibilidad de una sala
// @route   GET /api/salas/:id/disponibilidad
// @access  Public
exports.checkDisponibilidad = async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.query;

    if (!fechaInicio || !fechaFin) {
      return res.status(400).json({
        success: false,
        message: 'Debe proporcionar fechaInicio y fechaFin'
      });
    }

    const sala = await Sala.findById(req.params.id);

    if (!sala) {
      return res.status(404).json({
        success: false,
        message: 'Sala no encontrada'
      });
    }

    // Buscar reservas que se solapen con el periodo solicitado
    const reservasConflictivas = await Reserva.find({
      sala: req.params.id,
      estado: { $ne: 'cancelada' },
      $or: [
        {
          fechaInicio: { $lt: new Date(fechaFin) },
          fechaFin: { $gt: new Date(fechaInicio) }
        }
      ]
    });

    const disponible = reservasConflictivas.length === 0 && sala.disponible;

    res.status(200).json({
      success: true,
      data: {
        sala: sala.nombre,
        disponible,
        reservasConflictivas: reservasConflictivas.length,
        reservas: reservasConflictivas
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al verificar disponibilidad',
      error: error.message
    });
  }
};
