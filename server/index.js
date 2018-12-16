const express=require('express')
const Rental = require('./models/rentals')
const bodyParser=require('body-parser');
const {mongoose}=require('./db/mongoose');
const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/users')

const app=express();
const PORT=process.env.PORT ||3001;

app.use(bodyParser.json());

app.use('/api/v1/rentals',rentalRoutes);
app.use('/api/v1/users',userRoutes)


 app.listen(PORT,()=>{
    console.log('server is running.')
})














