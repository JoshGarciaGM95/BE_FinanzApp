const { getAllSales, getSaleById, createSale, updateSale, deleteSale } = require('../models/Sales');

module.exports = {
  async getAll(req, res) {
    const { company_id, branch_id } = req.query;
    try {
      if (!company_id || !branch_id) {
        return res.status(400).json({ error: 'company_id y branch_id son requeridos' });
      }
      const items = await getAllSales(company_id, branch_id);
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
      const item = await getSaleById(req.params.id, company_id, branch_id);
      if (!item) return res.status(404).json({ error: 'No encontrado o no autorizado' });
      res.json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  async create(req, res) {
    const { company_id, branch_id, user_id, sale_date, total } = req.body;
    try {
      if (!company_id || !branch_id) {
        return res.status(400).json({ error: 'company_id y branch_id son requeridos' });
      }
      const item = await createSale({ company_id, branch_id, user_id, sale_date, total });
      res.status(201).json(item);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  async update(req, res) {
    const { company_id, branch_id, user_id, sale_date, total } = req.body;
    try {
      if (!company_id || !branch_id) {
        return res.status(400).json({ error: 'company_id y branch_id son requeridos' });
      }
      const updated = await updateSale(req.params.id, company_id, branch_id, { user_id, sale_date, total });
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
      const deleted = await deleteSale(req.params.id, company_id, branch_id);
      if (!deleted) return res.status(404).json({ error: 'No encontrado o no autorizado' });
      res.json({ message: 'Eliminado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
