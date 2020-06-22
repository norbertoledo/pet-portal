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
import customDownloadUrl from '../../utils/customDownloadUrl';

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
            const snap = await db.collection('tips').orderBy('postedAt', 'desc').get();
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
    let dataToSave = {...payload, id:id};
    dispatch(createTipStart());
    // SAVE IMAGE
        // File or Blob
        const file = avatar.file
        //const thumb = file;

        // Create the file metadata
        const metadata = {
            contentType: 'image/jpeg',
            description: "Imagen de tip"
        };

        // Create a root reference
        const storageRef = storage.ref();
        // Upload file and metadata to the object
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
                        
                        const {imageUrl, thumbUrl} = customDownloadUrl(downloadURL);

                        delete dataToSave.avatar;
                        dataToSave = {...dataToSave, image:imageUrl, thumb:thumbUrl};
                        console.log("dataToSave in DB->",dataToSave)


                        // SAVE DATA INTO TIPS_LIST DB
                        const dataToTipsList = {
                            id: dataToSave.id,
                            title: dataToSave.title,
                            caption: dataToSave.caption,
                            thumb: dataToSave.thumb,
                            postedAt: dataToSave.postedAt,
                            isActive: dataToSave.isActive
                        };

                        // SAVE DATA INTO TIPS DB
                        const dataToTips = {...dataToSave};

                        db.collection('tips_list').doc(dataToTipsList.id).set(dataToTipsList)
                        .then(()=>{
                            
                            // SAVE DATA INTO TIPS DB
                            db.collection('tips').doc(dataToTips.id).set(dataToTips)
                            .then(()=>{
                                dispatch(createTipSuccess({status:200, action:"create", message:`Tip ${title} creado correctamente`}));
                            })
                            .catch(e=>{
                                dispatch(createTipError({status:404, action:"create", message:"No se pudo crear el tip en la DB"}))
                            });
                            // END SAVE DATA INTO TIPS DB
                        })
                        .catch(e=>{
                            dispatch(createTipError({status:404, action:"create", message:"No se pudo crear el tip en la DB"}))
                        });
                        // END SAVE DATA INTO TIPS_LIST DB

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
async(dispatch, getstate, {storage,db}) =>{

    const {id, title} = payload;
    const storageRef = storage.ref();
    const imageRef = storageRef.child('tips/'+id+"_image");
    const thumbRef = storageRef.child('tips/'+id+"_thumb");
    dispatch(deleteTipStart());
    // DELETE TIPS AT DB
    try{
        await db.collection("tips").doc(id).delete();
    }catch(e){
        console.error("Error borrar tip: ", e.message);
        dispatch(deleteTipError({status:400, action:"delete", message:"No se pudo eliminar el tip de la DB"}))
    }
    // END DELETE AT DB

    // DELETE TIPS LIST AT DB
    try{
        await db.collection("tips_list").doc(id).delete();
    }catch(e){
        console.error("Error borrar tip list: ", e.message);
        dispatch(deleteTipError({status:400, action:"delete", message:"No se pudo eliminar el tip de la DB"}))
    }
    // END DELETE AT DB
    
    // DELETE IMAGES AT STORAGE
    try{
        await imageRef.delete();
        await thumbRef.delete();
        dispatch(deleteTipSuccess({status:200, action:"delete", message:`Tip ${title} eliminado correctamente`}));

    }catch(e){
        console.log("Error borrar imagen de storage", e.message);
        dispatch(deleteTipError({status:400, action:"delete", message:"No se pudo eliminar la imagen del tip"}))
    }
    // END DELETE IMAGES AT STORAGE

}

// EDIT
export const editTipThunk = (payload) =>
async(dispatch, getState, {storage, db}) => {

    const {id, title, avatar} = payload;
    console.log("RECIBO EN THUNK ->", payload);
    let dataToSave = {...payload};
    dispatch(editTipStart());

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
        
        // SAVE DATA INTO TIPS_LIST DB
        const dataToTipsList = {
            id: dataToSave.id,
            title: dataToSave.title,
            caption: dataToSave.caption,
            thumb: dataToSave.thumb,
            postedAt: dataToSave.postedAt,
            isActive: dataToSave.isActive
        };

        // SAVE DATA INTO TIPS DB
        const dataToTips = {...dataToSave};

        db.collection('tips_list').doc(dataToTipsList.id).set(dataToTipsList)
        .then(()=>{
            
            // SAVE DATA INTO TIPS DB
            db.collection('tips').doc(dataToTips.id).set(dataToTips)
            .then(()=>{
                dispatch(createTipSuccess({status:200, action:"create", message:`Tip ${title} creado correctamente`}));
            })
            .catch(e=>{
                dispatch(createTipError({status:404, action:"create", message:"No se pudo crear el tip en la DB"}))
            });
            // END SAVE DATA INTO TIPS DB
        })
        .catch(e=>{
            dispatch(createTipError({status:404, action:"create", message:"No se pudo crear el tip en la DB"}))
        });
        // END SAVE DATA INTO TIPS_LIST DB

    }
        
}