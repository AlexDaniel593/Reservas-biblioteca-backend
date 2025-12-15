const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Usuario = require('../models/Usuario');
const Sala = require('../models/Sala');
const Reserva = require('../models/Reserva');
const seedData = require('./seed-data.json');

dotenv.config();

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('Limpiando base de datos...');
    await Usuario.deleteMany();
    await Sala.deleteMany();
    await Reserva.deleteMany();

    console.log('Importando usuarios...');
    await Usuario.create(seedData.usuarios);

    console.log('Importando salas...');
    await Sala.create(seedData.salas);

    console.log('✅ Datos importados exitosamente');
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('Eliminando datos...');
    await Usuario.deleteMany();
    await Sala.deleteMany();
    await Reserva.deleteMany();

    console.log('✅ Datos eliminados exitosamente');
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
  console.log('Uso:');
  console.log('  node seed.js -i  (importar datos)');
  console.log('  node seed.js -d  (eliminar datos)');
  process.exit();
}
