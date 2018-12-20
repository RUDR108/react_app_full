const bcrypt = require('bcrypt');
const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const userSchema=new Schema({
username:{type:String,required:'Username is required',max:[32,'Too Long,word Limit is 32.'],min:[4,'Too short,word limit is 4']},
email:{type:String,required:'Email is required',max:[64,'Too Long,word Limit is 64.'],min:[4,'Too short,word limit is 4'],lowercase:true,unique:true,match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]},
password:{type:String,required:'Username is required',max:[32,'Too Long,word Limit is 32.'],min:[4,'Too short,word limit is 4']},
rentals:[{type:Schema.Types.ObjectId,ref:'Rental'}],
bookings:{type:Schema.Types.ObjectId,ref:'Booking'}
});

userSchema.methods.hasSamePassword = function(requestedPassword){
    return bcrypt.compareSync(requestedPassword,this.password)
}

userSchema.pre('save',function(next){
    const user = this;
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(user.password,salt,function(err,hash){
            user.password=hash;
            next();
        })
    })
})

module.exports=mongoose.model('User',userSchema);