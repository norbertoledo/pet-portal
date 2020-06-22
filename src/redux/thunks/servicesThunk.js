// importar acciones
import {
    resetServiceData,
    createServiceStart,
    createServiceSuccess,
    createServiceError,
    editServiceStart,
    editServiceSuccess,
    editServiceError,
    deleteServiceStart,
    deleteServiceSuccess,
    deleteServiceError,
    fetchServicesStart, 
    fetchServicesSuccess, 
    fetchServicesError
} from '../ducks/servicesDuck';
import { uuid } from 'uuidv4';
import customDownloadUrl from '../../utils/customDownloadUrl';

// RESET
export const resetServiceDataThunk = ()=>
    async (dispatch, getState) => {
        dispatch(resetServiceData());
    }

// FETCH
export const fetchServicesThunk = ()=>
    
    async (dispatch, getState, { db }) => {

        dispatch(fetchServicesStart());
        console.log("DESPACHO SERVICES");
        try{
            const snap = await db.collection('services').orderBy('name').get();
            const data = snap.docs.map( item => item.data() );
            console.log("FETCH SERVICES DATA->", data);
            dispatch(fetchServicesSuccess({data:data, action:"fetch", message:"Listado de servicios"}))
        }catch(e){
            dispatch(fetchServicesError({data:[], action:"fetch", message:"Listado de servicios"}));
        }

    };

// CREATE
export const createServiceThunk = ( payload ) => 
async (dispatch, getState, { db, storage }) => {
    console.log("RECIBO SERVICE ->",payload)
    const {name, avatar}=payload;
    const id = uuid();
    let dataToSave = {...payload, id:id};
    dispatch(createServiceStart());
    // SAVE IMAGE
        // File or Blob
        const file = avatar.file
        //const thumb = file;

        // Create the file metadata
        const metadata = {
            contentType: 'image/jpeg',
            description: "Imagen de servicio"
        };

        // Create a root reference
        const storageRef = storage.ref();
        // Upload file and metadata to the object
        let uploadTask = storageRef.child('services/' + id).put(file, metadata);

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

                        delete dataToSave.avatar;
                        dataToSave = {...dataToSave, image:imageUrl, thumb:thumbUrl};
                        console.log("dataToSave in DB->",dataToSave)
                        // SAVE DATA INTO DB
                        db.collection('services').doc(dataToSave.id).set(dataToSave)
                        .then(()=>{
                            dispatch(createServiceSuccess({status:200, action:"create", message:`Servicio ${name} creado correctamente`}));
                        })
                        .catch(e=>{
                            dispatch(createServiceError({status:404, action:"create", message:"No se pudo crear el servicio en la DB"}))
                        });
                        // END SAVE DATA INTO DB

                    })
                    .catch(e=>{
                        console.log("Error: "+e.message);
                    });
            }
        ); 
        // END SAVE IMAGE
};

// DELETE
export const deleteServiceThunk = (payload) =>
async(dispatch, getstate, {storage,db}) =>{

    const {id, name} = payload;
    const storageRef = storage.ref();
    const imageRef = storageRef.child('services/'+id+"_image");
    const thumbRef = storageRef.child('services/'+id+"_thumb");
    dispatch(deleteServiceStart());
    // DELETE AT DB
    try{
        await db.collection("services").doc(id).delete();
    }catch(e){
        console.error("Error borrar servicio: ", e.message);
        dispatch(deleteServiceError({status:400, action:"delete", message:"No se pudo eliminar el servicio de la DB"}))
    }
    // END DELETE AT DB
    
    // DELETE IMAGES AT STORAGE
    try{
        await imageRef.delete();
        await thumbRef.delete();
        dispatch(deleteServiceSuccess({status:200, action:"delete", message:`Servicio ${name} eliminado correctamente`}));

    }catch(e){
        console.log("Error borrar imagen de storage", e.message);
        dispatch(deleteServiceError({status:400, action:"delete", message:"No se pudo eliminar la imagen del servicio"}))
    }
    // END DELETE IMAGES AT STORAGE

}

// EDIT
export const editServiceThunk = (payload) =>
async(dispatch, getState, {storage, db}) => {

    const {id, name, avatar} = payload;
    console.log("RECIBO EN THUNK ->", payload);
    let dataToSave = {...payload};
    dispatch(editServiceStart());

    const promise = new Promise((resolve, reject)=>{
        if(!avatar){
            resolve('OK');
        }
        // SAVE IMAGE
        // File or Blob
        const file = avatar.file

        // Create the file metadata
        const metadata = {
            contentType: 'image/jpeg',
            description: "Imagen de servicio"
        };

        // Create a root reference
        const storageRef = storage.ref();
        // Upload file and metadata to the object 'images/mountains.jpg'
        let uploadTask = storageRef.child('services/' + id).put(file, metadata);

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

                        delete dataToSave.avatar;
                        dataToSave = {...dataToSave, image:imageUrl, thumb:thumbUrl};
                        console.log("dataToSave in DB->",dataToSave)
                        resolve('OK')
                    })
                    .catch(e=>{
                        console.log("Error DOWNLOAD URL: "+e.message);
                        reject();
                    });
            }
        ); 
        // END SAVE IMAGE

    });

    const promiseResponse = await promise;
    if(promiseResponse==='OK'){
        // SAVE DATA INTO DB
        try{
            db.collection('services').doc(dataToSave.id).set(dataToSave)
            .then(()=>{
                dispatch(editServiceSuccess({status:200, action:"edit", message:`Servicio ${name} actualizado correctamente`}));
            })
            .catch(e=>{
                dispatch(editServiceError({status:404, action:"edit", message:"No se pudo actualizar el servcio en la DB"}))
            });
        }catch(e){
            console.log('ERROR SAVE INTO DB: ', e.message);
            dispatch(editServiceError({status:404, action:"edit", message:e.message}));
        }
        // END SAVE DATA INTO DB
    }
        
}