/** TYPES **/
export const RESET_PLACE_DATA = 'RESET_PLACE_DATA';

export const CREATE_PLACE_START = 'CREATE_PLACE_START';
export const CREATE_PLACE_SUCCESS = 'CREATE_PLACE_SUCCESS';
export const CREATE_PLACE_ERROR = 'CREATE_PLACE_ERROR';

export const EDIT_PLACE_START = 'EDIT_PLACE_START';
export const EDIT_PLACE_SUCCESS = 'EDIT_PLACE_SUCCESS';
export const EDIT_PLACE_ERROR = 'EDIT_PLACE_ERROR';

export const DELETE_PLACE_START = 'DELETE_PLACE_START';
export const DELETE_PLACE_SUCCESS = 'DELETE_PLACE_SUCCESS';
export const DELETE_PLACE_ERROR = 'DELETE_PLACE_ERROR';

export const FETCH_PLACES_START = 'FETCH_PLACES_START';
export const FETCH_PLACES_SUCCESS = 'FETCH_PLACES_SUCCESS';
export const FETCH_PLACES_ERROR = 'FETCH_PLACES_ERROR';


//** REDUCERS **//
const initialState = {
    isLoading: true, 
    placeError: false,
    placeData:{status:0, action:"", message:""},
    placesData:{data:[], action:"", message:""}
};

export default (state=initialState, action)=>{
    switch(action.type){

        case RESET_PLACE_DATA:
            return {
                ...state,
                placeData: initialState.placeData
            };
        //
        
        case CREATE_PLACE_START:
            return {
                ...state, 
                isLoading: true,
                placeError: false,
                placeData: initialState.placeData
            };

        case CREATE_PLACE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                placeError: false,
                placeData: action.payload
            }

        case CREATE_PLACE_ERROR:
            return {
                ...state,
                isLoading: false,
                placeError: true,
                placeData: action.payload
            }
        
        //
        case EDIT_PLACE_START:
            return {
                ...state, 
                isLoading: true,
                placeError: false,
                placeData: initialState.placeData
            };

        case EDIT_PLACE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                placeError: false,
                placeData: action.payload
            }

        case EDIT_PLACE_ERROR:
            return {
                ...state,
                isLoading: false,
                placeError: true,
                placeData: action.payload
            }

        //

        case DELETE_PLACE_START:
            return {
                ...state, 
                isLoading: true,
                placeError: false,
                placeData: initialState.placeData
            };

        case DELETE_PLACE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                placeError: false,
                placeData: action.payload
            }

        case DELETE_PLACE_ERROR:
            return {
                ...state,
                isLoading: false,
                placeError: true,
                placeData: action.payload
            }

        //

        case FETCH_PLACES_START:
            return {
                ...state, 
                isLoading: true,
                placeError: false,
                placesData: initialState.placesData
            };

        case FETCH_PLACES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                placeError: false,
                placesData: action.payload
            }

        case FETCH_PLACES_ERROR:
            return {
                ...state,
                isLoading: false,
                placeError: true,
                placesData: action.payload
            }

        default:
            return state;
    }
};

//** ACTIONS **//
// RESET
export const resetPlaceData = () => ({
    type: RESET_PLACE_DATA,
});

// CREATE
export const createPlaceStart = (payload) => ({
    type: CREATE_PLACE_START,
});
export const createPlaceSuccess = (payload) => ({
    type: CREATE_PLACE_SUCCESS,
    payload: payload
});
export const createPlaceError = (payload) => ({
    type: CREATE_PLACE_ERROR,
    payload: payload
});

// DELETE
export const deletePlaceStart = (payload) => ({
    type: DELETE_PLACE_START,
});
export const deletePlaceSuccess = (payload) => ({
    type: DELETE_PLACE_SUCCESS,
    payload: payload
});
export const deletePlaceError = (payload) => ({
    type: DELETE_PLACE_ERROR,
    payload: payload
});

// EDIT
export const editPlaceStart = (payload) => ({
    type: EDIT_PLACE_START,
});
export const editPlaceSuccess = (payload) => ({
    type: EDIT_PLACE_SUCCESS,
    payload: payload
});
export const editPlaceError = (payload) => ({
    type: EDIT_PLACE_ERROR,
    payload: payload
});

// FETCH
export const fetchPlacesStart = () => ({
    type: FETCH_PLACES_START,
});
export const fetchPlacesSuccess = (payload) => ({
    type: FETCH_PLACES_SUCCESS,
    payload: payload
});
export const fetchPlacesError = (payload) => ({
    type: FETCH_PLACES_ERROR,
    payload: payload
});