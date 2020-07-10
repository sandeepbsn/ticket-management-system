import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import registerReducer from './registerReducer/registerReducer'
import loginReducer from './loginReducer/loginReducer'
import customerReducer from './customerReducer/customerReducer'



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({register:registerReducer, login:loginReducer, customer:customerReducer})

export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(
            thunk
        )
    )
)