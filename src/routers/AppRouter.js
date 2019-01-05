import React from 'react';
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'
import Login from '../components/login/login'
import Register from '../components/register/register' 
import {LoggedInRoute} from '../components/shared/auth/loggedInRoute'
import HomePage from '../components/homepage'
import Header from '../components/shared/Header'
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