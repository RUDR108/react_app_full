import React from 'react';
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'
import Header from '../components/shared/Header'
import RentalListing from '../components/rentals/RentalListing'
import RentalDetail from '../components/rentals/RentalDetail'
import Login from '../components/login/login'
import Register from '../components/register/register' 
import {ProtectedRoute} from '../components/shared/auth/protectedRoute'
import {LoggedInRoute} from '../components/shared/auth/loggedInRoute'
import RentalSearchListing from '../components/rentals/RentalSearchListing'
import RentalCreate from '../components/rentals/rentalCreate'
import RentalManage from '../components/rentals/rentalManage'
import BookingManage from '../components/booking/bookingManage'

const AppRouter=(props)=>{
 return(
        <BrowserRouter>
        <div className="App">
          <Header    logout={props.logout}  />
          <div className='container'>
          <Switch>
            <Route exact path='/' render={()=><Redirect to='/rentals'/>}/>
            <Route path="/rentals" component={RentalListing} exact />
            <ProtectedRoute path="/rentals/new" component={RentalCreate} exact />
            <ProtectedRoute path="/rentals/manage" component={RentalManage} exact />
            <ProtectedRoute path="/bookings/manage" component={BookingManage} exact />
            <Route path="/rentals/:id?" component={RentalDetail} exact />
            <LoggedInRoute path="/register" component={Register} exact/>
            <Route path="/login" component={Login} exact/>
            <Route path="/rentals/:city/homes" component={RentalSearchListing} exact/>
          </Switch> 
          </div>
        </div>
        </BrowserRouter>
    ); 
}

export default AppRouter;