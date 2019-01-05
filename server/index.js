const express=require('express')
const Rental = require('./models/rentals')
const bodyParser=require('body-parser');
const {mongoose}=require('./db/mongoose');
const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/users')
const bookingRoutes = require('./routes/bookings')
const config = require('./config');
const path = require('path');
//const imageUploadRoute = require('./routes/image-upload');

const app=express();
const PORT=process.env.PORT ||3001;

app.use(bodyParser.json());

app.use('/api/v1/rentals',rentalRoutes);
app.use('/api/v1/users',userRoutes)
app.use('/api/v1/bookings',bookingRoutes)
//app.use('/api/v1',imageUploadRoutes)

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














