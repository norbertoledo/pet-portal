// importar acciones
import {
    fetchPlacesStart, 
    fetchPlacesSuccess, 
    fetchPlacesError
} from '../ducks/placesDuck';


export const fetchPlacesThunk = ()=>
    
    async (dispatch, getState, { db }) => {

        dispatch(fetchPlacesStart());
        console.log("DESPACHO PLACES");
        try{
            const snap = await db.collection('places_list').get();
            const data = snap.docs.map( item => item.data() );
            console.log("RECIBIENDO PLACES -> ",data);
            dispatch(fetchPlacesSuccess({data:data, action:"fetchPlaces", message:"Listado de lgares"}))
        }catch(e){
            dispatch(fetchPlacesError({data:[], action:"fetchPlaces", message:"Listado de lugares"}));
        }
    };
