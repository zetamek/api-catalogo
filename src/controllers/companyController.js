const express = require('express');
const Company = require('../models/companyModel');
const Product = require('../models/productModel');

const router = express.Router();

const messages = {
    registerFailed: 'Falha ao registrar empresa',
    alreadyExists: 'CNPJ já está cadastrado',
    findAllFailed: 'Falha ao carregar todas as empresas',
    findFailed: 'Falha ao carregar a empresa'
};

router.post('/create', async (req, res) => {
    try {
        const company = await Company.create(req.body);

        return res.send({ error: false, data: company });
    } catch (err) {
        return res.status(500).json({ error: true, data: err.message })
    }
});

router.get('/get', async (req, res) => {
    try {
        Company.find((err, data) => {
            if (err) return res.status(404).json({ error: true, data: messages.findFailed });
            return res.status(200).json({ error: false, data });
        })
    } catch (err) {
        return res.status(500).json({ error: true, data: messages.findAllFailed })
    }
});

router.get('/get/:id', async (req, res) => {
    const id = req.params.id;

    try {
        Company.findOne({ _id: id }, (err, data) => {
            if (err) return res.status(404).json({ error: true, data: messages.findFailed });
            return res.status(200).json({ error: false, data });
        })
    } catch (err) {
        return res.status(500).json({ error: true, data: messages.findAllFailed })
    }
});

router.put('/update/:id', async (req, res) => {
    const id = req.params.id;

    try {
        Company.updateOne({ _id: id }, req.body, (err, data) => {
            if (err) return res.status(404).json({ error: true, data: messages.findFailed });
            return res.status(200).json({ error: false, data });
        })
    } catch (err) {
        return res.status(500).json({ error: true, data: messages.findAllFailed })
    }
});

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;

    try {
        Company.deleteOne({ _id: id }, req.body, (err, data) => {
            if (err) return res.status(404).json({ error: true, data: messages.findFailed });

            Product.deleteMany({ companyId: id }, (err, data) => {
                if (err) return res.status(404).json({ error: true, data: 'Erro ao remover produtos da empresa' });
            });

            return res.status(200).json({ error: false, data });
        })
    } catch (err) {
        return res.status(500).json({ error: true, data: messages.findAllFailed })
    }
});

module.exports = app => app.use('/company', router);