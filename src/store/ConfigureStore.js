import {combineReducers,createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {authReducer} from '../reducers/auth-reducers'
<<<<<<< HEAD
import {userBookingsReducer} from '../reducers/booking-reducer'
import {rentalMapReducer} from '../reducers/map-reducer'
=======

>>>>>>> 0dfd8a8dd3b80a523033a08e8032250a6fb1e871

import {reducer as formReducer} from 'redux-form';

export default ()=>{
    const store=createStore(combineReducers({
        form:formReducer,
<<<<<<< HEAD
        auth:authReducer,
        userBookings:userBookingsReducer,
        map:rentalMapReducer
=======
        auth:authReducer
>>>>>>> 0dfd8a8dd3b80a523033a08e8032250a6fb1e871
    }),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ,applyMiddleware(thunk))
    return store;
}

