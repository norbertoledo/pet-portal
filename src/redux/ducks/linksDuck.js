/** TYPES **/
export const RESET_LINK_DATA = 'RESET_LINK_DATA';

export const CREATE_LINK_START = 'CREATE_LINK_START';
export const CREATE_LINK_SUCCESS = 'CREATE_LINK_SUCCESS';
export const CREATE_LINK_ERROR = 'CREATE_LINK_ERROR';

export const EDIT_LINK_START = 'EDIT_LINK_START';
export const EDIT_LINK_SUCCESS = 'EDIT_LINK_SUCCESS';
export const EDIT_LINK_ERROR = 'EDIT_LINK_ERROR';

export const DELETE_LINK_START = 'DELETE_LINK_START';
export const DELETE_LINK_SUCCESS = 'DELETE_LINK_SUCCESS';
export const DELETE_LINK_ERROR = 'DELETE_LINK_ERROR';

export const FETCH_LINKS_START = 'FETCH_LINKS_START';
export const FETCH_LINKS_SUCCESS = 'FETCH_LINKS_SUCCESS';
export const FETCH_LINKS_ERROR = 'FETCH_LINKS_ERROR';



//** REDUCERS **//
const initialState = {
    isLoading: true, 
    linkError: false,
    linkData:{status:0, action:"", message:""},
    linksData:{data:[], action:"", message:""}
};

export default (state=initialState, action)=>{
    switch(action.type){

        case RESET_LINK_DATA:
            return {
                ...state,
                linkData: initialState.linkData
            };
        //
        
        case CREATE_LINK_START:
            return {
                ...state, 
                isLoading: true,
                linkError: false,
                linkData: initialState.linkData
            };

        case CREATE_LINK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                linkError: false,
                linkData: action.payload
            }

        case CREATE_LINK_ERROR:
            return {
                ...state,
                isLoading: false,
                linkError: true,
                linkData: action.payload
            }
        
        //
        case EDIT_LINK_START:
            return {
                ...state, 
                isLoading: true,
                linkError: false,
                linkData: initialState.linkData
            };

        case EDIT_LINK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                linkError: false,
                linkData: action.payload
            }

        case EDIT_LINK_ERROR:
            return {
                ...state,
                isLoading: false,
                linkError: true,
                linkData: action.payload
            }

        //

        case DELETE_LINK_START:
            return {
                ...state, 
                isLoading: true,
                linkError: false,
                linkData: initialState.linkData
            };

        case DELETE_LINK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                linkError: false,
                linkData: action.payload
            }

        case DELETE_LINK_ERROR:
            return {
                ...state,
                isLoading: false,
                linkError: true,
                linkData: action.payload
            }

        //

        case FETCH_LINKS_START:
            return {
                ...state, 
                isLoading: true,
                linkError: false,
                linksData: initialState.linksData
            };

        case FETCH_LINKS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                linkError: false,
                linksData: action.payload
            }

        case FETCH_LINKS_ERROR:
            return {
                ...state,
                isLoading: false,
                linkError: true,
                linksData: action.payload
            }

        default:
            return state;
    }
};

//** ACTIONS **//
// RESET
export const resetLinkData = () => ({
    type: RESET_LINK_DATA,
});

// CREATE
export const createLinkStart = (payload) => ({
    type: CREATE_LINK_START,
});
export const createLinkSuccess = (payload) => ({
    type: CREATE_LINK_SUCCESS,
    payload: payload
});
export const createLinkError = (payload) => ({
    type: CREATE_LINK_ERROR,
    payload: payload
});

// DELETE
export const deleteLinkStart = (payload) => ({
    type: DELETE_LINK_START,
});
export const deleteLinkSuccess = (payload) => ({
    type: DELETE_LINK_SUCCESS,
    payload: payload
});
export const deleteLinkError = (payload) => ({
    type: DELETE_LINK_ERROR,
    payload: payload
});

// EDIT
export const editLinkStart = (payload) => ({
    type: EDIT_LINK_START,
});
export const editLinkSuccess = (payload) => ({
    type: EDIT_LINK_SUCCESS,
    payload: payload
});
export const editLinkError = (payload) => ({
    type: EDIT_LINK_ERROR,
    payload: payload
});

// FETCH
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