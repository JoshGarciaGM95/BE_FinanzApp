const { getAllPlans, getPlanById } = require('../models/Plan');

const getListPlans = async (req, res) => {
    try {
        const plans = await getAllPlans();
        res.json(plans);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener los planes' });
    }
}

const getPlanByIdController = async (req, res) => {
    const { plan_id } = req.body;
    try {
        const plan = await getPlanById(plan_id);
        if (!plan) {
            return res.status(204).json({ message: 'Plan no encontrado' });
        }
        res.json(plan);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener el plan' });
    }
}

module.exports = {
    getListPlans,
    getPlanByIdController
};