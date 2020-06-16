//** TYPES **//
export const LOGIN_USER_START = 'LOGIN_USER_START';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';

export const LOGOUT_USER_START = 'LOGOUT_USER_START';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_ERROR = 'LOGOUT_USER_ERROR';



//** REDUCERS **//
const initialState = {isLogged: false, isLoading: true, authError: false, authData:{data:{}, message:""}};

export default (state=initialState, action)=>{
    switch(action.type){

        case LOGIN_USER_START:
            return {
                ...state, 
                isLoading: true,
                isLogged: false,
                authError: false,
                authData: initialState.authData
            };

        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isLogged: true,
                authError: false,
                authData: action.payload
            }

        case LOGIN_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                isLogged: false,
                authError: true,
                authData: action.payload
            }
        
        case LOGOUT_USER_START:
            return {
                ...state, 
                isLoading: true
            };

        case LOGOUT_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isLogged: false,
                authError: false,
                authData: action.payload
            }

        case LOGOUT_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                isLogged: false,
                authError: true,
                authData: action.payload
            }


        default:
            return state;
    }
};


//** ACTIONS **//
// LOGIN
export const loginUserStart = () => ({
    type: LOGIN_USER_START,
});
export const loginUserSuccess = (payload) => ({
    type: LOGIN_USER_SUCCESS,
    payload: payload
});
export const loginUserError = (payload) => ({
    type: LOGIN_USER_ERROR,
    payload: payload
});

// LOGOUT
export const logoutUserStart = () => ({
    type: LOGOUT_USER_START,
});
export const logoutUserSuccess = (payload) => ({
    type: LOGOUT_USER_SUCCESS,
    payload: payload
});
export const logoutUserError = (payload) => ({
    type: LOGOUT_USER_ERROR,
    payload: payload
});


