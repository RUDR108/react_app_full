import * as jwt from 'jsonwebtoken'; 
import * as moment from 'moment';

class authService{

    getToken(){
        localStorage.getItem('auth_token')
    }

    decode(token){
        return jwt.decode(token)
    }

    saveToken(token){
        localStorage.setItem('auth_token',token)
    }

    invalidateUser(){
        localStorage.removeItem('auth_token')
    }

    getExpiration(token){
        const exp = this.decode(token).exp

        return moment.unix(exp)
    }

    isValid(token){
        return moment().isBefore(this.getExpiration(token))
    }

    isAuthenticate(){
        const token = this.getToken();
  
        return (token && this.isValid(token)) ? true : false
   
    }

}


export default new authService();