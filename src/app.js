const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Cargar variables de entorno
const userRoutes = require('./routes/userRoutes');
const planRoutes = require('./routes/planRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const companyRoutes  = require('./routes/companyRoutes')
const branchRoutes  = require('./routes/branchRoutes')
const branchUserRoutes  = require('./routes/branchUserRoutes')

// Crear la aplicación Express
const app = express();

// Middlewares
app.use(cors()); // Permitir solicitudes desde el frontend
app.use(express.json()); // Parsear el cuerpo de las solicitudes en formato JSON

app.use('/api/users', userRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/branchUser', branchUserRoutes);

// Ruta de prueba
app.get('/Health', (req, res) => {
  res.send('¡Backend de la aplicación contable funcionando!');
});

// Configurar el puerto
const PORT = process.env.PORT || 3080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});