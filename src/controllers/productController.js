const express = require('express');
const Product = require('../models/product');

const router = express.Router();

const messages = {
    registerFailed: 'Falha ao registrar produto',
    alreadyExists: 'Nome já está cadastrado'
};

router.post('/register', async (req, res) => {
    const { name } = req.body

    try {
        if (await Product.findOne({ name }))
            return res.send(400).send({ error: messages.alreadyExists });

        const product = await Product.create(req.body);

        return res.send({ product });
    } catch (err) {
        return res.status(400).send({ error: messages.registerFailed });
    }
});

module.exports = app => app.use('/product', router);