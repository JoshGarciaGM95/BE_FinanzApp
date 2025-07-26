const request = require('supertest');
const express = require('express');
const { validateFlow } = require('../src/middleware/validateFlow');

// Mock de modelos
jest.mock('../src/models/Subscription', () => ({
  getSubscriptionByUserId: jest.fn()
}));
jest.mock('../src/models/Company', () => ({
  getCompanyByUserId: jest.fn()
}));
jest.mock('../src/models/BranchUser', () => ({
  getBranchUsersByUserId: jest.fn()
}));
jest.mock('../src/models/Branches', () => ({
  getAllBranches: jest.fn()
}));
jest.mock('../src/models/Plan', () => ({
  getPlanById: jest.fn()
}));

const { getSubscriptionByUserId } = require('../src/models/Subscription');
const { getCompanyByUserId } = require('../src/models/Company');
const { getBranchUsersByUserId } = require('../src/models/BranchUser');
const { getAllBranches } = require('../src/models/Branches');
const { getPlanById } = require('../src/models/Plan');

const app = express();
app.use(express.json());
app.post('/test', (req, res, next) => {
  req.user = req.body.user; // Simula usuario autenticado
  next();
}, validateFlow, (req, res) => {
  res.status(200).json({ message: 'Acceso permitido' });
});

describe('Middleware validateFlow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('bloquea si no hay suscripción', async () => {
    getSubscriptionByUserId.mockResolvedValue(null);
    const res = await request(app).post('/test').send({ user: { user_id: 1 } });
    expect(res.status).toBe(403);
    expect(res.body.message).toMatch(/suscripción/);
  });

  it('bloquea si no hay empresa', async () => {
    getSubscriptionByUserId.mockResolvedValue({ plan_id: 1 });
    getCompanyByUserId.mockResolvedValue(null);
    const res = await request(app).post('/test').send({ user: { user_id: 1 } });
    expect(res.status).toBe(403);
    expect(res.body.message).toMatch(/empresa/);
  });

  it('bloquea si no hay sucursal', async () => {
    getSubscriptionByUserId.mockResolvedValue({ plan_id: 1 });
    getCompanyByUserId.mockResolvedValue({ company_id: 1 });
    getBranchUsersByUserId.mockResolvedValue([]);
    const res = await request(app).post('/test').send({ user: { user_id: 1 } });
    expect(res.status).toBe(403);
    expect(res.body.message).toMatch(/sucursal/);
  });

  it('bloquea si supera el límite de sucursales', async () => {
    getSubscriptionByUserId.mockResolvedValue({ plan_id: 1 });
    getCompanyByUserId.mockResolvedValue({ company_id: 1 });
    getBranchUsersByUserId.mockResolvedValue([{ branch_id: 1 }]);
    getPlanById.mockResolvedValue({ max_branches: 1 });
    getAllBranches.mockResolvedValue([{ company_id: 1 }]);
    const res = await request(app).post('/branch/create').send({ user: { user_id: 1 } });
    expect(res.status).toBe(403);
    expect(res.body.message).toMatch(/límite de sucursales/);
  });

  it('permite acceso si todo está correcto', async () => {
    getSubscriptionByUserId.mockResolvedValue({ plan_id: 1 });
    getCompanyByUserId.mockResolvedValue({ company_id: 1 });
    getBranchUsersByUserId.mockResolvedValue([{ branch_id: 1 }]);
    getPlanById.mockResolvedValue({ max_branches: 2 });
    getAllBranches.mockResolvedValue([{ company_id: 1 }]);
    const res = await request(app).post('/test').send({ user: { user_id: 1 } });
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/Acceso permitido/);
  });
});
