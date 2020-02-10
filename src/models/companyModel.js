const mongoose = require('../database');

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    cnpj: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String
    },
    address: {
        type: String
    },
    workers: {
        type: Number
    }
});

const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;