const { Sequelize } = require('sequelize');

// Crear una instancia de Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME, // Nombre de la base de datos
  process.env.DB_USER, // Usuario
  process.env.DB_PASSWORD, // Contraseña
  {
    host: process.env.DB_HOST, // Host
    port: process.env.DB_PORT, // Puerto
    dialect: 'postgres', // Dialecto (PostgreSQL)
    logging: false, // Desactiva el logging de consultas SQL (opcional)
  }
);

// Probar la conexión
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
})();

module.exports = sequelize;