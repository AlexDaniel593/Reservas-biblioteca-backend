const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  sala: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sala',
    required: true
  },
  fechaInicio: {
    type: Date,
    required: [true, 'La fecha de inicio es obligatoria']
  },
  fechaFin: {
    type: Date,
    required: [true, 'La fecha de fin es obligatoria']
  },
  estado: {
    type: String,
    enum: ['pendiente', 'confirmada', 'cancelada'],
    default: 'confirmada'
  },
  motivo: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Validar que fechaFin sea posterior a fechaInicio
reservaSchema.pre('save', function(next) {
  if (this.fechaFin <= this.fechaInicio) {
    next(new Error('La fecha de fin debe ser posterior a la fecha de inicio'));
  }
  next();
});

// Índice para búsquedas rápidas de disponibilidad
reservaSchema.index({ sala: 1, fechaInicio: 1, fechaFin: 1 });

module.exports = mongoose.model('Reserva', reservaSchema);
