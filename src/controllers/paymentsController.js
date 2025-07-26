const { getAllPayments, getPaymentById, createPayment, updatePayment, deletePayment } = require('../models/Payments');

module.exports = {
  async getAll(req, res) {
    const { company_id, branch_id } = req.query;
    try {
      if (!company_id || !branch_id) {
        return res.status(400).json({ error: 'company_id y branch_id son requeridos' });
      }
      const items = await getAllPayments(company_id, branch_id);
      res.json(items);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  async getById(req, res) {
    const { company_id, branch_id } = req.query;
    try {
      if (!company_id || !branch_id) {
        return res.status(400).json({ error: 'company_id y branch_id son requeridos' });
      }
      const item = await getPaymentById(req.params.id, company_id, branch_id);
      if (!item) return res.status(404).json({ error: 'No encontrado o no autorizado' });
      res.json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  async create(req, res) {
    const { company_id, branch_id, sale_id, payment_method, amount, payment_date } = req.body;
    try {
      if (!company_id || !branch_id) {
        return res.status(400).json({ error: 'company_id y branch_id son requeridos' });
      }
      const item = await createPayment({ company_id, branch_id, sale_id, payment_method, amount, payment_date });
      res.status(201).json(item);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  async update(req, res) {
    const { company_id, branch_id, sale_id, payment_method, amount, payment_date } = req.body;
    try {
      if (!company_id || !branch_id) {
        return res.status(400).json({ error: 'company_id y branch_id son requeridos' });
      }
      const updated = await updatePayment(req.params.id, company_id, branch_id, { sale_id, payment_method, amount, payment_date });
      if (!updated) return res.status(404).json({ error: 'No encontrado o no autorizado' });
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  async delete(req, res) {
    const { company_id, branch_id } = req.query;
    try {
      if (!company_id || !branch_id) {
        return res.status(400).json({ error: 'company_id y branch_id son requeridos' });
      }
      const deleted = await deletePayment(req.params.id, company_id, branch_id);
      if (!deleted) return res.status(404).json({ error: 'No encontrado o no autorizado' });
      res.json({ message: 'Eliminado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
