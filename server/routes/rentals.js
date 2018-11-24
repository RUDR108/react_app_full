const express =require('express')
const router = express.Router();
const Rental=require('../models/rentals');

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
    
Rental.findById(rentalId,(err,result)=>{
if(err){
    return res.status(422).send({errors : [{title:'Rental Error',Detail:'Could Not Found'}]})
}
res.send(JSON.stringify(result,undefined,2))
}).catch(()=>{

})
});




module.exports=router;