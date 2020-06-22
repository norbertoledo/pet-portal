//import {useHistory} from 'react-router-dom';
// importar acciones
import {
    resetUserData,
    signupUserStart, 
    signupUserSuccess, 
    signupUserError,
    editUserStart,
    editUserSuccess,
    editUserError,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserError,
    fetchUsersStart,
    fetchUsersSuccess,
    fetchUsersError,
} from '../ducks/usersDuck';
import customDownloadUrl from '../../utils/customDownloadUrl';
import axios from 'axios';

export const resetUserDataThunk = ()=>
    async (dispatch, getState) => {
        dispatch(resetUserData());
    }


export const signupThunk = ( payload ) => 

    async (dispatch, getState, { db, key, storage }) => {

        const {email, password, name, avatar}=payload;

  
        dispatch(signupUserStart());
        try{

            // CREATE USER
            const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;
            const postData = {email: email, password: password};

            const response = await fetch(url, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(postData), // data can be `string` or {object}!
                headers:{
                    'Content-Type': 'application/json'
                }
                })
            const user = await response.json();

            console.log("USER: ",user)
            const uid =  user.localId;
            console.log("uid:", uid);
            // END CREATE USER

            delete payload.password;
            // SAVE IMAGE
                // File or Blob
                const file = avatar.file
    
                // Create the file metadata
                const metadata = {
                    contentType: 'image/jpeg',
                    description: "Imagen de perfil"
                };
    
                // Create a root reference
                const storageRef = storage.ref();
                // Upload file and metadata to the object 'images/mountains.jpg'
                let uploadTask = storageRef.child('users/' + uid).put(file, metadata);
    
                // Listen for state changes, errors, and completion of the upload.
                uploadTask.on(
                    'state_changed', // or 'state_changed'
                    function(snapshot) {
    
                    }, 
                    function(error) {
    
                        // A full list of error codes is available at
                        // https://firebase.google.com/docs/storage/web/handle-errors
                        switch (error.code) {
                            case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
    
                            case 'storage/canceled':
                            // User canceled the upload
                            break;
    
                            case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
    
                            default: break;
                        }
                    }, 
                    function() {
                        // Upload completed successfully, now we can get the download URL
                        uploadTask.snapshot.ref.getDownloadURL()
                            .then(function(downloadURL) {
                                
                                const {imageUrl, thumbUrl} = customDownloadUrl(downloadURL);

                                delete payload.avatar;
                                const dataToSave = {...payload, photoUrl:imageUrl, thumbUrl:thumbUrl, uid: uid};
                                
                                // SAVE DATA INTO DB
                                db.collection('users').doc(uid).set( dataToSave )
                                    .then(()=>{
                                        setTimeout(()=>{
                                            console.log("NEW USER->", name);
                                            dispatch(signupUserSuccess({status:200, action:"signup", message:`Usuario ${name} creado correctamente`}));
                                        }, 1500);
                                    })
                                    .catch(e=>{
                                        dispatch(signupUserError({status:404, action:"signup", message:"No se pudo crear el usuario en la DB"}))
                                    });
                                    // END SAVE DATA INTO DB
                            })
                            .catch(e=>{
                                console.log("Error: "+e.message);
                            });
                    }
                ); 
                    // END SAVE IMAGE
            

        }catch(e){
            console.log('ERROR: ', e.message);
            dispatch(signupUserError({status:404, action:"signup", message:e.message}));
        }
        
    };



export const fetchUsersThunk = () => 
    async(dispatch, getState, {db}) =>{
        try {
            dispatch(fetchUsersStart());
        console.log("DESPACHO USERS");
        try{
            const snap = await db.collection('users').get();
            
            const data = snap.docs.map( item => item.data() );
            console.log("FETCH USERS DATA -> ",data);
                dispatch(fetchUsersSuccess({data:data, action:"fetchUsers", message:"Listado de usuarios"}))
            
        }catch(e){
            dispatch(fetchUsersError({data:[], action:"fetchUsers", message:"Listado de usuarios"}));
        }
        } catch (e) {
            
        }
    }

export const deleteUserThunk = (payload) =>
    async(dispatch, getstate, {db, storage}) =>{

        const url = "/api/deleteuser";
        const postData = {emailtodelete: payload.email};
        const {uid, name} = payload;
        const storageRef = storage.ref();
        const imageRef = storageRef.child('users/'+uid+'_image');
        const thumbRef = storageRef.child('users/'+uid+'_thumb');
       
        dispatch(deleteUserStart());

        // DELETE USER FIREBASE AUTH BY EMAIL
        try{
            const response = await axios.post(url, {
                data: postData,
            })
            console.log("RESPONSE FETCH: ", response.status)
        }catch(e){
            console.log("Error borrar usuario Auth: "+e.message)
            dispatch(deleteUserError({status:400, action:"delete", message:"No se pudo borrar el usuario de firebase"}))
            return;
        }
        
        // DELETE USER DB
        try{
            await db.collection("users").doc(uid).delete();
        }catch(e){
            console.error("Error borrar usuario DB: ", e.message);
            dispatch(deleteUserError({status:400, action:"delete", message:"No se pudo eliminar el usuario de la DB"}))
            return;
        }
        
        // DELETE IMAGE STORAGE
        try{
            await imageRef.delete();
            await thumbRef.delete();
            dispatch(deleteUserSuccess({status:200, action:"delete", message:`Usuario ${name} eliminado correctamente`}));

        }catch(e){
            console.log("Error borrar imagen de storage", e.message);
            dispatch(deleteUserError({status:400, action:"delete", message:"No se pudo eliminar la imagen del usuario"}))
        }

    }


export const editUserThunk = (payload) =>
    async(dispatch, getState, {db, storage}) => {

        const {uid, name, avatar} = payload;
        let dataToSave = {...payload};
        dispatch(editUserStart());

        const promise = new Promise((resolve, reject)=>{
            if(avatar.file){
                // File or Blob
                const file = avatar.file

                // Create the file metadata
                const metadata = {
                    contentType: 'image/jpeg',
                    description: "Imagen de perfil"
                };

                // Create a root reference
                const storageRef = storage.ref();
                // Upload file and metadata to the object 'images/mountains.jpg'
                let uploadTask = storageRef.child('users/' + uid).put(file, metadata);

                // Listen for state changes, errors, and completion of the upload.
                uploadTask.on(
                    'state_changed', // or 'state_changed'
                    function(snapshot) {

                    }, 
                    function(error) {

                        reject();
                    }, 
                    function() {
                        // Upload completed successfully, now we can get the download URL
                        uploadTask.snapshot.ref.getDownloadURL()
                            .then(function(downloadURL) {
                                const {imageUrl, thumbUrl} = customDownloadUrl(downloadURL);
                                delete payload.avatar;
                                dataToSave = {...payload, photoUrl:imageUrl, thumbUrl:thumbUrl};
                                resolve('OK')
                            })
                            .catch(e=>{
                                console.log("Error: "+e.message);
                                reject();
                            });
                    }
                ); 

            }else{
                delete payload.avatar;
                resolve('OK');
            }

        });

        const promiseResponse = await promise;
        if(promiseResponse==='OK'){
            // SAVE DATA INTO DB
            try{
                db.collection("users").doc(uid).set(dataToSave)
                .then(()=> {
                    setTimeout(()=>{
                        dispatch(editUserSuccess({status:200, action:"edit", message:`Usuario ${name} modificado correctamente`}));
                    },2000);
                })
                .catch((e)=> {
                    console.error("Error writing document: ", e);
                    dispatch(editUserError({status:404, action:"edit", message:"No se pudo editar el usuario de la DB"}))
                });
            }catch(e){
                console.log('ERROR SAVE INTO DB: ', e.message);
                dispatch(editUserError({status:404, action:"edit", message:e.message}));
            }
            // END SAVE DATA INTO DB

        }
    }