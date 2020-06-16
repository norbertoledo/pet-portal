/** TYPES **/
export const RESET_USER_DATA = 'RESET_USER_DATA';

export const SIGNUP_USER_START = 'SIGNUP_USER_START';
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_ERROR = 'SIGNUP_USER_ERROR';

export const EDIT_USER_START = 'EDIT_USER_START';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_ERROR = 'EDIT_USER_ERROR';

export const DELETE_USER_START = 'DELETE_USER_START';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_ERROR = 'DELETE_USER_ERROR';

export const FETCH_USERS_START = 'FETCH_USERS_START';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';




//** REDUCERS **//
const initialState = {
    isLoading: false, 
    userError: false,
    userData:{status:0, action:"", message:""},
    usersData:{data:[], action:"", message:""}
};


export default (state=initialState, action)=>{
    switch(action.type){

        case RESET_USER_DATA:
            return {
                ...state,
                userData: initialState.userData
            };
        //
        
        case SIGNUP_USER_START:
            return {
                ...state, 
                isLoading: true,
                userError: false,
                userData: initialState.userData
            };

        case SIGNUP_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userError: false,
                userData: action.payload
            }

        case SIGNUP_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                userError: true,
                userData: action.payload
            }
        
        //
        case EDIT_USER_START:
            return {
                ...state, 
                isLoading: true,
                userError: false,
                userData: initialState.userData
            };

        case EDIT_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userError: false,
                userData: action.payload
            }

        case EDIT_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                userError: true,
                userData: action.payload
            }

        //

        case DELETE_USER_START:
            return {
                ...state, 
                isLoading: true,
                userError: false,
                userData: initialState.userData
            };

        case DELETE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userError: false,
                userData: action.payload
            }

        case DELETE_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                userError: true,
                userData: action.payload
            }

        //

        case FETCH_USERS_START:
            return {
                ...state, 
                isLoading: true,
                userError: false,
                usersData: initialState.usersData
            };

        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userError: false,
                usersData: action.payload
            }

        case FETCH_USERS_ERROR:
            return {
                ...state,
                isLoading: false,
                userError: true,
                usersData: action.payload
            }

        default:
            return state;
    }
};

//** ACTIONS **//
// RESET
export const resetUserData = () => ({
    type: RESET_USER_DATA,
});

// CREATE
export const signupUserStart = (payload) => ({
    type: SIGNUP_USER_START,
});
export const signupUserSuccess = (payload) => ({
    type: SIGNUP_USER_SUCCESS,
    payload: payload
});
export const signupUserError = (payload) => ({
    type: SIGNUP_USER_ERROR,
    payload: payload
});

// DELETE
export const deleteUserStart = (payload) => ({
    type: DELETE_USER_START,
});
export const deleteUserSuccess = (payload) => ({
    type: DELETE_USER_SUCCESS,
    payload: payload
});
export const deleteUserError = (payload) => ({
    type: DELETE_USER_ERROR,
    payload: payload
});

// EDIT
export const editUserStart = (payload) => ({
    type: EDIT_USER_START,
});
export const editUserSuccess = (payload) => ({
    type: EDIT_USER_SUCCESS,
    payload: payload
});
export const editUserError = (payload) => ({
    type: EDIT_USER_ERROR,
    payload: payload
});

// FETCH USERS
export const fetchUsersStart = () => ({
    type: FETCH_USERS_START,
});
export const fetchUsersSuccess = (payload) => ({
    type: FETCH_USERS_SUCCESS,
    payload: payload
});
export const fetchUsersError = (payload) => ({
    type: FETCH_USERS_ERROR,
    payload: payload
});