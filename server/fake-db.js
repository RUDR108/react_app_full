const User = require('./models/users');
const fakeDbData = require('./data.json')

class fakeDB {
    constructor(){
        this.users=fakeDbData.users
    }

    async cleanDB(){
        await User.deleteMany({})        
    }

    pushDatatoDB(){
        const user = new User(this.users[0])
        const user2 = new User(this.users[1])
        user.save()
        user2.save()
    }
    async seedDB(){
        await this.cleanDB()
        this.pushDatatoDB()
    }

  
}

module.exports=fakeDB;
