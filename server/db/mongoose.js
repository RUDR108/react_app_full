const mongoose=require('mongoose');
const config = require('../config')
const fakeDB = require('../fake-db')
mongoose.Promise=global.Promise;

mongoose.connect( config.DB_URI || 'mongodb://localhost:27017/rentals', { useNewUrlParser: true } ).then(
  () => {
    if(process.env.NODE_ENV !== 'production'){
      const FakeDB=new fakeDB();
      FakeDB.seedDB(); 
    }},
    err => { console.log('can not connect')/** handle initial connection error */ }
  );
mongoose.set('useCreateIndex',true);  

module.exports= {mongoose};