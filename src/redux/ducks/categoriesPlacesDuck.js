/** TYPES **/
export const RESET_CATEGORIES_PLACE_DATA = 'RESET_CATEGORIES_PLACE_DATA';

export const CREATE_CATEGORIES_PLACE_START = 'CREATE_CATEGORIES_PLACE_START';
export const CREATE_CATEGORIES_PLACE_SUCCESS = 'CREATE_CATEGORIES_PLACE_SUCCESS';
export const CREATE_CATEGORIES_PLACE_ERROR = 'CREATE_CATEGORIES_PLACE_ERROR';

export const EDIT_CATEGORIES_PLACE_START = 'EDIT_CATEGORIES_PLACE_START';
export const EDIT_CATEGORIES_PLACE_SUCCESS = 'EDIT_CATEGORIES_PLACE_SUCCESS';
export const EDIT_CATEGORIES_PLACE_ERROR = 'EDIT_CATEGORIES_PLACE_ERROR';

export const DELETE_CATEGORIES_PLACE_START = 'DELETE_CATEGORIES_PLACE_START';
export const DELETE_CATEGORIES_PLACE_SUCCESS = 'DELETE_CATEGORIES_PLACE_SUCCESS';
export const DELETE_CATEGORIES_PLACE_ERROR = 'DELETE_CATEGORIES_PLACE_ERROR';

export const FETCH_CATEGORIES_PLACES_START = 'FETCH_CATEGORIES_PLACES_START';
export const FETCH_CATEGORIES_PLACES_SUCCESS = 'FETCH_CATEGORIES_PLACES_SUCCESS';
export const FETCH_CATEGORIES_PLACES_ERROR = 'FETCH_CATEGORIES_PLACES_ERROR';


//** REDUCERS **//
const initialState = {
    isLoading: true, 
    categoriesPlaceError: false,
    categoriesPlaceData:{status:0, action:"", message:""},
    categoriesPlacesData:{data:[], action:"", message:""}
};

export default (state=initialState, action)=>{
    switch(action.type){

        case RESET_CATEGORIES_PLACE_DATA:
            return {
                ...state,
                categoriesPlaceData: initialState.categoriesPlaceData
            };
        //
        
        case CREATE_CATEGORIES_PLACE_START:
            return {
                ...state, 
                isLoading: true,
                categoriesPlaceError: false,
                categoriesPlaceData: initialState.categoriesPlaceData
            };

        case CREATE_CATEGORIES_PLACE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                categoriesPlaceError: false,
                categoriesPlaceData: action.payload
            }

        case CREATE_CATEGORIES_PLACE_ERROR:
            return {
                ...state,
                isLoading: false,
                categoriesPlaceError: true,
                categoriesPlaceData: action.payload
            }
        
        //
        case EDIT_CATEGORIES_PLACE_START:
            return {
                ...state, 
                isLoading: true,
                categoriesPlaceError: false,
                categoriesPlaceData: initialState.categoriesPlaceData
            };

        case EDIT_CATEGORIES_PLACE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                categoriesPlaceError: false,
                categoriesPlaceData: action.payload
            }

        case EDIT_CATEGORIES_PLACE_ERROR:
            return {
                ...state,
                isLoading: false,
                categoriesPlaceError: true,
                categoriesPlaceData: action.payload
            }

        //

        case DELETE_CATEGORIES_PLACE_START:
            return {
                ...state, 
                isLoading: true,
                categoriesPlaceError: false,
                categoriesPlaceData: initialState.categoriesPlaceData
            };

        case DELETE_CATEGORIES_PLACE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                categoriesPlaceError: false,
                categoriesPlaceData: action.payload
            }

        case DELETE_CATEGORIES_PLACE_ERROR:
            return {
                ...state,
                isLoading: false,
                categoriesPlaceError: true,
                categoriesPlaceData: action.payload
            }

        //

        case FETCH_CATEGORIES_PLACES_START:
            return {
                ...state, 
                isLoading: true,
                categoriesPlaceError: false,
                categoriesPlacesData: initialState.categoriesPlacesData
            };

        case FETCH_CATEGORIES_PLACES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                categoriesPlaceError: false,
                categoriesPlacesData: action.payload
            }

        case FETCH_CATEGORIES_PLACES_ERROR:
            return {
                ...state,
                isLoading: false,
                categoriesPlaceError: true,
                categoriesPlacesData: action.payload
            }

        default:
            return state;
    }
};

//** ACTIONS **//
// RESET
export const resetCategoriesPlaceData = () => ({
    type: RESET_CATEGORIES_PLACE_DATA,
});

// CREATE
export const createCategoriesPlaceStart = (payload) => ({
    type: CREATE_CATEGORIES_PLACE_START,
});
export const createCategoriesPlaceSuccess = (payload) => ({
    type: CREATE_CATEGORIES_PLACE_SUCCESS,
    payload: payload
});
export const createCategoriesPlaceError = (payload) => ({
    type: CREATE_CATEGORIES_PLACE_ERROR,
    payload: payload
});

// DELETE
export const deleteCategoriesPlaceStart = (payload) => ({
    type: DELETE_CATEGORIES_PLACE_START,
});
export const deleteCategoriesPlaceSuccess = (payload) => ({
    type: DELETE_CATEGORIES_PLACE_SUCCESS,
    payload: payload
});
export const deleteCategoriesPlaceError = (payload) => ({
    type: DELETE_CATEGORIES_PLACE_ERROR,
    payload: payload
});

// EDIT
export const editCategoriesPlaceStart = (payload) => ({
    type: EDIT_CATEGORIES_PLACE_START,
});
export const editCategoriesPlaceSuccess = (payload) => ({
    type: EDIT_CATEGORIES_PLACE_SUCCESS,
    payload: payload
});
export const editCategoriesPlaceError = (payload) => ({
    type: EDIT_CATEGORIES_PLACE_ERROR,
    payload: payload
});

// FETCH
export const fetchCategoriesPlacesStart = () => ({
    type: FETCH_CATEGORIES_PLACES_START,
});
export const fetchCategoriesPlacesSuccess = (payload) => ({
    type: FETCH_CATEGORIES_PLACES_SUCCESS,
    payload: payload
});
export const fetchCategoriesPlacesError = (payload) => ({
    type: FETCH_CATEGORIES_PLACES_ERROR,
    payload: payload
});