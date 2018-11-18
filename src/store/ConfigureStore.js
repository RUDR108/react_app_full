import {combineReducers,createStore,applyMiddleware} from 'redux'
import {rentalReducer} from '../reducers/rental-reducer'
import {selectedRentalReducer} from '../reducers/rental-reducer';
import thunk from 'redux-thunk'

export default ()=>{
    const store=createStore(combineReducers({
        rentals:rentalReducer,
        rental:selectedRentalReducer
    }),applyMiddleware(thunk))
    return store;
}

