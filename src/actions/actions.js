import axios from 'axios';
import authService from '../services/auth-service'
import axiosService from '../services/axios-service'

const axiosInstance = axiosService.getInstance();


//Auth Action ----------------------------------------------
 export const register = (userData) => {
    return axios.post('/api/v1/users/register',userData).then((res)=>{
        return res.data;
    },
    (err)=>{
        return Promise.reject(err.response.data.error)
    })
 }

export const logInSuccess = (email) =>{
    const username = authService.getUsername()
    return {
        type:'LOGIN_SUCCESS',
       username,
       email
    }
}

export const logInFailure = (errors) =>{
    return {
        type:'LOGIN_FAILURE',
        errors
    }
}

export const checkAuthState = () =>{
return dispatch => {
    if(authService.isAuthenticate()){
        dispatch(logInSuccess())
    }
}
}

export const logIn = (userData)=>{
    return dispatch =>{
        return axios.post('/api/v1/users/auth',userData)
        .then((res)=>{
            return res.data
        }).then(({email,token})=>{
            authService.saveToken(token)
            dispatch(logInSuccess(email))
        }).catch(({response})=>{
            dispatch(logInFailure(response.data.errors))
        })
    }
}

export const logout = () =>{
    authService.invalidateUser();
    return{
        type:'LOGOUT'

    } 
}


