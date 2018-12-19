import React from 'react';
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'
import Header from '../components/shared/Header'
import RentalListing from '../components/rentals/RentalListing'
import RentalDetail from '../components/rentals/RentalDetail'
import Login from '../components/login/login'
import Register from '../components/register/register' 
import {ProtectedRoute} from '../components/shared/auth/protectedRoute'
import {LoggedInRoute} from '../components/shared/auth/loggedInRoute'

const AppRouter=(props)=>{
 return(
        <BrowserRouter>
        <div className="App">
          <Header    logout={props.logout}  />
          <div className='container'>
          <Switch>
            <Route exact path='/' render={()=><Redirect to='/rentals'/>}/>
            <Route path="/rentals" component={RentalListing} exact />
            <ProtectedRoute path="/rentals/:id?" component={RentalDetail} exact />
            <LoggedInRoute path="/register" component={Register} exact/>
            <Route path="/login" component={Login} exact/>
          </Switch> 
          </div>
        </div>
        </BrowserRouter>
    ); 
}

export default AppRouter;