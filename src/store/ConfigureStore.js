import {combineReducers,createStore,applyMiddleware} from 'redux'
import {rentalReducer} from '../reducers/rental-reducer'
import {selectedRentalReducer} from '../reducers/rental-reducer';
import thunk from 'redux-thunk'
import {authReducer} from '../reducers/auth-reducers'

import {reducer as formReducer} from 'redux-form';

export default ()=>{
    const store=createStore(combineReducers({
        rentals:rentalReducer,
        rental:selectedRentalReducer,
        form:formReducer,
        auth:authReducer
    }),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ,applyMiddleware(thunk))
    return store;
}

