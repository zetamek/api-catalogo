const mongoose = require('mongoose');

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
    address: {
        type: String
    }
});

const Company = mongoose.model('User', CompanySchema);

module.exports = Company;