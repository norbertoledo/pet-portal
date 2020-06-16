/** TYPES **/
export const FETCH_TIPS_START = 'FETCH_TIPS_START';
export const FETCH_TIPS_SUCCESS = 'FETCH_TIPS_SUCCESS';
export const FETCH_TIPS_ERROR = 'FETCH_TIPS_ERROR';

export const FETCH_TIP_START = 'FETCH_TIP_START';
export const FETCH_TIP_SUCCESS = 'FETCH_TIP_SUCCESS';
export const FETCH_TIP_ERROR = 'FETCH_TIP_ERROR';


//** REDUCERS **//
const initialState = {
    isLoading: false, 
    tipsError: false, 
    tipsData:{data:[], action:"", message:""},
    tipData:{data:{}, action:"", message:""}
};


export default (state=initialState, action)=>{
    switch(action.type){

        case FETCH_TIPS_START:
            return {
                ...state, 
                isLoading: true,
                tipsError: false,
                tipsData: initialState.tipsData
            };

        case FETCH_TIPS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                tipsError: false,
                tipsData: action.payload
            }

        case FETCH_TIPS_ERROR:
            return {
                ...state,
                isLoading: false,
                tipsError: true,
                tipsData: action.payload
            }
        
            case FETCH_TIP_START:
            return {
                ...state, 
                isLoading: true,
                tipsError: false,
                tipData: initialState.tipData
            };

        case FETCH_TIP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                tipsError: false,
                tipData: action.payload
            }

        case FETCH_TIP_ERROR:
            return {
                ...state,
                isLoading: false,
                tipsError: true,
                tipData: action.payload
            }

        default:
            return state;
    }
};

//** ACTIONS **//
// TIPS
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

// TIP
export const fetchTipStart = () => ({
    type: FETCH_TIPS_START,
});
export const fetchTipSuccess = (payload) => ({
    type: FETCH_TIPS_SUCCESS,
    payload: payload
});
export const fetchTipError = (payload) => ({
    type: FETCH_TIPS_ERROR,
    payload: payload
});