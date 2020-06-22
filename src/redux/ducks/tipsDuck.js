/** TYPES **/
export const RESET_TIP_DATA = 'RESET_TIP_DATA';

export const CREATE_TIP_START = 'CREATE_TIP_START';
export const CREATE_TIP_SUCCESS = 'CREATE_TIP_SUCCESS';
export const CREATE_TIP_ERROR = 'CREATE_TIP_ERROR';

export const EDIT_TIP_START = 'EDIT_TIP_START';
export const EDIT_TIP_SUCCESS = 'EDIT_TIP_SUCCESS';
export const EDIT_TIP_ERROR = 'EDIT_TIP_ERROR';

export const DELETE_TIP_START = 'DELETE_TIP_START';
export const DELETE_TIP_SUCCESS = 'DELETE_TIP_SUCCESS';
export const DELETE_TIP_ERROR = 'DELETE_TIP_ERROR';

export const FETCH_TIPS_START = 'FETCH_TIPS_START';
export const FETCH_TIPS_SUCCESS = 'FETCH_TIPS_SUCCESS';
export const FETCH_TIPS_ERROR = 'FETCH_TIPS_ERROR';


//** REDUCERS **//
const initialState = {
    isLoading: true, 
    tipError: false,
    tipData:{status:0, action:"", message:""},
    tipsData:{data:[], action:"", message:""}
};

export default (state=initialState, action)=>{
    switch(action.type){

        case RESET_TIP_DATA:
            return {
                ...state,
                tipData: initialState.tipData
            };
        //
        
        case CREATE_TIP_START:
            return {
                ...state, 
                isLoading: true,
                tipError: false,
                tipData: initialState.tipData
            };

        case CREATE_TIP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                tipError: false,
                tipData: action.payload
            }

        case CREATE_TIP_ERROR:
            return {
                ...state,
                isLoading: false,
                tipError: true,
                tipData: action.payload
            }
        
        //
        case EDIT_TIP_START:
            return {
                ...state, 
                isLoading: true,
                tipError: false,
                tipData: initialState.tipData
            };

        case EDIT_TIP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                tipError: false,
                tipData: action.payload
            }

        case EDIT_TIP_ERROR:
            return {
                ...state,
                isLoading: false,
                tipError: true,
                tipData: action.payload
            }

        //

        case DELETE_TIP_START:
            return {
                ...state, 
                isLoading: true,
                tipError: false,
                tipData: initialState.tipData
            };

        case DELETE_TIP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                tipError: false,
                tipData: action.payload
            }

        case DELETE_TIP_ERROR:
            return {
                ...state,
                isLoading: false,
                tipError: true,
                tipData: action.payload
            }

        //

        case FETCH_TIPS_START:
            return {
                ...state, 
                isLoading: true,
                tipError: false,
                tipsData: initialState.tipsData
            };

        case FETCH_TIPS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                tipError: false,
                tipsData: action.payload
            }

        case FETCH_TIPS_ERROR:
            return {
                ...state,
                isLoading: false,
                tipError: true,
                tipsData: action.payload
            }

        default:
            return state;
    }
};

//** ACTIONS **//
// RESET
export const resetTipData = () => ({
    type: RESET_TIP_DATA,
});

// CREATE
export const createTipStart = (payload) => ({
    type: CREATE_TIP_START,
});
export const createTipSuccess = (payload) => ({
    type: CREATE_TIP_SUCCESS,
    payload: payload
});
export const createTipError = (payload) => ({
    type: CREATE_TIP_ERROR,
    payload: payload
});

// DELETE
export const deleteTipStart = (payload) => ({
    type: DELETE_TIP_START,
});
export const deleteTipSuccess = (payload) => ({
    type: DELETE_TIP_SUCCESS,
    payload: payload
});
export const deleteTipError = (payload) => ({
    type: DELETE_TIP_ERROR,
    payload: payload
});

// EDIT
export const editTipStart = (payload) => ({
    type: EDIT_TIP_START,
});
export const editTipSuccess = (payload) => ({
    type: EDIT_TIP_SUCCESS,
    payload: payload
});
export const editTipError = (payload) => ({
    type: EDIT_TIP_ERROR,
    payload: payload
});

// FETCH
export const fetchTipsStart = () => ({
    type: FETCH_TIPS_START,
});
export const fetchTipsSuccess = (payload) => ({
    type: FETCH_TIPS_SUCCESS,
    payload: payload
});
export const fetchTipsError = (payload) => ({
    type: FETCH_TIPS_ERROR,
    payload: payload
});