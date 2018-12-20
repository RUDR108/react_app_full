const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
        endAt: { type: Date, required:'Ending date is required.'},
        startAt: { type: Date, required:'Start date is required.'},
        totalPrice:Number,
        days: Number,
        guests:Number,
        createdAt: { type: Date, default: Date.now },
        user:{type:Schema.Types.ObjectId,ref:'User'},
        rental:{type:Schema.Types.ObjectId,ref:'Rental'}
});

module.exports=mongoose.model('Booking',rentalSchema);