import axios from 'axios';
import authService from '../services/auth-service'
import axiosService from '../services/axios-service'

const axiosInstance = axiosService.getInstance();

//Rentals Action ----------------------------------------------
export const fetchRentalsSuccess=(rentals)=>{
    
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
       axiosInstance.get(url).then(res=>res.data)
       .then(rentals=>dispatch(fetchRentalsSuccess(rentals)))
       .catch(({response})=>dispatch(fetchRentalsFail(response.data.errors)))
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

//Delete Rental Action---------------------------------------------------
export const deleteRental = (rentalId) => {
    return axiosInstance.delete(`/rentals/${rentalId}`)
    .then(res=>res.data,
        err=>Promise.reject(err.response.data.errors))
    }
    

//Auth Action ----------------------------------------------
 export const register = (userData) => {
    return axios.post('/api/v1/users/register',userData).then((res)=>{
        return res.data;
    },
    (err)=>{
        return Promise.reject(err.response.data.errors)
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


//Booking Action---------------------------------

export const createBooking = (booking) =>{
    return axiosInstance.post('/bookings',booking)
    .then(res =>res.data)
    .catch(errors=> Promise.reject(errors.response.data.errors))
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


 //UserBooking Action-------------------------------------------------
 
export const fetchUserBookingsInit = () =>{
    return {
        type:'FETCH_USER_BOOKINGS_INIT'
    }
}

export const fetchUserBookingsSuccess = (userBookings) =>{
    return {
        type:'FETCH_USER_BOOKINGS_SUCCESS',
        userBookings
    }
}

export const fetchUserBookingsFail = (errors) =>{
    return {
        type:'FETCH_USER_BOOKINGS_FAIL',
        errors
    }
}

export const fetchUserBookings = ()=>{
    return dispatch =>{
        dispatch(fetchUserBookingsInit())
        return axiosInstance.get('/bookings/manage')
        .then(res=>res.data)
        .then(userBookings=>dispatch(fetchUserBookingsSuccess(userBookings)))
        .catch(({response})=>dispatch(fetchUserBookingsFail(response.data.errors)))
    }
}

export const getUserRentals = () =>{
    return axiosInstance.get('/rentals/manage')
    .then(res=>res.data)
    .catch(({response})=>Promise.reject(response.data.error))
    }




