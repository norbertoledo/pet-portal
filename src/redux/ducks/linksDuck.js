/** TYPES **/
export const FETCH_LINKS_START = 'FETCH_LINKS_START';
export const FETCH_LINKS_SUCCESS = 'FETCH_LINKS_SUCCESS';
export const FETCH_LINKS_ERROR = 'FETCH_LINKS_ERROR';


//** REDUCERS **//
const initialState = {isLoading: false, linksError: false, linksData:{data:[], action:"", message:""}};


export default (state=initialState, action)=>{
    switch(action.type){

        case FETCH_LINKS_START:
            return {
                ...state, 
                isLoading: true,
                linksError: false,
                linksData: initialState.linksData
            };

        case FETCH_LINKS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                linksError: false,
                linksData: action.payload
            }

        case FETCH_LINKS_ERROR:
            return {
                ...state,
                isLoading: false,
                linksError: true,
                linksData: action.payload
            }

        default:
            return state;
    }
};

//** ACTIONS **//
// STATES
export const fetchLinksStart = () => ({
    type: FETCH_LINKS_START,
});
export const fetchLinksSuccess = (payload) => ({
    type: FETCH_LINKS_SUCCESS,
    payload: payload
});
export const fetchLinksError = (payload) => ({
    type: FETCH_LINKS_ERROR,
    payload: payload
});