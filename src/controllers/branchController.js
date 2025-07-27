const {
    createBranch,
    getBranchById,
    getAllBranches,
    getBranchByCompanyId,
    updateBranch,
    deleteBranch
} = require('../models/Branches');


const newBranch = async (req, res) => {
    const { company_id, branch_name, address, phone, status, creation_date, id_User } = req.body;
    try {
        const branch = await createBranch(company_id, branch_name, address, phone, status, creation_date, id_User);
        res.json(branch)
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener los planes' });

    }
}

const getBranchByCompany = async (req, res) => {
    const { company_Id } = req.params; // <-- usa el nombre correcto
    try {
        const branch = await getBranchByCompanyId(company_Id);
        res.json(branch)
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener los planes' });

    }
}  

const getBranch = async (req, res) => {
    const { branch_id } = req.params;
    try {
        const branch = await getBranchById(branch_id);
        res.json(branch)
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener los planes' });

    }
}

const getBranches = async (req, res) => {
    try {
        const branches = await getAllBranches();
        res.json(branches)
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener los planes' });

    }
}

const editBranch = async (req, res) => {
    const { branch_id } = req.params;
    const { company_id, branch_name, address, phone, status, creation_date } = req.body;
    try {
        const branch = await updateBranch(branch_id, company_id, branch_name, address, phone, status, creation_date);
        res.json(branch)
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener los planes' });

    }
}

const dropBranch = async (req, res) => {
    const { branch_id } = req.params;
    try {
        const branch = await deleteBranch(branch_id);
        res.json(branch)
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener los planes' });

    }
}

module.exports = {
    newBranch,
    editBranch,
    getBranchByCompany,
    getBranch,
    getBranches,
    dropBranch
}