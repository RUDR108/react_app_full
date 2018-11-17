import React, { Component } from 'react';
import AppRouter from './routers/AppRouter'
import configureStore from './store/ConfigureStore'
import {Provider} from 'react-redux';
import './App.css';

const store=configureStore()

class App extends Component {

  render() {
    return (
        <Provider store={store}>
        <AppRouter />
        </Provider>
    );
  }
}

export default App;
