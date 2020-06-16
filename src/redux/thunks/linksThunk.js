// importar acciones
import {
    fetchLinksStart, 
    fetchLinksSuccess, 
    fetchLinksError
} from '../ducks/linksDuck';


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
