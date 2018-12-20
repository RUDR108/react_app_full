const express =require('express')
const router = express.Router();
const Rental=require('../models/rentals');
const User = require('../models/users')
const { normalizeErrors } = require('../helpers/mongoose');

const UserCtrl = require('../controllers/users');

router.get('/secret', UserCtrl.authMiddleware, function(req, res) {
  res.json({"secret": true});
});

router.get('',(req,res)=>{
    Rental.find({},(err,result)=>{
        if(err){
         return res.status(404).send(err)   
        }
        res.send(JSON.stringify(result,undefined,2))
    }).catch(()=>{
        
    })
});

router.get('/:id',(req,res)=>{
    const rentalId=req.params.id;
    
Rental.findById(rentalId)
.populate('user')
.populate('bookings')
.exec(function(err,foundRental){
if(err){
    return res.status(422).send({errors:[{title:'Rental Error!' , detail:'Could not find rental'}]})
}
    return res.json(foundRental)
})
});




module.exports=router;