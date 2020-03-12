import {combineReducers} from 'redux';
import authReducer from './ducks/authDuck';



export const rootReducer =  combineReducers(
    {
        auth: authReducer,

    }
);
