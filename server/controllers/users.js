const jwt = require('jsonwebtoken')
const User = require('../models/users')
const {normalizeErrors} = require('../helpers/mongoose') 
const config = require('../config/dev')

exports.auth=(req,res)=>{
    const {username,email,password,passwordConfirmation}=req.body;
    
    if(!password || !email){
        return res.status(422).send({error:[{title:'Data Missing',detail:'Password or email is not provided.'}]})
     }

     User.findOne({email},(err,user)=>{
         if(err){
            return res.status(422).send({errors:normalizeErrors(err.errors)})
         }if(!user){
            return res.status(422).send({error:[{title:'Invalid User!',detail:'User does not exists.'}]})
         }
         if(user.hasSamePassword(password)){
            const token = jwt.sign({
                userId:user.id,
                username:user.username,
            },config.SECRET,{expiresIn:'24h'})
            return res.json(token)
         }else{
            return res.status(422).send({error:[{title:'Wrong Data',detail:'Wrong Email or Password.'}]})
         }
    })

}

exports.register=(req,res)=>{
 
 const {username,email,password,passwordConfirmation}=req.body;
 if(!password || !email){
    return res.status(422).send({error:[{title:'Data Missing',detail:'Password or email is not provided.'}]})
 }

 if(password !== passwordConfirmation){
    return res.status(422).send({error:[{title:'Invalid Password',detail:'Password is not matched.'}]})
 }
 
User.findOne({email},(err,result)=>{
    if(err){
        return res.status(422).send({errors:normalizeErrors(err.errors)})
    }
    if(result){
        return res.status(401).send({error:[{title:'Email exists',detail:'Email alredy exists.'}]})
    }
})
   
    const user = new User({
        username,
        email,
        password
    })
     
    user.save((err)=>{
        if(err){
            return res.status(422).send({errors:normalizeErrors(err.errors)})
        }

    return res.json({'registered':true})    
    })
       
// User.findOne({name:"name"}).then((result)=>{
//     return res.send(JSON.stringify(result,undefined,2))
// }).catch((e)=>{
//     return res.send(e)
// })
}

exports.authMiddleware = function(req,res,next){
    const token = req.headers.authorization;

    if(token){
        const user = parseToken(token)
        User.findById(user.userId,function(err,user){
            if(err){
                return res.status(422).send({errors:normalizeErrors(err.errors)})
            }
            if(user){
                res.locals.user = user;
                next();
            }else{
                return res.status(401).send({error:[{title:'Not authorized',detail:'You need to liogin to get access.'}]})
            }
        })
    }else{
        return res.status(401).send({error:[{title:'Not Authorized',detail:'You need to login to get access.'}]})
    }
}

function parseToken(token){
    return jwt.verify(token.split(' ')[1],config.SECRET)
}


