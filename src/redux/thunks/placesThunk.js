// importar acciones
import {
    resetPlaceData,
    createPlaceStart,
    createPlaceSuccess,
    createPlaceError,
    editPlaceStart,
    editPlaceSuccess,
    editPlaceError,
    deletePlaceStart,
    deletePlaceSuccess,
    deletePlaceError,
    fetchPlacesStart, 
    fetchPlacesSuccess, 
    fetchPlacesError
} from '../ducks/placesDuck';
import { uuid } from 'uuidv4';
import customDownloadUrl from '../../utils/customDownloadUrl';

// RESET
export const resetPlaceDataThunk = ()=>
    async (dispatch, getState) => {
        dispatch(resetPlaceData());
    }

// FETCH
export const fetchPlacesThunk = ()=>
    
    async (dispatch, getState, { db }) => {

        dispatch(fetchPlacesStart());
        console.log("DESPACHO PLACES");
        try{
            const snap = await db.collection('places').orderBy('title').get();
            const data = snap.docs.map( item => item.data() );
            console.log("FETCH PLACES DATA->", data);
            dispatch(fetchPlacesSuccess({data:data, action:"fetch", message:"Listado de lugares"}))
        }catch(e){
            dispatch(fetchPlacesError({data:[], action:"fetch", message:"Listado de lugares"}));
        }

    };

// CREATE
export const createPlaceThunk = ( payload ) => 
async (dispatch, getState, { db, storage }) => {
    console.log("RECIBO PLACE ->",payload)
    const {title, avatar}=payload;
    const id = uuid();
    let dataToSave = {...payload, id:id};
    dispatch(createPlaceStart());
    // SAVE IMAGE
        // File or Blob
        const file = avatar.file

        // Create the file metadata
        const metadata = {
            contentType: 'image/jpeg',
            description: "Imagen lugar"
        };

        // Create a root reference
        const storageRef = storage.ref();
        // Upload file and metadata to the object 'images/mountains.jpg'
        let uploadTask = storageRef.child('places/' + id).put(file, metadata);

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
                        db.collection('places').doc(dataToSave.id).set(dataToSave)
                        .then(()=>{
                            dispatch(createPlaceSuccess({status:200, action:"create", message:`Lugar ${title} creado correctamente`}));
                        })
                        .catch(e=>{
                            dispatch(createPlaceError({status:404, action:"create", message:"No se pudo crear el lugar en la DB"}))
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
export const deletePlaceThunk = (payload) =>
async(dispatch, getstate, {storage, db}) =>{

    const {id, title} = payload;
    const storageRef = storage.ref();
    const imageRef = storageRef.child('places/'+id+"_image");
    const thumbRef = storageRef.child('places/'+id+"_thumb");
    dispatch(deletePlaceStart());
    // DELETE AT DB
    try{
        await db.collection("places").doc(id).delete();
    }catch(e){
        console.error("Error borrar state: ", e.message);
        dispatch(deletePlaceError({status:400, action:"delete", message:"No se pudo eliminar el lugar de la DB"}))
    }
    // END DELETE AT DB

    // DELETE IMAGES AT STORAGE
    try{
        await imageRef.delete();
        await thumbRef.delete();
        dispatch(deletePlaceSuccess({status:200, action:"delete", message:`Lugar ${title} eliminado correctamente`}));

    }catch(e){
        console.log("Error borrar imagen de storage", e.message);
        dispatch(deletePlaceError({status:400, action:"delete", message:"No se pudo eliminar la imagen del lugar"}))
    }
    // END DELETE IMAGES AT STORAGE
    

}

// EDIT
export const editPlaceThunk = (payload) =>
async(dispatch, getState, {storage, db}) => {

    const {id, title, avatar} = payload;
    console.log("RECIBO EN THUNK ->", payload);
    let dataToSave = {...payload};
    dispatch(editPlaceStart());

    const promise = new Promise((resolve, reject)=>{
        if(avatar.file){
            // SAVE IMAGE
            // File or Blob
            const file = avatar.file
    
            // Create the file metadata
            const metadata = {
                contentType: 'image/jpeg',
                description: "Imagen de lugar"
            };
    
            // Create a root reference
            const storageRef = storage.ref();
            // Upload file and metadata to the object 'images/mountains.jpg'
            let uploadTask = storageRef.child('places/' + id).put(file, metadata);
    
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
        }else{
            resolve('OK')
        }

    });

    const promiseResponse = await promise;
    if(promiseResponse==='OK'){
        // SAVE DATA INTO DB
        try{
            db.collection('places').doc(dataToSave.id).set(dataToSave)
            .then(()=>{
                dispatch(editPlaceSuccess({status:200, action:"edit", message:`Lugar ${title} actualizado correctamente`}));
            })
            .catch(e=>{
                dispatch(editPlaceError({status:404, action:"edit", message:"No se pudo actualizar el lugar en la DB"}))
            });
        }catch(e){
            console.log('ERROR SAVE INTO DB: ', e.message);
            dispatch(editPlaceError({status:404, action:"edit", message:e.message}));
        }
        // END SAVE DATA INTO DB
    }
        
}