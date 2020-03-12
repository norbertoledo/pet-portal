
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import {rootReducer} from './reducers';
import services from '../services';



//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer , 
    
    compose(
        // applyMiddleware(thunk),
        applyMiddleware(thunk.withExtraArgument(services)),
        typeof window === 'object' &&
        typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
        window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
    /*
    composeEnhancers(
        applyMiddleware(thunk)
        //applyMiddleware(thunk.withExtraArgument(services))
    )
    */
    
);

export default store;