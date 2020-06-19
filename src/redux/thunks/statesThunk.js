// importar acciones
import {
    resetStateData,
    createStateStart,
    createStateSuccess,
    createStateError,
    editStateStart,
    editStateSuccess,
    editStateError,
    deleteStateStart,
    deleteStateSuccess,
    deleteStateError,
    fetchStatesStart, 
    fetchStatesSuccess, 
    fetchStatesError
} from '../ducks/statesDuck';
import { uuid } from 'uuidv4';

// RESET
export const resetStateDataThunk = ()=>
    async (dispatch, getState) => {
        dispatch(resetStateData());
    }

// FETCH
export const fetchStatesThunk = ()=>
    
    async (dispatch, getState, { db }) => {

        dispatch(fetchStatesStart());
        console.log("DESPACHO STATES");
        try{
            const snap = await db.collection('states').orderBy('name').get();
            const data = snap.docs.map( item => item.data() );
            console.log("FETCH STATES DATA->", data);
            dispatch(fetchStatesSuccess({data:data, action:"fetchStates", message:"Listado de regiones"}))
        }catch(e){
            dispatch(fetchStatesError({data:[], action:"fetchStates", message:"Listado de regiones"}));
        }

    };

// CREATE
export const createStateThunk = ( payload ) => 

async (dispatch, getState, { db}) => {
console.log("RECIBO REGION ->",payload)
    const {name}=payload;
    const id = uuid();
    const dataToSave = {...payload, id:id};
    dispatch(createStateStart());
    // SAVE TO DB
    try{
        db.collection('states').doc(id).set(dataToSave)
        .then(()=>{
            dispatch(createStateSuccess({status:200, action:"create", message:`Región ${name} creada correctamente`}));
        })
        .catch(e=>{
            dispatch(createStateError({status:404, action:"create", message:"No se pudo crear la región en la DB"}))
        });
    }catch(e){
        console.log('ERROR: ', e.message);
        dispatch(createStateError({status:404, action:"create", message:e.message}));
    }
    // END SAVE DATA INTO DB
    
};

// DELETE
export const deleteStateThunk = (payload) =>
async(dispatch, getstate, {db}) =>{

    const {id, name} = payload;
    dispatch(deleteStateStart());
    // DELETE AT DB
    try{
        await db.collection("states").doc(id).delete();
        dispatch(deleteStateSuccess({status:200, action:"delete", message:`Región ${name} eliminada correctamente`}));
    }catch(e){
        console.error("Error borrar state: ", e.message);
        dispatch(deleteStateError({status:400, action:"delete", message:"No se pudo eliminar la región de la DB"}))
    }
    // END DELETE AT DB
    

}

// EDIT
export const editStateThunk = (payload) =>
async(dispatch, getState, {db}) => {

    const {id, name} = payload;
    console.log("RECIBO EN THUNK ->", payload);
    dispatch(editStateStart());
    try{
        db.collection('states').doc(id).set(payload)
        .then(()=>{
            dispatch(editStateSuccess({status:200, action:"edit", message:`Región ${name} actualizada correctamente`}));
        })
        .catch(e=>{
            dispatch(editStateError({status:404, action:"edit", message:"No se pudo actualizar la región en la DB"}))
        });
    }catch(e){
        console.log('ERROR: ', e.message);
        dispatch(editStateError({status:404, action:"edit", message:e.message}));
    }
}