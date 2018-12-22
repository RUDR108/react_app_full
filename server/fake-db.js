const Rental = require('./models/rentals');
const User = require('./models/users');
const fakeDbData = require('./data.json')
const Booking = require('./models/bookings')

class fakeDB {
    constructor(){
        this.rentals=fakeDbData.rentals
        this.users=fakeDbData.users
    }

    async cleanDB(){
        await User.deleteMany({})        
        await Rental.deleteMany({});
        await Booking.deleteMany({})
    }

    pushDatatoDB(){
        const user = new User(this.users[0])
        const user2 = new User(this.users[1])
        this.rentals.forEach((rental)=>{
            const newRental = new Rental(rental)
            newRental.user=user;
            user.rentals.push(newRental)
            newRental.save()
        })
        user.save()
        user2.save()
    }
    async seedDB(){
        await this.cleanDB()
        this.pushDatatoDB()
    }

  
}

module.exports=fakeDB;
