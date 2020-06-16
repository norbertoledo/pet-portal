// importar acciones
import {
    fetchTipsStart, 
    fetchTipsSuccess, 
    fetchTipsError,
    fetchTipStart, 
    fetchTipSuccess, 
    fetchTipError
} from '../ducks/tipsDuck';


export const fetchTipsThunk = ()=>
    
    async (dispatch, getState, { db }) => {

        dispatch(fetchTipsStart());
        console.log("DESPACHO TIPS");
        try{
            const snap = await db.collection('tips_list').get();
            const data = snap.docs.map( item => item.data() );
            console.log("RECIBIENDO TIPS -> ",data);
            dispatch(fetchTipsSuccess({data:data, action:"fetchTips", message:"Listado de tips"}))
        }catch(e){
            dispatch(fetchTipsError({data:[], action:"fetchTips", message:"Listado de tips"}));
        }
    };

export const fetchTipThunk = (payload)=>
    
    async (dispatch, getState, { db }) => {

        const {id} = payload;

        dispatch(fetchTipStart());
        console.log("DESPACHO TIPS");
        try{
            const snap = await db.collection('tips').doc(id).get();
            const data = snap.data();
            console.log("RECIBIENDO TIP -> ",data);
            dispatch(fetchTipSuccess({data:data, action:"fetchTips", message:"Listado de tips"}))
        }catch(e){
            dispatch(fetchTipError({data:{}, action:"fetchTips", message:"Listado de tips"}));
        }
    };
