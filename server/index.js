const express=require('express')
const bodyParser=require('body-parser');
const {mongoose}=require('./db/mongoose');
const userRoutes = require('./routes/users')
const config = require('./config');
const path = require('path');
//const imageUploadRoute = require('./routes/image-upload');

const app=express();
const PORT=process.env.PORT ||3001;

app.use(bodyParser.json());

app.use('/api/v1/users',userRoutes)
<<<<<<< HEAD
app.use('/api/v1/bookings',bookingRoutes)
//app.use('/api/v1',imageUploadRoutes)
=======

>>>>>>> 0dfd8a8dd3b80a523033a08e8032250a6fb1e871

if(process.env.NODE_ENV === 'production'){
    const appPath = path.join(__dirname,'..','build')

    app.use(express.static(appPath))
    
    app.get('*',function(req,res){
        res.sendFile(path.resolve(appPath,'index.html'));
    })
}

app.listen(PORT,()=>{
    console.log('server is running.')
})














