const mongoose = require('mongoose');

const URI = 'mongodb+srv://main:mongodb@edyficacluster.lsmmo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;