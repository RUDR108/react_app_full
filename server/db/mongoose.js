const mongoose=require('mongoose');
const config = require('../config/dev')
const fakeDB = require('../fake-db')
mongoose.Promise=global.Promise;

mongoose.connect( config.DB_URI || 'mongodb://localhost:27017/rentals', { useNewUrlParser: true } ).then(
    () => { const FakeDB=new fakeDB();
    FakeDB.seedDB();
    },
    err => { console.log('can not connect')/** handle initial connection error */ }
  );

module.exports= {mongoose};