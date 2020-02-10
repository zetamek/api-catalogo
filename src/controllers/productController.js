const express = require('express');
const Product = require('../models/productModel');

const router = express.Router();

const messages = {
    registerFailed: 'Falha ao registrar produto',
    alreadyExists: 'Nome já está cadastrado'
};

router.post('/create', async (req, res) => {
    const { cnpj } = req.body

    try {
        const product = await Product.create(req.body);

        return res.send({ error: false, data: product });
    } catch (err) {
        return res.status(500).json({ error: true, data: err.message })
    }
});

router.get('/get', async (req, res) => {
    try {
        Product.find((err, data) => {
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
        Product.findOne({ _id: id }, (err, data) => {
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
        Product.updateOne({ _id: id }, req.body, (err, data) => {
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
        Product.deleteOne({ _id: id }, req.body, (err, data) => {
            if (err) return res.status(404).json({ error: true, data: messages.findFailed });
            return res.status(200).json({ error: false, data });
        })
    } catch (err) {
        return res.status(500).json({ error: true, data: messages.findAllFailed })
    }
});

module.exports = app => app.use('/product', router);