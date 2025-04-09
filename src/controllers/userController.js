const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserByEmail, getAllUsers, createRegisteredUser } = require('../models/User');

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


    res.json({ token });

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
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
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