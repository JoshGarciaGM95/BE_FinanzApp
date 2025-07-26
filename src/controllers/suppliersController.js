const { getAllSuppliers, getSupplierById, createSupplier, updateSupplier, deleteSupplier } = require('../models/Suppliers');

module.exports = {
  async getAll(req, res) {
    const { company_id } = req.query;
    try {
      if (!company_id) {
        return res.status(400).json({ error: 'company_id es requerido' });
      }
      const items = await getAllSuppliers(company_id);
      res.json(items);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  async getById(req, res) {
    const { company_id } = req.query;
    try {
      if (!company_id) {
        return res.status(400).json({ error: 'company_id es requerido' });
      }
      const item = await getSupplierById(req.params.id, company_id);
      if (!item) return res.status(404).json({ error: 'No encontrado o no autorizado' });
      res.json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  async create(req, res) {
    const { company_id, supplier_name, phone, email, address } = req.body;
    try {
      if (!company_id) {
        return res.status(400).json({ error: 'company_id es requerido' });
      }
      // Validar existencia de empresa antes de crear
      // const company = await Company.findByPk(company_id);
      // if (!company) return res.status(404).json({ error: 'Empresa no existe' });
      const item = await createSupplier({ company_id, supplier_name, phone, email, address });
      res.status(201).json(item);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  async update(req, res) {
    const { company_id, supplier_name, phone, email, address } = req.body;
    try {
      if (!company_id) {
        return res.status(400).json({ error: 'company_id es requerido' });
      }
      const updated = await updateSupplier(req.params.id, company_id, { supplier_name, phone, email, address });
      if (!updated) return res.status(404).json({ error: 'No encontrado o no autorizado' });
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  async delete(req, res) {
    const { company_id } = req.query;
    try {
      if (!company_id) {
        return res.status(400).json({ error: 'company_id es requerido' });
      }
      const deleted = await deleteSupplier(req.params.id, company_id);
      if (!deleted) return res.status(404).json({ error: 'No encontrado o no autorizado' });
      res.json({ message: 'Eliminado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
