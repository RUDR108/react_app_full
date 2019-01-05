import React from 'react';
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'
import Login from '../components/login/login'
import Register from '../components/register/register' 
import {LoggedInRoute} from '../components/shared/auth/loggedInRoute'
<<<<<<< HEAD
import RentalSearchListing from '../components/rentals/RentalSearchListing'
import RentalCreate from '../components/rentals/rentalCreate'
import RentalManage from '../components/rentals/rentalManage'
import BookingManage from '../components/booking/bookingManage'
=======
import HomePage from '../components/homepage'
import Header from '../components/shared/Header'
>>>>>>> 0dfd8a8dd3b80a523033a08e8032250a6fb1e871
import {ToastContainer,toast} from 'react-toastify'

const AppRouter=(props)=>{
 return(
        <BrowserRouter>
        <div className="App">
        <Header    logout={props.logout}  />
          <div className='container'>
          <ToastContainer />
          <Switch>
            <Route exact path='/' render={()=><Redirect to='/homepage'/>}/>
            <LoggedInRoute path="/register" component={Register} exact/>
            <Route path="/login" component={Login} exact/>
            <Route exact path='/homepage' component={HomePage} />
          </Switch> 
          </div>
        </div>
        </BrowserRouter>
    ); 
}

export default AppRouter;