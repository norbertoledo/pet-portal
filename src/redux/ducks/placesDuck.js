/** TYPES **/
export const FETCH_PLACES_START = 'FETCH_PLACES_START';
export const FETCH_PLACES_SUCCESS = 'FETCH_PLACES_SUCCESS';
export const FETCH_PLACES_ERROR = 'FETCH_PLACES_ERROR';


//** REDUCERS **//
const initialState = {isLoading: false, placesError: false, placesData:{data:[], action:"", message:""}};


export default (state=initialState, action)=>{
    switch(action.type){

        case FETCH_PLACES_START:
            return {
                ...state, 
                isLoading: true,
                placesError: false,
                placesData: initialState.placesData
            };

        case FETCH_PLACES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                placesError: false,
                placesData: action.payload
            }

        case FETCH_PLACES_ERROR:
            return {
                ...state,
                isLoading: false,
                placesError: true,
                placesData: action.payload
            }

        default:
            return state;
    }
};

//** ACTIONS **//
// PLACES
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