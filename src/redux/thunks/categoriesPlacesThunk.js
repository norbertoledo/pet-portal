// importar acciones
import {
    resetCategoriesPlaceData,
    createCategoriesPlaceStart,
    createCategoriesPlaceSuccess,
    createCategoriesPlaceError,
    editCategoriesPlaceStart,
    editCategoriesPlaceSuccess,
    editCategoriesPlaceError,
    deleteCategoriesPlaceStart,
    deleteCategoriesPlaceSuccess,
    deleteCategoriesPlaceError,
    fetchCategoriesPlacesStart, 
    fetchCategoriesPlacesSuccess, 
    fetchCategoriesPlacesError
} from '../ducks/categoriesPlacesDuck';
import { uuid } from 'uuidv4';

// RESET
export const resetCategoriesPlaceDataThunk = ()=>
    async (dispatch, getState) => {
        dispatch(resetCategoriesPlaceData());
    }

// FETCH
export const fetchCategoriesPlacesThunk = ()=>
    
    async (dispatch, getState, { db }) => {

        dispatch(fetchCategoriesPlacesStart());
        console.log("DESPACHO CATEGORIES PLACES");
        try{
            const snap = await db.collection('places_category').orderBy('name').get();
            const data = snap.docs.map( item => item.data() );
            console.log("FETCH CATEGORIES PLACES DATA->", data);
            dispatch(fetchCategoriesPlacesSuccess({data:data, action:"fetch", message:"Listado de categorías de lugares"}))
        }catch(e){
            dispatch(fetchCategoriesPlacesError({data:[], action:"fetch", message:"Listado de categorías de lugares"}));
        }

    };

// CREATE
export const createCategoriesPlaceThunk = ( payload ) => 

async (dispatch, getState, { db}) => {
console.log("RECIBO CATEGORIES PLACE ->",payload)
    const {name}=payload;
    const id = uuid();
    const dataToSave = {...payload, id:id};
    dispatch(createCategoriesPlaceStart());
    // SAVE TO DB
    try{
        db.collection('places_category').doc(id).set(dataToSave)
        .then(()=>{
            dispatch(createCategoriesPlaceSuccess({status:200, action:"create", message:`Categoría ${name} creada correctamente`}));
        })
        .catch(e=>{
            dispatch(createCategoriesPlaceError({status:404, action:"create", message:"No se pudo crear la categoría en la DB"}))
        });
    }catch(e){
        console.log('ERROR: ', e.message);
        dispatch(createCategoriesPlaceError({status:404, action:"create", message:e.message}));
    }
    // END SAVE DATA INTO DB
    
};

// DELETE
export const deleteCategoriesPlaceThunk = (payload) =>
async(dispatch, getstate, {db}) =>{

    const {id, name} = payload;
    dispatch(deleteCategoriesPlaceStart());
    // DELETE AT DB
    try{
        await db.collection("places_category").doc(id).delete();
        dispatch(deleteCategoriesPlaceSuccess({status:200, action:"delete", message:`Categoría ${name} eliminada correctamente`}));
    }catch(e){
        console.error("Error borrar state: ", e.message);
        dispatch(deleteCategoriesPlaceError({status:400, action:"delete", message:"No se pudo eliminar la categoría de la DB"}))
    }
    // END DELETE AT DB
    

}

// EDIT
export const editCategoriesPlaceThunk = (payload) =>
async(dispatch, getState, {db}) => {

    const {id, name} = payload;
    console.log("RECIBO EN THUNK ->", payload);
    dispatch(editCategoriesPlaceStart());
    try{
        db.collection('places_category').doc(id).set(payload)
        .then(()=>{
            dispatch(editCategoriesPlaceSuccess({status:200, action:"edit", message:`Categoría ${name} actualizada correctamente`}));
        })
        .catch(e=>{
            dispatch(editCategoriesPlaceError({status:404, action:"edit", message:"No se pudo actualizar la categoría en la DB"}))
        });
    }catch(e){
        console.log('ERROR: ', e.message);
        dispatch(editCategoriesPlaceError({status:404, action:"edit", message:e.message}));
    }
}