// importar acciones
import {
    fetchStatesStart, 
    fetchStatesSuccess, 
    fetchStatesError
} from '../ducks/statesDuck';


export const fetchStatesThunk = ()=>
    
    async (dispatch, getState, { db }) => {

        dispatch(fetchStatesStart());
        console.log("DESPACHO");
        try{
            const snap = await db.collection('states').get();
            const data = snap.docs.map( item => item.data() );
            console.log("FETCH STATES DATA->", data);
            dispatch(fetchStatesSuccess({data:data, action:"fetchStates", message:"Listado de regiones"}))
        }catch(e){
            dispatch(fetchStatesError({data:[], action:"fetchStates", message:"Listado de regiones"}));
        }

    };
