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

import axios from 'axios';

export const resetUserDataThunk = ()=>
    async (dispatch, getState) => {
        dispatch(resetUserData());
    }


export const signupThunk = ( payload ) => 

    async (dispatch, getState, { auth, db, key, storage }) => {

        const {email, password, name, region, photoUrl, role, isActive, avatar}=payload;

        const newPhotoUrl = !photoUrl ? "" : photoUrl;
  
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

            if(avatar){

                // File or Blob
                const file = avatar.file
    
                // Create the file metadata
                const metadata = {
                    gzip:true,
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
                                console.log('File available at', downloadURL);
                                delete payload.avatar;
                                const dataToSave = {...payload, photoUrl:downloadURL, uid: uid};

                                // SAVE DATA INTO DB
                                db.collection('users').doc(uid).set( dataToSave )
                                .then(()=>{
                                    console.log("NEW USER->", name);
                                    dispatch(signupUserSuccess({status:200, action:"signup", message:`Usuario ${name} creado correctamente`}));
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
            }else{

                // SAVE DATA INTO DB
                const dataToSave = {...payload, photoUrl:newPhotoUrl, uid: uid};
                db.collection('users').doc(uid).set(dataToSave)
                .then(()=>{
                    console.log("NEW USER->", name);
                    dispatch(signupUserSuccess({status:200, action:"signup", message:`Usuario ${name} creado correctamente`}));
                })
                .catch(e=>{
                    dispatch(signupUserError({status:404, action:"signup", message:"No se pudo crear el usuario en la DB"}))
                });
                // END SAVE DATA INTO DB

            }

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
            console.log("RECIBIENDO USERS -> ",data);
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
        const {uid, name, photoUrl} = payload;
        const storageRef = storage.ref();
        const imgRef = storageRef.child('users/'+uid);
       
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
            if(photoUrl !== ""){
                await imgRef.delete()
                dispatch(deleteUserSuccess({status:200, action:"delete", message:`Usuario ${name} eliminado correctamente`}));
            }else{
                dispatch(deleteUserSuccess({status:200, action:"delete", message:`Usuario ${name} eliminado correctamente`}));
            }
        }catch(e){
            console.log("Error borrar imagen de storage", e.message);
            dispatch(deleteUserError({status:400, action:"delete", message:"No se pudo eliminar la imagen del usuario"}))
        }

    }


export const editUserThunk = (payload) =>
    async(dispatch, getState, {db, storage}) => {


        dispatch(editUserStart());
        const {uid, name, avatar} = payload;

        if(avatar){

            // File or Blob
            const file = avatar.file

            // Create the file metadata
            const metadata = {
                gzip:true,
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
                            console.log('File available at', downloadURL);
                            delete payload.avatar;
                            const dataToSave = {...payload, photoUrl:downloadURL};

                            // save data to DB
                            db.collection("users").doc(uid).set(dataToSave)
                                .then(()=> {
                                    dispatch(editUserSuccess({status:200, action:"edit", message:`Usuario ${name} modificado correctamente`}));

                                })
                                .catch((e)=> {
                                    console.error("Error writing document: ", e);
                                    dispatch(editUserError({status:404, action:"edit", message:"No se pudo editar el usuario de la DB"}))
                                });
                        })
                        .catch(e=>{
                            console.log("Error: "+e.message);
                        });
                }
            ); 

        }else{
            // save data to DB
            db.collection("users").doc(uid).set(payload)
            .then(()=> {
                dispatch(editUserSuccess({status:200, action:"edit", message:`Usuario ${name} modificado correctamente`}));

            })
            .catch((e)=> {
                console.error("Error writing document: ", e);
                dispatch(editUserError({status:404, action:"edit", message:"No se pudo editar el usuario de la DB"}))
            });
        }

        


    }


/*
// Axios interceptor
axios.interceptors.request.use(function (config) {
    const {token} = JSON.parse(localStorage.getItem(ACCESS_TOKEN));
    config.headers.authorization =  token;

    return config;
});
*/