const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { getUserByEmail, getAllUsers, createRegisteredUser } = require('../models/User');
const { getBranchUsersByUserId } = require('../models/BranchUser');
const { getBranchesByIds } = require('../models/Branches');

const getListUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
}

const registerUser = async (req, res) => {
  const { name, email, password, confirmedPassword, confirmedEmail } = req.body;

  try {

    // Validar los datos de entrada
    if (password !== confirmedPassword)
      return res.status(400).json({ message: 'Las contraseñas no coinciden' });

    if (email !== confirmedEmail)
      return res.status(400).json({ message: 'Los correos electrónicos no coinciden' });

    // Verificar si el usuario ya existe
    const existingUser = await getUserByEmail(email);
    if (existingUser)
      return res.status(400).json({ message: 'El usuario ya existe' });

    // Cifrar la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear el usuario
    const newUser = await createRegisteredUser(name, email, passwordHash, 3, 'active', new Date());

    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });


    res.json({ token: token, userId: newUser.id, name: newUser.name });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Generar un token JWT
    const token = jwt.sign({ user_id: user.user_id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Validar suscripción
    const { getSubscriptionByUserId } = require('../models/Subscription');
    const subscription = await getSubscriptionByUserId(user.user_id);
    if (!subscription) {
      return res.status(200).json({ nextStep: 'subscription', message: 'Debe adquirir una suscripción antes de continuar.', token: token, userId: user.user_id,
      username: user.username });
    }

    // Validar empresa
    const { getCompanyByUserId } = require('../models/Company');
    const company = await getCompanyByUserId(user.user_id);
    if (!company) {
      return res.status(200).json({ nextStep: 'company', message: 'Debe crear una empresa antes de continuar.', token: token, userId: user.user_id,
      username: user.username, companyId: company.company_id });
    }

    // Obtener sucursales asociadas al usuario
    const branchUserRecords = await getBranchUsersByUserId(user.user_id);
    let branches = [];
    if (branchUserRecords.length > 0) {
      const branchIds = branchUserRecords.map(bu => bu.branch_id);
      branches = await getBranchesByIds(branchIds);
    }
    if (branches.length === 0) {
      return res.status(200).json({ nextStep: 'branch', message: 'Debe crear y/o seleccionar una sucursal antes de continuar.', token: token, userId: user.user_id,
      username: user.username, companyId: company.company_id });
    }

   

    res.status(200).json({
      token: token,
      userId: user.user_id,
      username: user.username,
      companyId: company.company_id,
      branches: branches
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getListUsers
};