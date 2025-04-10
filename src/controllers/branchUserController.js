const { createBranchUser } = require('../models/BranchUser');

const newBranchUser = async (req, res) => {
    const { branch_id, user_id, status, assigned_date } = req.body;
    try {
        const branchUser = await createBranchUser(branch_id, user_id, status, assigned_date);
        res.json(branchUser)
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener los planes' });

    }
}

module.exports = {
    newBranchUser
}