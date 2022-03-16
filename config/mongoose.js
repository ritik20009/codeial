const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console,"error connecting to the database"));

db.once('open', function(){
    console.log("connected to database:: mongodb ");
});

module.exports = db;