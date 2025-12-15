const Reserva = require('../models/Reserva');
const Sala = require('../models/Sala');

// @desc    Obtener todas las reservas del usuario
// @route   GET /api/reservas
// @access  Private
exports.getReservas = async (req, res) => {
  try {
    let query;

    // Admin puede ver todas las reservas, usuarios solo las suyas
    if (req.user.rol === 'admin') {
      query = Reserva.find();
    } else {
      query = Reserva.find({ usuario: req.user.id });
    }

    const reservas = await query
      .populate('sala', 'nombre capacidad ubicacion')
      .populate('usuario', 'nombre email')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: reservas.length,
      data: reservas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener reservas',
      error: error.message
    });
  }
};

// @desc    Obtener una reserva por ID
// @route   GET /api/reservas/:id
// @access  Private
exports.getReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id)
      .populate('sala', 'nombre capacidad ubicacion')
      .populate('usuario', 'nombre email');

    if (!reserva) {
      return res.status(404).json({
        success: false,
        message: 'Reserva no encontrada'
      });
    }

    // Verificar que el usuario sea dueño de la reserva o admin
    if (reserva.usuario._id.toString() !== req.user.id && req.user.rol !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'No autorizado para ver esta reserva'
      });
    }

    res.status(200).json({
      success: true,
      data: reserva
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener reserva',
      error: error.message
    });
  }
};

// @desc    Crear nueva reserva
// @route   POST /api/reservas
// @access  Private
exports.createReserva = async (req, res) => {
  try {
    const { sala, fechaInicio, fechaFin, motivo } = req.body;

    // Verificar que la sala existe
    const salaExiste = await Sala.findById(sala);
    if (!salaExiste) {
      return res.status(404).json({
        success: false,
        message: 'Sala no encontrada'
      });
    }

    // Verificar que la sala está disponible
    if (!salaExiste.disponible) {
      return res.status(400).json({
        success: false,
        message: 'La sala no está disponible'
      });
    }

    // Verificar que las fechas son válidas
    if (new Date(fechaInicio) < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'La fecha de inicio no puede ser en el pasado'
      });
    }

    // Verificar que no hay reservas conflictivas
    const reservasConflictivas = await Reserva.find({
      sala,
      estado: { $ne: 'cancelada' },
      $or: [
        {
          fechaInicio: { $lt: new Date(fechaFin) },
          fechaFin: { $gt: new Date(fechaInicio) }
        }
      ]
    });

    if (reservasConflictivas.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'La sala ya está reservada en ese horario'
      });
    }

    // Crear reserva
    const reserva = await Reserva.create({
      usuario: req.user.id,
      sala,
      fechaInicio,
      fechaFin,
      motivo
    });

    const reservaPopulada = await Reserva.findById(reserva._id)
      .populate('sala', 'nombre capacidad ubicacion')
      .populate('usuario', 'nombre email');

    res.status(201).json({
      success: true,
      data: reservaPopulada
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear reserva',
      error: error.message
    });
  }
};

// @desc    Cancelar reserva
// @route   DELETE /api/reservas/:id
// @access  Private
exports.cancelReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id);

    if (!reserva) {
      return res.status(404).json({
        success: false,
        message: 'Reserva no encontrada'
      });
    }

    // Verificar que el usuario sea dueño de la reserva o admin
    if (reserva.usuario.toString() !== req.user.id && req.user.rol !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'No autorizado para cancelar esta reserva'
      });
    }

    // Actualizar estado a cancelada en lugar de eliminar
    reserva.estado = 'cancelada';
    await reserva.save();

    res.status(200).json({
      success: true,
      message: 'Reserva cancelada correctamente',
      data: reserva
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al cancelar reserva',
      error: error.message
    });
  }
};
