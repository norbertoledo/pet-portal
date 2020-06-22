/** TYPES **/
export const RESET_SERVICE_DATA = 'RESET_SERVICE_DATA';

export const CREATE_SERVICE_START = 'CREATE_SERVICE_START';
export const CREATE_SERVICE_SUCCESS = 'CREATE_SERVICE_SUCCESS';
export const CREATE_SERVICE_ERROR = 'CREATE_SERVICE_ERROR';

export const EDIT_SERVICE_START = 'EDIT_SERVICE_START';
export const EDIT_SERVICE_SUCCESS = 'EDIT_SERVICE_SUCCESS';
export const EDIT_SERVICE_ERROR = 'EDIT_SERVICE_ERROR';

export const DELETE_SERVICE_START = 'DELETE_SERVICE_START';
export const DELETE_SERVICE_SUCCESS = 'DELETE_SERVICE_SUCCESS';
export const DELETE_SERVICE_ERROR = 'DELETE_SERVICE_ERROR';

export const FETCH_SERVICES_START = 'FETCH_SERVICES_START';
export const FETCH_SERVICES_SUCCESS = 'FETCH_SERVICES_SUCCESS';
export const FETCH_SERVICES_ERROR = 'FETCH_SERVICES_ERROR';


//** REDUCERS **//
const initialState = {
    isLoading: true, 
    serviceError: false,
    serviceData:{status:0, action:"", message:""},
    servicesData:{data:[], action:"", message:""}
};

export default (state=initialState, action)=>{
    switch(action.type){

        case RESET_SERVICE_DATA:
            return {
                ...state,
                serviceData: initialState.serviceData
            };
        //
        
        case CREATE_SERVICE_START:
            return {
                ...state, 
                isLoading: true,
                serviceError: false,
                serviceData: initialState.serviceData
            };

        case CREATE_SERVICE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                serviceError: false,
                serviceData: action.payload
            }

        case CREATE_SERVICE_ERROR:
            return {
                ...state,
                isLoading: false,
                serviceError: true,
                serviceData: action.payload
            }
        
        //
        case EDIT_SERVICE_START:
            return {
                ...state, 
                isLoading: true,
                serviceError: false,
                serviceData: initialState.serviceData
            };

        case EDIT_SERVICE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                serviceError: false,
                serviceData: action.payload
            }

        case EDIT_SERVICE_ERROR:
            return {
                ...state,
                isLoading: false,
                serviceError: true,
                serviceData: action.payload
            }

        //

        case DELETE_SERVICE_START:
            return {
                ...state, 
                isLoading: true,
                serviceError: false,
                serviceData: initialState.serviceData
            };

        case DELETE_SERVICE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                serviceError: false,
                serviceData: action.payload
            }

        case DELETE_SERVICE_ERROR:
            return {
                ...state,
                isLoading: false,
                serviceError: true,
                serviceData: action.payload
            }

        //

        case FETCH_SERVICES_START:
            return {
                ...state, 
                isLoading: true,
                serviceError: false,
                servicesData: initialState.servicesData
            };

        case FETCH_SERVICES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                serviceError: false,
                servicesData: action.payload
            }

        case FETCH_SERVICES_ERROR:
            return {
                ...state,
                isLoading: false,
                serviceError: true,
                servicesData: action.payload
            }

        default:
            return state;
    }
};

//** ACTIONS **//
// RESET
export const resetServiceData = () => ({
    type: RESET_SERVICE_DATA,
});

// CREATE
export const createServiceStart = (payload) => ({
    type: CREATE_SERVICE_START,
});
export const createServiceSuccess = (payload) => ({
    type: CREATE_SERVICE_SUCCESS,
    payload: payload
});
export const createServiceError = (payload) => ({
    type: CREATE_SERVICE_ERROR,
    payload: payload
});

// DELETE
export const deleteServiceStart = (payload) => ({
    type: DELETE_SERVICE_START,
});
export const deleteServiceSuccess = (payload) => ({
    type: DELETE_SERVICE_SUCCESS,
    payload: payload
});
export const deleteServiceError = (payload) => ({
    type: DELETE_SERVICE_ERROR,
    payload: payload
});

// EDIT
export const editServiceStart = (payload) => ({
    type: EDIT_SERVICE_START,
});
export const editServiceSuccess = (payload) => ({
    type: EDIT_SERVICE_SUCCESS,
    payload: payload
});
export const editServiceError = (payload) => ({
    type: EDIT_SERVICE_ERROR,
    payload: payload
});

// FETCH
export const fetchServicesStart = () => ({
    type: FETCH_SERVICES_START,
});
export const fetchServicesSuccess = (payload) => ({
    type: FETCH_SERVICES_SUCCESS,
    payload: payload
});
export const fetchServicesError = (payload) => ({
    type: FETCH_SERVICES_ERROR,
    payload: payload
});