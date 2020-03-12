//import {useHistory} from 'react-router-dom';
// importar acciones
import {
    loginUserStart, 
    loginUserSuccess, 
    loginUserError, 
    logoutUserStart, 
    logoutUserSuccess, 
    logoutUserError, 
    signupUserStart, 
    signupUserSuccess, 
    signupUserError
} from '../ducks/authDuck';

// Thunks - Llamados externos - Efectos
export const loginThunk = ( payload ) => 


    async (dispatch, getState, {auth}) => {
    
        const {email, password}=payload;

        dispatch(loginUserStart());
        try{
            await auth.signInWithEmailAndPassword( email, password );     
            
            auth.onAuthStateChanged( user => {
                if(user){
                    console.log('[loginThunk]-> user',user)
                    dispatch(loginUserSuccess(user));
                }else{
                    //dispatch(loginUserError(user))
                }
            })
        }catch(err){
            console.log('ERROR: ', err.message);
            dispatch(loginUserError(err));
        }
    
    };


export const logoutThunk = () => 
    async (dispatch, getState, {auth}) => {
        dispatch(logoutUserStart());
        try{
            await auth.signOut();
            dispatch(logoutUserSuccess({}));
        }catch(err) {
            dispatch(logoutUserError(err));
        };
    }

export const signupThunk = ( payload ) => 

    async (dispatch, getState, { auth, db }) => {
        
        const {email, password, name}=payload;

        dispatch(signupUserStart());
        try{
            const {user} = await auth.createUserWithEmailAndPassword( email, password );
            
            const uid =  user ? user.uid : undefined;
            console.log("uid:", uid);
            
            const doc = db.collection('usuarios').doc(uid);

            await doc.set( 
                {
                    email: user.email,
                    nombre: name,
                    provinciaId: 'AlicanteId',
                    rol: {
                        admin: true,
                        profesional: false,
                        usuario: false
                    },
                    uid: user.uid,
                } 
            
            );
            
            auth.onAuthStateChanged( user => {
                if(user){
                    dispatch(signupUserSuccess(user));
                }else{
                    //dispatch(signupUserError(user))
                }
            })
        }catch(err){
            console.log('ERROR: ', err.message);
            dispatch(signupUserError(err));
        }
        
    
    };

export const checkIsLogged = () =>
    async ( dispatch, getState, {auth}) => {
        
        dispatch(loginUserStart());
        
        auth.onAuthStateChanged( user => {
            console.log('user', user);
            if(user){
              dispatch(loginUserSuccess(user));
            }else{
              dispatch(loginUserError('No ha iniciado sesión'));
            }
            
          })
    }


