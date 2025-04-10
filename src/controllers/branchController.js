const {
    createBranch,
    getBranchById,
    getAllBranches,
    getBranchByCompanyId,
    updateBranch,
    deleteBranch,
    deleteBranchByCompanyId
} = require('../models/Branches');


const newBranch = async (req, res) => {
    const { company_id, branch_name, adress, phone, status, creation_date } = req.body;
    try {
        const branch = await createBranch(company_id, branch_name, adress, phone, status, creation_date);
        res.json(branch)
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener los planes' });

    }
}

module.exports = {
    newBranch
}