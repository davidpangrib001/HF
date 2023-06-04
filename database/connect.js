const mongoose = require('mongoose');
const { dbURI } = require('../lib/settings');

function connectMongoDb() {
    mongoose.connect(dbURI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'ALERT NOTICE\nYour Connection To MongoDB Failed!'));
    db.once('open', () => {
      console.log('NOTICE\nConnection To Your MongoDB Successful!');
    });
};

module.exports.connectMongoDb = connectMongoDb;
