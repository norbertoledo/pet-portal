import React, {useState, useEffect, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStatesThunk, createStateThunk, editStateThunk, deleteStateThunk, resetStateDataThunk } from '../redux/thunks/statesThunk';
import LoadingSpinner from '../components/LoadingSpinner';
import { Layout, notification } from 'antd';
import StatesList from '../components/StatesList';

export default function States() {
    
    const { Content } = Layout;
    const dispatch = useDispatch();
    
    const {stateError:itemError, stateData:itemData, statesData:itemsData} = useSelector(state=>state.states);
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
        console.log('[CREATE STATE: handleCreate]->', payload);       
        dispatch( createStateThunk(payload) );
    }

    const handleDelete = (payload) => {
        console.log('[DELETE STATE: handleDelete]->', payload);       
        dispatch( deleteStateThunk(payload) );
    }

    const handleEdit = (payload) => {
        console.log('[EDIT STATE: handleEdit]->', payload);       
        dispatch( editStateThunk(payload) );
    }


    useEffect(()=>{
        if(itemError) {
            openNotificationError()
            setDispatchResponse(false);
        };
        if(!itemError && itemData.status === 200) {
            openNotificationSuccess();
            dispatch(fetchStatesThunk());
            setDispatchResponse(true);
            dispatch(resetStateDataThunk());
        };

    },[dispatch, itemError, itemData, openNotificationError, openNotificationSuccess]);

    useEffect(()=>{
        dispatch(fetchStatesThunk());
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
            <StatesList
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
