const mongoose = require('mongoose');

// Connection info
const address = 'localhost';
const database = 'noderest';
const port = 27017;

mongoose.set('useCreateIndex', true);

mongoose.connect(`mongodb://${address}:${port}/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

Promise = global.Promise;

module.exports = mongoose;