const express=require('express')
const bodyParser=require('body-parser');
const {mongoose}=require('./db/mongoose');
const userRoutes = require('./routes/users')
const config = require('./config');
const path = require('path');

const app=express();
const PORT=process.env.PORT ||3001;

app.use(bodyParser.json());

app.use('/api/v1/users',userRoutes)


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














