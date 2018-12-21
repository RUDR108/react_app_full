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
Rental.find({})
.select('-bookings')
.exec(function(err,foundRental){
    if(err){
        return res.status(422).send({errors:[{title:'Rental Error!' , detail:'Could not find rental'}]})
    }
        return res.json(foundRental)
    })
});

router.get('/:id',(req,res)=>{
    const rentalId=req.params.id;
    
Rental.findById(rentalId)
.populate('user','username -_id')
.populate('bookings startAt endAt -_id')
.exec(function(err,foundRental){
if(err){
    return res.status(422).send({errors:[{title:'Rental Error!' , detail:'Could not find rental'}]})
}
    return res.json(foundRental)
})
});




module.exports=router;