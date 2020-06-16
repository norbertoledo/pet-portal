import { ACCESS_TOKEN } from '../../utils/constants';

// importar acciones
import {
    loginUserStart, 
    loginUserSuccess, 
    loginUserError, 
    logoutUserStart, 
    logoutUserSuccess, 
    logoutUserError
} from '../ducks/authDuck';

// Thunks - Llamados externos - Efectos
export const loginThunk = ( payload ) => 


    async (dispatch, getState, {auth, db}) => {
    
        const {email, password}=payload;

        dispatch(loginUserStart());

        try{

            const loginData = await auth.signInWithEmailAndPassword( email, password );
            
            const {user} = loginData;

            if(user){
                
                try{

                    const snap = await db.collection('users').doc(user.uid).get();
                        
                    const data = snap.data();
                    
                    //console.log('[USER ADMIN ROLE]->', data.role.admin);
                    
                    if(data.role.admin){
                        //console.log("USER LOGIN ->", data.name)
                        try{
                            const userToken = await auth.currentUser.getIdToken(/* forceRefresh */ true);    
                            // Send token to your backend via HTTPS
                            const userData = {token:userToken, email:data.email}
                            localStorage.setItem(ACCESS_TOKEN, JSON.stringify(userData));
                            dispatch(loginUserSuccess({data:data, action:"login", message:"Autenticado con éxito"}));
                        }catch(e){
                            dispatch(loginUserError({data:{}, action:"login", message:e.message}));
                        }
                    }else{
                        //console.log('[ERROR]->', "No es Administrador");
                        dispatch(loginUserError({data:{}, action:"login", message: "No dispone de permisos"}));
                    }
                   
                }catch(e){
                    //console.log('[ERROR]->', e.message);
                    dispatch(loginUserError({data:{}, action:"login", message:e.message}));
                }
            }else{
                dispatch(loginUserError({data:{}, action:"login", message:'No ha iniciado sesión'}));
            }
             

        }catch(e){
            //console.log(e.message);
            dispatch(loginUserError({data:{}, action:"login", message:e.message}));
        }
    
    };


export const logoutThunk = () => 
    async (dispatch, getState, {auth}) => {
        dispatch(logoutUserStart());
        try{
            localStorage.clear();
            await auth.signOut();
            dispatch(logoutUserSuccess({data:{}, action:"logout", message:"Hasta Pronto!"}));
        }catch(e) {
            dispatch(logoutUserError({data:{}, action:"logout", message: e.message}));
        };
    }



   export const isLoggedThunk = () =>
   async ( dispatch, getState, {db, auth}) => {

       
       auth.onAuthStateChanged ( async user => {
        const localToken = JSON.parse(localStorage.getItem(ACCESS_TOKEN));
        
        dispatch(loginUserStart());
        if(localToken && localToken != null){

            try{
                
                const snap = await db.collection('users').doc(user.uid).get();
                const userData = snap.data();
    
                try{
                const userToken = await user.getIdToken();

                if(localToken.token === userToken){ 
                    //console.log("coinciden los token");
                    dispatch(loginUserSuccess({data:userData, action:"login", message:"Autenticado con éxito"}));
                }else{
                    if(localToken.email === userData.email ){
                        //console.log("No coinciden los tokens pero si el mail");
                        //sesion expirada
                        //console.log("sesion experiada");
                        dispatch(loginUserError({data:{}, action:"login", message:"La sesion ha expirado"}));
                    }else{
                        //console.log("No coincide ni el token ni el mail")
                        dispatch(loginUserError({data:{}, action:"login", message:"No ha iniciado sesión"}));
                    }
                }
            }catch(e) {
                dispatch(loginUserError({data:{}, action:"login", message:e.message}));
            };
    
    
            }catch(e) {
                dispatch(loginUserError({data:{}, action:"login", message:e.message}));
            };

        }else{
            dispatch(loginUserError({data:{}, action:"login", message:""}));
        }
         
       });           

   }