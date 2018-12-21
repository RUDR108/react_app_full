const jwt = require('jsonwebtoken')
const Booking = require('../models/bookings')
const Rental = require('../models/rentals')
const {normalizeErrors} = require('../helpers/mongoose') 
const config = require('../config/dev')
const moment = require('moment')
const User = require('../models/users')

exports.createBooking=function(req,res){
const {startAt,endAt,totalPrice,guests,days,rental} = req.body
const user = res.locals.user
const booking = new Booking({startAt,endAt,totalPrice,guests,days})
Rental.findById(rental._id)
    .populate('bookings')
    .populate('user')
    .exec(function(err,foundRental){
        
        if(err){
            return res.status(422).send({errors:normalizeErrors(err.errors)})
        }

        if(foundRental.user._id===user._id){
            return res.status(422).send({errors:[{title:'Invalid User!',detail:'Cannot create booking on your own rental.'}]})
        }

        if(isValidBooking(booking,foundRental)){
            booking.user =user 
            booking.rental = foundRental
            foundRental.bookings.push(booking)
            
            booking.save(function(err){
                if(err){
                    return res.status(422).send({errors:normalizeErrors(err.errors)})
                }
                foundRental.save()
                User.update({_id:user.id},{$push:{bookings:booking}})
               
                return  res.json({startAt:booking.startAt,endAt:booking.endAt})
            });
        }
        else{
            return res.status(422).send({errors:[{title:'Invalid booking!',detail:'Choosen dates are already taken.'}]})
        }
    })
}

function isValidBooking(proposedBooking,rental){
    let isValid = true;

    if(rental.bookings && rental.bookings.length > 0){
        rental.booking.every(function(booking){
            const proposedStart = moment(proposedBooking.startAt)
            const proposedEnd = moment(proposedBooking.endAt)
            const actualStart = moment(booking.startAt)
            const actualEnd = moment(booking.endAt)

            if((actualStart < proposedStart && actualEnd < proposedStart) || (proposedEnd < actualEnd && proposedEnd < actualStart)){
                return true;
            }else{
                return false
            }
        })
    }
} 