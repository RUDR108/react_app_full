import {combineReducers,createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {authReducer} from '../reducers/auth-reducers'


import {reducer as formReducer} from 'redux-form';

export default ()=>{
    const store=createStore(combineReducers({
        form:formReducer,
        auth:authReducer
    }),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ,applyMiddleware(thunk))
    return store;
}

