/** TYPES **/
export const FETCH_STATES_START = 'FETCH_STATES_START';
export const FETCH_STATES_SUCCESS = 'FETCH_STATES_SUCCESS';
export const FETCH_STATES_ERROR = 'STATES_FETCH_ERROR';


//** REDUCERS **//
const initialState = {isLoading: false, statesError: false, statesData:{data:[], action:"", message:""}};


export default (state=initialState, action)=>{
    switch(action.type){

        case FETCH_STATES_START:
            return {
                ...state, 
                isLoading: true,
                statesError: false,
                statesData: initialState.statesData
            };

        case FETCH_STATES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                statesError: false,
                statesData: action.payload
            }

        case FETCH_STATES_ERROR:
            return {
                ...state,
                isLoading: false,
                statesError: true,
                statesData: action.payload
            }

        default:
            return state;
    }
};

//** ACTIONS **//
// STATES
export const fetchStatesStart = () => ({
    type: FETCH_STATES_START,
});
export const fetchStatesSuccess = (payload) => ({
    type: FETCH_STATES_SUCCESS,
    payload: payload
});
export const fetchStatesError = (payload) => ({
    type: FETCH_STATES_ERROR,
    payload: payload
});