const Inventory = require('../models/Inventory');

module.exports = {
  async getAll(req, res) {
    const { company_id, branch_id } = req.query;
    try {
      if (!company_id || !branch_id) {
        return res.status(400).json({ error: 'company_id y branch_id son requeridos' });
      }
      const items = await Inventory.findAll({ where: { company_id, branch_id } });
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
      const item = await Inventory.findOne({ where: { inventory_id: req.params.id, company_id, branch_id } });
      if (!item) return res.status(404).json({ error: 'No encontrado o no autorizado' });
      res.json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  async create(req, res) {
    const { company_id, branch_id } = req.body;
    try {
      if (!company_id || !branch_id) {
        return res.status(400).json({ error: 'company_id y branch_id son requeridos' });
      }
      // Opcional: Validar que el usuario tenga acceso a la sucursal/empresa
      const item = await Inventory.create(req.body);
      res.status(201).json(item);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  async update(req, res) {
    const { company_id, branch_id } = req.body;
    try {
      if (!company_id || !branch_id) {
        return res.status(400).json({ error: 'company_id y branch_id son requeridos' });
      }
      const item = await Inventory.findOne({ where: { inventory_id: req.params.id, company_id, branch_id } });
      if (!item) return res.status(404).json({ error: 'No encontrado o no autorizado' });
      await item.update(req.body);
      res.json(item);
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
      const item = await Inventory.findOne({ where: { inventory_id: req.params.id, company_id, branch_id } });
      if (!item) return res.status(404).json({ error: 'No encontrado o no autorizado' });
      await item.destroy();
      res.json({ message: 'Eliminado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
