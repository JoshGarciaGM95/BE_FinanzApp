const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Cargar variables de entorno
// Importar instancia de sequelize
const { sequelize } = require('./config/db');
const { seedPlans } = require('./models/Plan');
//const { seedCategories } = require('./models/Categories');

const userRoutes = require('./routes/userRoutes');
const planRoutes = require('./routes/planRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const companyRoutes  = require('./routes/companyRoutes');
const branchRoutes  = require('./routes/branchRoutes');
const branchUserRoutes  = require('./routes/branchUserRoutes');
const productRoutes  = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const paymentsRoutes = require('./routes/paymentsRoutes');
const rolesRoutes = require('./routes/rolesRoutes');
const saleDetailsRoutes = require('./routes/saleDetailsRoutes');
const salesRoutes = require('./routes/salesRoutes');
const suppliersRoutes = require('./routes/suppliersRoutes');

const app = express();

// Middlewares
app.use(cors()); // Permitir solicitudes desde el frontend
app.use(express.json()); // Parsear el cuerpo de las solicitudes en formato JSON

// Rutas

app.use('/api/users', userRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/branchUser', branchUserRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/saleDetails', saleDetailsRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/suppliers', suppliersRoutes);

// Ruta de prueba
app.get('/Health', (req, res) => {
  res.send('¡Backend de la aplicación contable funcionando!');
});

// Sincronizar modelos y crear tablas si no existen
sequelize.sync()
  .then(async () => {
    console.log('Tablas sincronizadas correctamente');
    await seedPlans();
    //await seedCategories();
    const PORT = process.env.PORT || 3080;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al sincronizar las tablas:', err);
  });