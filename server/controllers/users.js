const jwt = require('jsonwebtoken')
const User = require('../models/users')
const {normalizeErrors} = require('../helpers/mongoose') 
const config = require('../config')
const emailExistence = require('email-existence')

exports.auth =  function(req, res) {
    const { email, password } = req.body;
  
    if (!password || !email) {
      return res.status(422).send({errors: [{title: 'Data missing!', detail: 'Provide email and password!'}]});
    }
  
    User.findOne({email}, function(err, user) {
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
  
      if (!user) {
        return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'User does not exist'}]});
      }
  
      if (user.hasSamePassword(password)) {
        const token = jwt.sign({
          userId: user.id,
          username: user.username
        }, config.SECRET, { expiresIn: '1h'});
  
    
        return res.json({email,token});
      } else {
        return res.status(422).send({errors: [{title: 'Wrong Data!', detail: 'Wrong email or password'}]});
      }
    });
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
    
      emailExistence.check(`${email}`, function(error, response){
        if (error){
          return res.status(401).send({error:[{title:'Email is not valid',detail:'Email is not valid.'}]})
        } else if(response){
          console.log(response)
        }
    });
    
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
     })
   }
   

   exports.authMiddleware = function(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
      const user = parseToken(token);
      
      User.findById(user.userId, function(err, user){
        if (err) {
          return res.status(422).send({errors:normalizeErrors(err.errors) });
        }

        if(user){
              res.locals.user = user;
          next();
        } else {
          return res.status(401).send({errors: [{title: 'Not authorized!', detail: 'You need to login to get access!'}]});
        }
      })
    } else {
      return notAuthorized(res);
    }
  }
  
  function parseToken(token) {
    return jwt.verify(token.split(' ')[1], config.SECRET);
  }
  
  function notAuthorized(res) {
    return res.status(401).send({errors: [{title: 'Not authorized!', detail: 'You need to login to get access!'}]});
  }        