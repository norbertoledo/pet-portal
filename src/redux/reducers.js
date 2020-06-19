import {combineReducers} from 'redux';
import authReducer from './ducks/authDuck';
import usersReducer from './ducks/usersDuck';
import statesReducer from './ducks/statesDuck';
import linksReducer from './ducks/linksDuck';
import tipsReducer from './ducks/tipsDuck';
import placesReducer from './ducks/placesDuck';
import servicesReducer from './ducks/servicesDuck';
import categoriesPlacesReducer from './ducks/categoriesPlacesDuck';
import categoriesServicesReducer from './ducks/categoriesServicesDuck';


export const rootReducer =  combineReducers(
    {
        auth: authReducer,
        users: usersReducer,
        states: statesReducer,
        links: linksReducer,
        tips: tipsReducer,
        places: placesReducer,
        services: servicesReducer,
        categoriesPlaces: categoriesPlacesReducer,
        categoriesServices: categoriesServicesReducer,
    }
);
