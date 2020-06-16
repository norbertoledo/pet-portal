/** TYPES **/
export const FETCH_SERVICES_START = 'FETCH_SERVICES_START';
export const FETCH_SERVICES_SUCCESS = 'FETCH_SERVICES_SUCCESS';
export const FETCH_SERVICES_ERROR = 'FETCH_SERVICES_ERROR';


//** REDUCERS **//
const initialState = {isLoading: false, servicesError: false, servicesData:{data:[], action:"", message:""}};


export default (state=initialState, action)=>{
    switch(action.type){

        case FETCH_SERVICES_START:
            return {
                ...state, 
                isLoading: true,
                servicesError: false,
                servicesData: initialState.servicesData
            };

        case FETCH_SERVICES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                servicesError: false,
                servicesData: action.payload
            }

        case FETCH_SERVICES_ERROR:
            return {
                ...state,
                isLoading: false,
                servicesError: true,
                servicesData: action.payload
            }

        default:
            return state;
    }
};

//** ACTIONS **//
// SERVICES
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