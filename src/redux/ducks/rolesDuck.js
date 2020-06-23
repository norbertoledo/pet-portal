/** TYPES **/
export const RESET_ROLE_DATA = 'RESET_ROLE_DATA';

export const CREATE_ROLE_START = 'CREATE_ROLE_START';
export const CREATE_ROLE_SUCCESS = 'CREATE_ROLE_SUCCESS';
export const CREATE_ROLE_ERROR = 'CREATE_ROLE_ERROR';

export const EDIT_ROLE_START = 'EDIT_ROLE_START';
export const EDIT_ROLE_SUCCESS = 'EDIT_ROLE_SUCCESS';
export const EDIT_ROLE_ERROR = 'EDIT_ROLE_ERROR';

export const DELETE_ROLE_START = 'DELETE_ROLE_START';
export const DELETE_ROLE_SUCCESS = 'DELETE_ROLE_SUCCESS';
export const DELETE_ROLE_ERROR = 'DELETE_ROLE_ERROR';

export const FETCH_ROLES_START = 'FETCH_ROLES_START';
export const FETCH_ROLES_SUCCESS = 'FETCH_ROLES_SUCCESS';
export const FETCH_ROLES_ERROR = 'FETCH_ROLES_ERROR';



//** REDUCERS **//
const initialState = {
    isLoading: true, 
    roleError: false,
    roleData:{status:0, action:"", message:""},
    rolesData:{data:[], action:"", message:""}
};

export default (state=initialState, action)=>{
    switch(action.type){

        case RESET_ROLE_DATA:
            return {
                ...state,
                roleData: initialState.roleData
            };
        //
        
        case CREATE_ROLE_START:
            return {
                ...state, 
                isLoading: true,
                roleError: false,
                roleData: initialState.roleData
            };

        case CREATE_ROLE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                roleError: false,
                roleData: action.payload
            }

        case CREATE_ROLE_ERROR:
            return {
                ...state,
                isLoading: false,
                roleError: true,
                roleData: action.payload
            }
        
        //
        case EDIT_ROLE_START:
            return {
                ...state, 
                isLoading: true,
                roleError: false,
                roleData: initialState.roleData
            };

        case EDIT_ROLE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                roleError: false,
                roleData: action.payload
            }

        case EDIT_ROLE_ERROR:
            return {
                ...state,
                isLoading: false,
                roleError: true,
                roleData: action.payload
            }

        //

        case DELETE_ROLE_START:
            return {
                ...state, 
                isLoading: true,
                roleError: false,
                roleData: initialState.roleData
            };

        case DELETE_ROLE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                roleError: false,
                roleData: action.payload
            }

        case DELETE_ROLE_ERROR:
            return {
                ...state,
                isLoading: false,
                roleError: true,
                roleData: action.payload
            }

        //

        case FETCH_ROLES_START:
            return {
                ...state, 
                isLoading: true,
                roleError: false,
                rolesData: initialState.rolesData
            };

        case FETCH_ROLES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                roleError: false,
                rolesData: action.payload
            }

        case FETCH_ROLES_ERROR:
            return {
                ...state,
                isLoading: false,
                roleError: true,
                rolesData: action.payload
            }

        default:
            return state;
    }
};

//** ACTIONS **//
// RESET
export const resetRoleData = () => ({
    type: RESET_ROLE_DATA,
});

// CREATE
export const createRoleStart = (payload) => ({
    type: CREATE_ROLE_START,
});
export const createRoleSuccess = (payload) => ({
    type: CREATE_ROLE_SUCCESS,
    payload: payload
});
export const createRoleError = (payload) => ({
    type: CREATE_ROLE_ERROR,
    payload: payload
});

// DELETE
export const deleteRoleStart = (payload) => ({
    type: DELETE_ROLE_START,
});
export const deleteRoleSuccess = (payload) => ({
    type: DELETE_ROLE_SUCCESS,
    payload: payload
});
export const deleteRoleError = (payload) => ({
    type: DELETE_ROLE_ERROR,
    payload: payload
});

// EDIT
export const editRoleStart = (payload) => ({
    type: EDIT_ROLE_START,
});
export const editRoleSuccess = (payload) => ({
    type: EDIT_ROLE_SUCCESS,
    payload: payload
});
export const editRoleError = (payload) => ({
    type: EDIT_ROLE_ERROR,
    payload: payload
});

// FETCH
export const fetchRolesStart = () => ({
    type: FETCH_ROLES_START,
});
export const fetchRolesSuccess = (payload) => ({
    type: FETCH_ROLES_SUCCESS,
    payload: payload
});
export const fetchRolesError = (payload) => ({
    type: FETCH_ROLES_ERROR,
    payload: payload
});