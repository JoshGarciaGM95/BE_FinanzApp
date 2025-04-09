const { getAllPlans } = require('../models/Plan');

const getListPlans = async (res) => {
    try {
        const plans = await getAllPlans();
        res.json(plans);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener los planes' });
    }
}

module.exports = {
    getListPlans
};