const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Cargar variables de entorno
const userRoutes = require('./routes/userRoutes');
const planRoutes = require('./routes/planRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

// Crear la aplicación Express
const app = express();

// Middlewares
app.use(cors()); // Permitir solicitudes desde el frontend
app.use(express.json()); // Parsear el cuerpo de las solicitudes en formato JSON

// Expone las rutas de API de Usuarios
app.use('/api/users', userRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/subscriptions', subscriptionRoutes); // Importar las rutas de Suscripciones

// Ruta de prueba
app.get('/Health', (req, res) => {
  res.send('¡Backend de la aplicación contable funcionando!');
});

// Configurar el puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});