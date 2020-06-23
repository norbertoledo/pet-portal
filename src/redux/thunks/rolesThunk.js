// importar acciones
import {
    resetRoleData,
    createRoleStart,
    createRoleSuccess,
    createRoleError,
    editRoleStart,
    editRoleSuccess,
    editRoleError,
    deleteRoleStart,
    deleteRoleSuccess,
    deleteRoleError,
    fetchRolesStart, 
    fetchRolesSuccess, 
    fetchRolesError
} from '../ducks/rolesDuck';
import { uuid } from 'uuidv4';

// RESET
export const resetRoleDataThunk = ()=>
    async (dispatch, getState) => {
        dispatch(resetRoleData());
    }

// FETCH
export const fetchRolesThunk = ()=>
    
    async (dispatch, getState, { db }) => {

        dispatch(fetchRolesStart());
        console.log("DESPACHO ROLES");
        try{
            const snap = await db.collection('roles').get();
            const data = snap.docs.map( item => item.data() );
            console.log("RECIBIENDO ROLES -> ",data);
            dispatch(fetchRolesSuccess({data:data, action:"fetchRoles", message:"Listado de Roles"}))
        }catch(e){
            dispatch(fetchRolesError({data:[], action:"fetchRoles", message:"Listado de Roles"}));
        }
    };

// CREATE
export const createRoleThunk = ( payload ) => 

    async (dispatch, getState, { db, key }) => {

        const {title}=payload;
        const id = uuid();
        const dataToSave = {...payload, id:id};
        dispatch(createRoleStart());
        // SAVE TO DB
        try{
            db.collection('roles').doc(id).set(dataToSave)
            .then(()=>{
                dispatch(createRoleSuccess({status:200, action:"create", message:`Rol ${title} creado correctamente`}));
            })
            .catch(e=>{
                dispatch(createRoleError({status:404, action:"create", message:"No se pudo crear el rol en la DB"}))
            });
        }catch(e){
            console.log('ERROR: ', e.message);
            dispatch(createRoleError({status:404, action:"create", message:e.message}));
        }
        // END SAVE DATA INTO DB
        
    };

// DELETE
export const deleteRoleThunk = (payload) =>
    async(dispatch, getstate, {db}) =>{

        const {id, title} = payload;
        dispatch(deleteRoleStart());
        // DELETE AT DB
        try{
            await db.collection("roles").doc(id).delete();
            dispatch(deleteRoleSuccess({status:200, action:"delete", message:`Rol ${title} eliminado correctamente`}));
        }catch(e){
            console.error("Error borrar Role: ", e.message);
            dispatch(deleteRoleError({status:400, action:"delete", message:"No se pudo eliminar el Rol de la DB"}))
        }
        // END DELETE AT DB
        

    }

// EDIT
export const editRoleThunk = (payload) =>
    async(dispatch, getState, {db}) => {

        const {id, title} = payload;
        console.log("RECIBO EN THUNK ->", payload);
        dispatch(editRoleStart());
        try{
            db.collection('roles').doc(id).set(payload)
            .then(()=>{
                dispatch(editRoleSuccess({status:200, action:"edit", message:`Rol ${title} actualizado correctamente`}));
            })
            .catch(e=>{
                dispatch(editRoleError({status:404, action:"edit", message:"No se pudo actualizar el Rol en la DB"}))
            });
        }catch(e){
            console.log('ERROR: ', e.message);
            dispatch(editRoleError({status:404, action:"edit", message:e.message}));
        }
    }