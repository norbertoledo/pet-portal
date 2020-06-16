// importar acciones
import {
    fetchServicesStart, 
    fetchServicesSuccess, 
    fetchServicesError
} from '../ducks/servicesDuck';


export const fetchServicesThunk = ()=>
    
    async (dispatch, getState, { db }) => {

        dispatch(fetchServicesStart());
        console.log("DESPACHO SERVICES");
        try{
            const snap = await db.collection('services').get();
            const data = snap.docs.map( item => item.data() );
            console.log("RECIBIENDO SERVICES -> ",data);
            dispatch(fetchServicesSuccess({data:data, action:"fetchServices", message:"Listado de servicios"}))
        }catch(e){
            dispatch(fetchServicesError({data:[], action:"fetchServices", message:"Listado de servicios"}));
        }
    };
