const express = require('express');
const Company = require('../models/company');

const router = express.Router();

const messages = {
    registerFailed: 'Falha ao registrar empresa',
    alreadyExists: 'CNPJ já está cadastrado'
};

router.post('/register', async (req, res) => {
    const { cnpj } = req.body

    try {
        if (await Company.findOne({ cnpj }))
            return res.send(400).send({ error: messages.alreadyExists});

        const company = await Company.create(req.body);

        return res.send({ company });
    } catch (err) {
        return res.status(400).send({ error: messages.registerFailed });
    }
});

module.exports = app => app.use('/company', router);