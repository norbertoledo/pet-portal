import React, {useState, useEffect, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLinksThunk, createLinkThunk, editLinkThunk, deleteLinkThunk, resetLinkDataThunk } from '../redux/thunks/linksThunk';
import LoadingSpinner from '../components/LoadingSpinner';
import { Layout, notification } from 'antd';
import LinksList from '../components/LinksList';

export default function Links() {

    const { Content } = Layout;
    const dispatch = useDispatch();
    
    const {linkError:itemError, linkData:itemData, linksData:itemsData} = useSelector(state=>state.links);
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
        console.log('[CREATE LINK: handleCreate]->', payload);       
        dispatch( createLinkThunk(payload) );
    }

    const handleDelete = (payload) => {
        console.log('[DELETE LINK: handleDelete]->', payload);       
        dispatch( deleteLinkThunk(payload) );
    }

    const handleEdit = (payload) => {
        console.log('[EDIT LINK: handleEdit]->', payload);       
        dispatch( editLinkThunk(payload) );
    }


    useEffect(()=>{
        if(itemError) {
            openNotificationError()
            setDispatchResponse(false);
        };
        if(!itemError && itemData.status === 200) {
            openNotificationSuccess();
            dispatch(fetchLinksThunk());
            setDispatchResponse(true);
            dispatch(resetLinkDataThunk());
        };

    },[dispatch, itemError, itemData, openNotificationError, openNotificationSuccess]);

    useEffect(()=>{
        dispatch(fetchLinksThunk());
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
            <LinksList
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
