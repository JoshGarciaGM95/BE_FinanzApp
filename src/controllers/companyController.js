const { createCompany, updateCompany, getCompanyByUserId } = require('../models/Company')

const newCompany = async (req, res) => {
    const { user_id,  company_name, contact_email, contact_phone, address, registration_date, status  } = req.body;
    try {
        const company = await createCompany(user_id, company_name, contact_email, contact_phone, address, registration_date, status);
        res.json(company)
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener los planes' });

    }
}

const getCompanyByUser = async (req, res) => {
    const { user_id } = req.body;
    try{
        const company = await getCompanyByUserId(user_id);
        res.json(company);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener los planes' });

    }
}

module.exports = {
    newCompany,
    getCompanyByUser
}