// importar acciones
import {
    resetTipData,
    createTipStart,
    createTipSuccess,
    createTipError,
    editTipStart,
    editTipSuccess,
    editTipError,
    deleteTipStart,
    deleteTipSuccess,
    deleteTipError,
    fetchTipsStart, 
    fetchTipsSuccess, 
    fetchTipsError
} from '../ducks/tipsDuck';
import { uuid } from 'uuidv4';

// RESET
export const resetTipDataThunk = ()=>
    async (dispatch, getState) => {
        dispatch(resetTipData());
    }

// FETCH
export const fetchTipsThunk = ()=>
    
    async (dispatch, getState, { db }) => {

        dispatch(fetchTipsStart());
        console.log("DESPACHO TIPS");
        try{
            const snap = await db.collection('tips').orderBy('title').get();
            const data = snap.docs.map( item => item.data() );
            console.log("FETCH TIPS DATA->", data);
            dispatch(fetchTipsSuccess({data:data, action:"fetch", message:"Listado de tips"}))
        }catch(e){
            dispatch(fetchTipsError({data:[], action:"fetch", message:"Listado de tips"}));
        }

    };

// CREATE
export const createTipThunk = ( payload ) => 
async (dispatch, getState, { db, storage }) => {
    console.log("RECIBO TIP ->",payload)
    const {title, avatar}=payload;
    const id = uuid();
    let dataToSave = {...payload, id:id, image:""};
    dispatch(createTipStart());
    // SAVE IMAGE
        // File or Blob
        const file = avatar.file

        // Create the file metadata
        const metadata = {
            gzip:true,
            contentType: 'image/jpeg',
            description: "Imagen de tip"

        };

        // Create a root reference
        const storageRef = storage.ref();
        // Upload file and metadata to the object 'images/mountains.jpg'
        let uploadTask = storageRef.child('tips/' + id).put(file, metadata);

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
                        db.collection('tips').doc(dataToSave.id).set(dataToSave)
                        .then(()=>{
                            dispatch(createTipSuccess({status:200, action:"create", message:`Tip ${title} creado correctamente`}));
                        })
                        .catch(e=>{
                            dispatch(createTipError({status:404, action:"create", message:"No se pudo crear el tip en la DB"}))
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
export const deleteTipThunk = (payload) =>
async(dispatch, getstate, {db}) =>{

    const {id, title} = payload;
    dispatch(deleteTipStart());
    // DELETE AT DB
    try{
        await db.collection("tips").doc(id).delete();
        dispatch(deleteTipSuccess({status:200, action:"delete", message:`Tip ${title} eliminado correctamente`}));
    }catch(e){
        console.error("Error borrar state: ", e.message);
        dispatch(deleteTipError({status:400, action:"delete", message:"No se pudo eliminar el tip de la DB"}))
    }
    // END DELETE AT DB
    

}

// EDIT
export const editTipThunk = (payload) =>
async(dispatch, getState, {db}) => {

    const {id, title} = payload;
    console.log("RECIBO EN THUNK ->", payload);
    dispatch(editTipStart());
    try{
        db.collection('tips').doc(id).set(payload)
        .then(()=>{
            dispatch(editTipSuccess({status:200, action:"edit", message:`Tip ${title} actualizado correctamente`}));
        })
        .catch(e=>{
            dispatch(editTipError({status:404, action:"edit", message:"No se pudo actualizar el tip en la DB"}))
        });
    }catch(e){
        console.log('ERROR: ', e.message);
        dispatch(editTipError({status:404, action:"edit", message:e.message}));
    }
}