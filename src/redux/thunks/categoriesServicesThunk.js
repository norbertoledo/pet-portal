// importar acciones
import {
    resetCategoriesServiceData,
    createCategoriesServiceStart,
    createCategoriesServiceSuccess,
    createCategoriesServiceError,
    editCategoriesServiceStart,
    editCategoriesServiceSuccess,
    editCategoriesServiceError,
    deleteCategoriesServiceStart,
    deleteCategoriesServiceSuccess,
    deleteCategoriesServiceError,
    fetchCategoriesServicesStart, 
    fetchCategoriesServicesSuccess, 
    fetchCategoriesServicesError
} from '../ducks/categoriesServicesDuck';
import { uuid } from 'uuidv4';

// RESET
export const resetCategoriesServiceDataThunk = ()=>
    async (dispatch, getState) => {
        dispatch(resetCategoriesServiceData());
    }

// FETCH
export const fetchCategoriesServicesThunk = ()=>
    
    async (dispatch, getState, { db }) => {

        dispatch(fetchCategoriesServicesStart());
        console.log("DESPACHO CATEGORIES SERVICES");
        try{
            const snap = await db.collection('services_category').orderBy('name').get();
            const data = snap.docs.map( item => item.data() );
            console.log("FETCH CATEGORIES SERVICES DATA->", data);
            dispatch(fetchCategoriesServicesSuccess({data:data, action:"fetch", message:"Listado de categorías de lugares"}))
        }catch(e){
            dispatch(fetchCategoriesServicesError({data:[], action:"fetch", message:"Listado de categorías de lugares"}));
        }

    };

// CREATE
export const createCategoriesServiceThunk = ( payload ) => 
async (dispatch, getState, { db, storage }) => {
    console.log("RECIBO CATEGORIES SERVICE ->",payload)
    const {name, avatar}=payload;
    const id = uuid();
    let dataToSave = {...payload, id:id, image:""};
    dispatch(createCategoriesServiceStart());
    // SAVE IMAGE
        // File or Blob
        const file = avatar.file

        // Create the file metadata
        const metadata = {
            gzip:true,
            contentType: 'image/jpeg',
            description: "Imagen categoria de servicio"

        };

        // Create a root reference
        const storageRef = storage.ref();
        // Upload file and metadata to the object 'images/mountains.jpg'
        let uploadTask = storageRef.child('services_category/' + id).put(file, metadata);

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
                        delete dataToSave.avatar;
                        dataToSave = {...dataToSave, image:downloadURL};
                        console.log("dataToSave in DB->",dataToSave)
                        // SAVE DATA INTO DB
                        db.collection('services_category').doc(dataToSave.id).set(dataToSave)
                        .then(()=>{
                            dispatch(createCategoriesServiceSuccess({status:200, action:"create", message:`Categoría ${name} creada correctamente`}));
                        })
                        .catch(e=>{
                            dispatch(createCategoriesServiceError({status:404, action:"create", message:"No se pudo crear la categoría en la DB"}))
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
export const deleteCategoriesServiceThunk = (payload) =>
async(dispatch, getstate, {db}) =>{

    const {id, name} = payload;
    dispatch(deleteCategoriesServiceStart());
    // DELETE AT DB
    try{
        await db.collection("services_category").doc(id).delete();
        dispatch(deleteCategoriesServiceSuccess({status:200, action:"delete", message:`Categoría ${name} eliminada correctamente`}));
    }catch(e){
        console.error("Error borrar state: ", e.message);
        dispatch(deleteCategoriesServiceError({status:400, action:"delete", message:"No se pudo eliminar la categoría de la DB"}))
    }
    // END DELETE AT DB
    

}

// EDIT
export const editCategoriesServiceThunk = (payload) =>
async(dispatch, getState, {db}) => {

    const {id, name} = payload;
    console.log("RECIBO EN THUNK ->", payload);
    dispatch(editCategoriesServiceStart());
    try{
        db.collection('services_category').doc(id).set(payload)
        .then(()=>{
            dispatch(editCategoriesServiceSuccess({status:200, action:"edit", message:`Categoría ${name} actualizada correctamente`}));
        })
        .catch(e=>{
            dispatch(editCategoriesServiceError({status:404, action:"edit", message:"No se pudo actualizar la categoría en la DB"}))
        });
    }catch(e){
        console.log('ERROR: ', e.message);
        dispatch(editCategoriesServiceError({status:404, action:"edit", message:e.message}));
    }
}