// importar acciones
import {
    resetLinkData,
    createLinkStart,
    createLinkSuccess,
    createLinkError,
    editLinkStart,
    editLinkSuccess,
    editLinkError,
    deleteLinkStart,
    deleteLinkSuccess,
    deleteLinkError,
    fetchLinksStart, 
    fetchLinksSuccess, 
    fetchLinksError
} from '../ducks/linksDuck';
import { uuid } from 'uuidv4';

// RESET
export const resetLinkDataThunk = ()=>
    async (dispatch, getState) => {
        dispatch(resetLinkData());
    }

// FETCH
export const fetchLinksThunk = ()=>
    
    async (dispatch, getState, { db }) => {

        dispatch(fetchLinksStart());
        console.log("DESPACHO LINKS");
        try{
            const snap = await db.collection('links').get();
            const data = snap.docs.map( item => item.data() );
            console.log("RECIBIENDO LINKS -> ",data);
            dispatch(fetchLinksSuccess({data:data, action:"fetchLinks", message:"Listado de links"}))
        }catch(e){
            dispatch(fetchLinksError({data:[], action:"fetchLinks", message:"Listado de links"}));
        }
    };

// CREATE
export const createLinkThunk = ( payload ) => 

    async (dispatch, getState, { db, key }) => {

        const {title}=payload;
        const id = uuid();
        const dataToSave = {...payload, id:id};
        dispatch(createLinkStart());
        // SAVE TO DB
        try{
            db.collection('links').doc(id).set(dataToSave)
            .then(()=>{
                dispatch(createLinkSuccess({status:200, action:"create", message:`Link ${title} creado correctamente`}));
            })
            .catch(e=>{
                dispatch(createLinkError({status:404, action:"create", message:"No se pudo crear el link en la DB"}))
            });
        }catch(e){
            console.log('ERROR: ', e.message);
            dispatch(createLinkError({status:404, action:"create", message:e.message}));
        }
        // END SAVE DATA INTO DB
        
    };

// DELETE
export const deleteLinkThunk = (payload) =>
    async(dispatch, getstate, {db}) =>{

        const {id, title} = payload;
        dispatch(deleteLinkStart());
        // DELETE AT DB
        try{
            await db.collection("links").doc(id).delete();
            dispatch(deleteLinkSuccess({status:200, action:"delete", message:`Link ${title} eliminado correctamente`}));
        }catch(e){
            console.error("Error borrar link: ", e.message);
            dispatch(deleteLinkError({status:400, action:"delete", message:"No se pudo eliminar el link de la DB"}))
        }
        // END DELETE AT DB
        

    }

// EDIT
export const editLinkThunk = (payload) =>
    async(dispatch, getState, {db}) => {

        const {id, title} = payload;
        console.log("RECIBO EN THUNK ->", payload);
        dispatch(editLinkStart());
        try{
            db.collection('links').doc(id).set(payload)
            .then(()=>{
                dispatch(editLinkSuccess({status:200, action:"edit", message:`Link ${title} actualizado correctamente`}));
            })
            .catch(e=>{
                dispatch(editLinkError({status:404, action:"edit", message:"No se pudo actualizar el link en la DB"}))
            });
        }catch(e){
            console.log('ERROR: ', e.message);
            dispatch(editLinkError({status:404, action:"edit", message:e.message}));
        }
    }