/** TYPES **/
export const RESET_CATEGORIES_SERVICE_DATA = 'RESET_CATEGORIES_SERVICE_DATA';

export const CREATE_CATEGORIES_SERVICE_START = 'CREATE_CATEGORIES_SERVICE_START';
export const CREATE_CATEGORIES_SERVICE_SUCCESS = 'CREATE_CATEGORIES_SERVICE_SUCCESS';
export const CREATE_CATEGORIES_SERVICE_ERROR = 'CREATE_CATEGORIES_SERVICE_ERROR';

export const EDIT_CATEGORIES_SERVICE_START = 'EDIT_CATEGORIES_SERVICE_START';
export const EDIT_CATEGORIES_SERVICE_SUCCESS = 'EDIT_CATEGORIES_SERVICE_SUCCESS';
export const EDIT_CATEGORIES_SERVICE_ERROR = 'EDIT_CATEGORIES_SERVICE_ERROR';

export const DELETE_CATEGORIES_SERVICE_START = 'DELETE_CATEGORIES_SERVICE_START';
export const DELETE_CATEGORIES_SERVICE_SUCCESS = 'DELETE_CATEGORIES_SERVICE_SUCCESS';
export const DELETE_CATEGORIES_SERVICE_ERROR = 'DELETE_CATEGORIES_SERVICE_ERROR';

export const FETCH_CATEGORIES_SERVICES_START = 'FETCH_CATEGORIES_SERVICES_START';
export const FETCH_CATEGORIES_SERVICES_SUCCESS = 'FETCH_CATEGORIES_SERVICES_SUCCESS';
export const FETCH_CATEGORIES_SERVICES_ERROR = 'FETCH_CATEGORIES_SERVICES_ERROR';


//** REDUCERS **//
const initialState = {
    isLoading: true, 
    categoriesServiceError: false,
    categoriesServiceData:{status:0, action:"", message:""},
    categoriesServicesData:{data:[], action:"", message:""}
};

export default (state=initialState, action)=>{
    switch(action.type){

        case RESET_CATEGORIES_SERVICE_DATA:
            return {
                ...state,
                categoriesServiceData: initialState.categoriesServiceData
            };
        //
        
        case CREATE_CATEGORIES_SERVICE_START:
            return {
                ...state, 
                isLoading: true,
                categoriesServiceError: false,
                categoriesServiceData: initialState.categoriesServiceData
            };

        case CREATE_CATEGORIES_SERVICE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                categoriesServiceError: false,
                categoriesServiceData: action.payload
            }

        case CREATE_CATEGORIES_SERVICE_ERROR:
            return {
                ...state,
                isLoading: false,
                categoriesServiceError: true,
                categoriesServiceData: action.payload
            }
        
        //
        case EDIT_CATEGORIES_SERVICE_START:
            return {
                ...state, 
                isLoading: true,
                categoriesServiceError: false,
                categoriesServiceData: initialState.categoriesServiceData
            };

        case EDIT_CATEGORIES_SERVICE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                categoriesServiceError: false,
                categoriesServiceData: action.payload
            }

        case EDIT_CATEGORIES_SERVICE_ERROR:
            return {
                ...state,
                isLoading: false,
                categoriesServiceError: true,
                categoriesServiceData: action.payload
            }

        //

        case DELETE_CATEGORIES_SERVICE_START:
            return {
                ...state, 
                isLoading: true,
                categoriesServiceError: false,
                categoriesServiceData: initialState.categoriesServiceData
            };

        case DELETE_CATEGORIES_SERVICE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                categoriesServiceError: false,
                categoriesServiceData: action.payload
            }

        case DELETE_CATEGORIES_SERVICE_ERROR:
            return {
                ...state,
                isLoading: false,
                categoriesServiceError: true,
                categoriesServiceData: action.payload
            }

        //

        case FETCH_CATEGORIES_SERVICES_START:
            return {
                ...state, 
                isLoading: true,
                categoriesServiceError: false,
                categoriesServicesData: initialState.categoriesServicesData
            };

        case FETCH_CATEGORIES_SERVICES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                categoriesServiceError: false,
                categoriesServicesData: action.payload
            }

        case FETCH_CATEGORIES_SERVICES_ERROR:
            return {
                ...state,
                isLoading: false,
                categoriesServiceError: true,
                categoriesServicesData: action.payload
            }

        default:
            return state;
    }
};

//** ACTIONS **//
// RESET
export const resetCategoriesServiceData = () => ({
    type: RESET_CATEGORIES_SERVICE_DATA,
});

// CREATE
export const createCategoriesServiceStart = (payload) => ({
    type: CREATE_CATEGORIES_SERVICE_START,
});
export const createCategoriesServiceSuccess = (payload) => ({
    type: CREATE_CATEGORIES_SERVICE_SUCCESS,
    payload: payload
});
export const createCategoriesServiceError = (payload) => ({
    type: CREATE_CATEGORIES_SERVICE_ERROR,
    payload: payload
});

// DELETE
export const deleteCategoriesServiceStart = (payload) => ({
    type: DELETE_CATEGORIES_SERVICE_START,
});
export const deleteCategoriesServiceSuccess = (payload) => ({
    type: DELETE_CATEGORIES_SERVICE_SUCCESS,
    payload: payload
});
export const deleteCategoriesServiceError = (payload) => ({
    type: DELETE_CATEGORIES_SERVICE_ERROR,
    payload: payload
});

// EDIT
export const editCategoriesServiceStart = (payload) => ({
    type: EDIT_CATEGORIES_SERVICE_START,
});
export const editCategoriesServiceSuccess = (payload) => ({
    type: EDIT_CATEGORIES_SERVICE_SUCCESS,
    payload: payload
});
export const editCategoriesServiceError = (payload) => ({
    type: EDIT_CATEGORIES_SERVICE_ERROR,
    payload: payload
});

// FETCH
export const fetchCategoriesServicesStart = () => ({
    type: FETCH_CATEGORIES_SERVICES_START,
});
export const fetchCategoriesServicesSuccess = (payload) => ({
    type: FETCH_CATEGORIES_SERVICES_SUCCESS,
    payload: payload
});
export const fetchCategoriesServicesError = (payload) => ({
    type: FETCH_CATEGORIES_SERVICES_ERROR,
    payload: payload
});