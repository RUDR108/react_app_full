import React from 'react';
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'
import {Header} from '../shared/Header'
import RentalList from '../components/rentals/RentalList'
import RentalDetail from '../components/rentals/RentalDetail'

const AppRouter=()=>{
    return(
        <BrowserRouter>
        <div className="App">
          <Header />
          <div className='container'>
          <Switch>
            <Route path="/rentals" component={RentalList} exact />
            <Route path="/rentals/:id?" component={RentalDetail} exact />
          </Switch> 
          </div>
        </div>
        </BrowserRouter>
    ); 
}

export default AppRouter;