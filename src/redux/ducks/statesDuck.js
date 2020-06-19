/** TYPES **/
export const RESET_STATE_DATA = 'RESET_STATE_DATA';

export const CREATE_STATE_START = 'CREATE_STATE_START';
export const CREATE_STATE_SUCCESS = 'CREATE_STATE_SUCCESS';
export const CREATE_STATE_ERROR = 'CREATE_STATE_ERROR';

export const EDIT_STATE_START = 'EDIT_STATE_START';
export const EDIT_STATE_SUCCESS = 'EDIT_STATE_SUCCESS';
export const EDIT_STATE_ERROR = 'EDIT_STATE_ERROR';

export const DELETE_STATE_START = 'DELETE_STATE_START';
export const DELETE_STATE_SUCCESS = 'DELETE_STATE_SUCCESS';
export const DELETE_STATE_ERROR = 'DELETE_STATE_ERROR';

export const FETCH_STATES_START = 'FETCH_STATES_START';
export const FETCH_STATES_SUCCESS = 'FETCH_STATES_SUCCESS';
export const FETCH_STATES_ERROR = 'STATES_FETCH_ERROR';


//** REDUCERS **//
const initialState = {
    isLoading: true, 
    stateError: false,
    stateData:{status:0, action:"", message:""},
    statesData:{data:[], action:"", message:""}
};

export default (state=initialState, action)=>{
    switch(action.type){

        case RESET_STATE_DATA:
            return {
                ...state,
                stateData: initialState.stateData
            };
        //
        
        case CREATE_STATE_START:
            return {
                ...state, 
                isLoading: true,
                stateError: false,
                stateData: initialState.stateData
            };

        case CREATE_STATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                stateError: false,
                stateData: action.payload
            }

        case CREATE_STATE_ERROR:
            return {
                ...state,
                isLoading: false,
                stateError: true,
                stateData: action.payload
            }
        
        //
        case EDIT_STATE_START:
            return {
                ...state, 
                isLoading: true,
                stateError: false,
                stateData: initialState.stateData
            };

        case EDIT_STATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                stateError: false,
                stateData: action.payload
            }

        case EDIT_STATE_ERROR:
            return {
                ...state,
                isLoading: false,
                stateError: true,
                stateData: action.payload
            }

        //

        case DELETE_STATE_START:
            return {
                ...state, 
                isLoading: true,
                stateError: false,
                stateData: initialState.stateData
            };

        case DELETE_STATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                stateError: false,
                stateData: action.payload
            }

        case DELETE_STATE_ERROR:
            return {
                ...state,
                isLoading: false,
                stateError: true,
                stateData: action.payload
            }

        //

        case FETCH_STATES_START:
            return {
                ...state, 
                isLoading: true,
                stateError: false,
                statesData: initialState.statesData
            };

        case FETCH_STATES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                stateError: false,
                statesData: action.payload
            }

        case FETCH_STATES_ERROR:
            return {
                ...state,
                isLoading: false,
                stateError: true,
                statessData: action.payload
            }

        default:
            return state;
    }
};

//** ACTIONS **//
// RESET
export const resetStateData = () => ({
    type: RESET_STATE_DATA,
});

// CREATE
export const createStateStart = (payload) => ({
    type: CREATE_STATE_START,
});
export const createStateSuccess = (payload) => ({
    type: CREATE_STATE_SUCCESS,
    payload: payload
});
export const createStateError = (payload) => ({
    type: CREATE_STATE_ERROR,
    payload: payload
});

// DELETE
export const deleteStateStart = (payload) => ({
    type: DELETE_STATE_START,
});
export const deleteStateSuccess = (payload) => ({
    type: DELETE_STATE_SUCCESS,
    payload: payload
});
export const deleteStateError = (payload) => ({
    type: DELETE_STATE_ERROR,
    payload: payload
});

// EDIT
export const editStateStart = (payload) => ({
    type: EDIT_STATE_START,
});
export const editStateSuccess = (payload) => ({
    type: EDIT_STATE_SUCCESS,
    payload: payload
});
export const editStateError = (payload) => ({
    type: EDIT_STATE_ERROR,
    payload: payload
});

// FETCH
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