import axios from 'axios';
import authService from '../services/auth-service'
import axiosService from '../services/axios-service'

const axiosInstance = axiosService.getInstance();

//Rentals Action ----------------------------------------------
export const fetchRentalSuccess=(rentals)=>{
    
return {
    type:'FETCH_RENTALS_SUCCESS',
    rentals
}    
}

const fetchRentalsInit = () => {
    return{
        type:'FETCH_RENTALS_INIT',
    }
}

const fetchRentalsFail = (errors) => {
    return{
        type:'FETCH_RENTALS_FAIL',
        errors
    }
}



export const fetchRentals = (city) => {

    const url = city ? `/rentals?city=${city}` : '/rentals' 
    return (dispatch)=>{
        dispatch(fetchRentalsInit())
       axiosInstance.get(url).then(
           (res)=>{
         return res.data;
       }).then((rentals)=>dispatch(fetchRentalSuccess(rentals))
    ).catch(({response})=>dispatch(fetchRentalsFail(response.data.errors)))
    }
 }

export const fetchRentalById=(rentalId)=>{
    return (dispatch)=>{
        axios.get(`http://localhost:3000/api/v1/rentals/${rentalId}`).then((res)=>{
        return res.data
        }).then((rental)=>{
            dispatch(fetchRentalByIdSuccess(rental))
        }).catch((e)=>{
        })
    }
}

const fetchRentalByIdSuccess=(rental)=>{
    return{
        type:'FETCH_RENTAL_BY_ID_SUCCESS',
        rental
    }
}

//Auth Action ----------------------------------------------
 export const register = (userData) => {
    return axios.post('/api/v1/users/register',userData).then((res)=>{
        return res.data;
    },
    (err)=>{
        return Promise.reject(err.response.data.error)
    })
 }

export const logInSuccess = () =>{
    const username = authService.getUsername()
    return {
        type:'LOGIN_SUCCESS',
       username
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
        }).then((token)=>{
            authService.saveToken(token)
            dispatch(logInSuccess())
        }).catch(({response})=>{
            dispatch(logInFailure(response.data.error))
        })
    }
}

export const logout = () =>{
    authService.invalidateUser();
    return{
        type:'LOGOUT'

    } 
}


//Booking Action---------------------------------

export const createBooking = (booking) =>{
    return axiosInstance.post('/bookings',booking)
    .then(res => res.data)
    .catch((errors)=> 
    {debugger
        return Promise.reject(errors.response.data.errors)})
}


//Create ACtion---------------------------------------------

export const createRental = (rental) => {
    return axiosInstance.post('/rentals',rental).then((res)=>{
        return res.data;
    },
    (err)=>{
        return Promise.reject(err.response.data.errors)
    })
 }