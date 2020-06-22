import React, {useState, useEffect, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTipsThunk, createTipThunk, editTipThunk, deleteTipThunk, resetTipDataThunk } from '../redux/thunks/tipsThunk';
import LoadingSpinner from '../components/LoadingSpinner';
import { Layout, notification } from 'antd';
import TipsList from '../components/TipsList';


export default function Tips() {
    const { Content } = Layout;
    const dispatch = useDispatch();
    
    const {tipError:itemError, tipData:itemData, tipsData:itemsData} = useSelector(state=>state.tips);

    const [items, setItems] = useState([]);
    const [dispatchResponse, setDispatchResponse]=useState(false);

    const setItemsLists = useCallback((items)=>{   
        const activeItems = items.filter(item=>item.isActive);
        const inactiveItems = items.filter(item=>!item.isActive);
        const refactorItems = [activeItems, inactiveItems];
        setItems(refactorItems);
    },[]);
    
    
    const openNotificationError = useCallback(() => {    
        notification.error({
            message: itemData.message  
        });
    },[itemData]);
    
    const openNotificationSuccess = useCallback(() => {
        console.log("data",itemData);
        notification.success({
            message: itemData.message
        });
    },[itemData]);
    
    // HANDLERS

    const handleCreate = (payload) => {
        console.log('[CREATE TIP: handleCreate]->', payload);       
        dispatch( createTipThunk(payload) );
    }

    const handleDelete = (payload) => {
        console.log('[DELETE TIP: handleDelete]->', payload);       
        dispatch( deleteTipThunk(payload) );
    }

    const handleEdit = (payload) => {
        console.log('[EDIT TIP: handleEdit]->', payload);       
        dispatch( editTipThunk(payload) );
    }


    useEffect(()=>{
        if(itemError) {
            openNotificationError()
            setDispatchResponse(false);
        };
        if(!itemError && itemData.status === 200) {
            openNotificationSuccess();
            dispatch(fetchTipsThunk());
            setDispatchResponse(true);
            dispatch(resetTipDataThunk());
        };

    },[dispatch, itemError, itemData, openNotificationError, openNotificationSuccess]);


    useEffect(()=>{
        dispatch(fetchTipsThunk());
    },[dispatch]);

    useEffect(()=>{
        if(itemsData.data.length>0){
            setItemsLists(itemsData.data);
        };
    },[itemsData, setItemsLists]);


    return (

        <Layout className="items">
        <Content className="items__content">
        {
            !items.length>0
            ? 
            <div className="layout-spinner"><LoadingSpinner/></div>
            : 
            <TipsList
                activeItems={items[0]}
                inactiveItems={items[1]}
                handleCreate={handleCreate}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                dispatchResponse={dispatchResponse}
                setDispatchResponse={setDispatchResponse}
            />

        }

        </Content>
    </Layout>
        
    )
}
