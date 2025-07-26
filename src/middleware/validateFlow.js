const { getSubscriptionByUserId } = require('../models/Subscription');
const { getCompanyByUserId } = require('../models/Company');
const { getBranchUsersByUserId } = require('../models/BranchUser');
const { getAllBranches, getBranchById } = require('../models/Branches');
const { getPlanById } = require('../models/Plan');

const validateSubscription = async (req, res, next) => {
  const user_id = req.user?.user_id || req.body.user_id;
  if (!user_id) return res.status(401).json({ message: 'Usuario no autenticado' });

  // 1. Validar suscripción
  const subscription = await getSubscriptionByUserId(user_id);
  if (!subscription) {
    return res.status(403).json({ message: 'Debe adquirir una suscripción antes de continuar.' });
  }
}

const validateCompany = async (req, res, next) => {
  const user_id = req.user?.user_id || req.body.user_id;
  if (!user_id) return res.status(401).json({ message: 'Usuario no autenticado' });

  // 2. Validar empresa
  const company = await getCompanyByUserId(user_id);
  if (!company) {
    return res.status(403).json({ message: 'Debe crear una empresa antes de continuar.' });
  }
}

const validateBranch = async (req, res, next) => {
  const user_id = req.user?.user_id || req.body.user_id;
  if (!user_id) return res.status(401).json({ message: 'Usuario no autenticado' });

  // 3. Validar sucursal
  const branchUsers = await getBranchUsersByUserId(user_id);
  if (!branchUsers || branchUsers.length === 0) {
    return res.status(403).json({ message: 'Debe crear y/o seleccionar una sucursal antes de continuar.' });
  }

  next();
};

// Middleware para validar el flujo de negocio
const validateFlow = async (req, res, next) => {
  await validateSuscription(req, res, next);
  await validateCompany(req, res, next);
  await validateBranch(req, res, next);
};

// Middleware para validar rol de admin
const validateAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Solo el usuario administrador puede realizar esta acción.' });
  }
  next();
};

// Middleware para validar acceso a sucursal
const validateBranchAccess = async (req, res, next) => {
  const user_id = req.user?.user_id || req.body.user_id;
  const branch_id = req.body.branch_id || req.params.branch_id;
  if (!user_id || !branch_id) return res.status(400).json({ message: 'Faltan datos de usuario o sucursal.' });
  const branchUsers = await getBranchUsersByUserId(user_id);
  const hasAccess = branchUsers.some(bu => bu.branch_id == branch_id);
  if (!hasAccess) {
    return res.status(403).json({ message: 'No tiene acceso a esta sucursal.' });
  }
  next();
};

module.exports = {
  validateSubscription,
  validateCompany,
  validateBranch,
  validateFlow,
  validateAdmin,
  validateBranchAccess
};
