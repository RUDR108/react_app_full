import React, { Component } from 'react';
import AppRouter from './routers/AppRouter'
import configureStore from './store/ConfigureStore'
import {Provider} from 'react-redux';
import './App.css';
import * as actions from './actions/actions'

const store=configureStore()

class App extends Component {

  componentWillMount(){ 
    this.checkAuthState()
  }

  checkAuthState(){
    store.dispatch(actions.checkAuthState())
  }
  
  logout(){
    store.dispatch(actions.logout())
  }

  render() {
  
    return (
        <Provider store={store}>
        <AppRouter logout={this.logout}/>
        </Provider>
    );
  }
}

export default App;
