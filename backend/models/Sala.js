const mongoose = require('mongoose');

const salaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre de la sala es obligatorio'],
    unique: true,
    trim: true
  },
  capacidad: {
    type: Number,
    required: [true, 'La capacidad es obligatoria'],
    min: [1, 'La capacidad debe ser al menos 1']
  },
  ubicacion: {
    type: String,
    required: [true, 'La ubicación es obligatoria'],
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  equipamiento: [{
    type: String,
    trim: true
  }],
  disponible: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Sala', salaSchema);
