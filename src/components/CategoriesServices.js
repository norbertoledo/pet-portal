import React, {useState, useEffect, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategoriesServicesThunk, createCategoriesServiceThunk, editCategoriesServiceThunk, deleteCategoriesServiceThunk, resetCategoriesServiceDataThunk } from '../redux/thunks/categoriesServicesThunk';
import LoadingSpinner from '../components/LoadingSpinner';
import { Layout, notification } from 'antd';
import CategoriesServicesList from '../components/CategoriesServicesList';

export default function CategoriesServices() {
    const { Content } = Layout;
    const dispatch = useDispatch();
    
    const {categoriesServiceError:itemError, categoriesServiceData:itemData, categoriesServicesData:itemsData} = useSelector(state=>state.categoriesServices);
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
        console.log('[CREATE CATEGORY Service: handleCreate]->', payload);       
        dispatch( createCategoriesServiceThunk(payload) );
    }

    const handleDelete = (payload) => {
        console.log('[DELETE CATEGORY Service: handleDelete]->', payload);       
        dispatch( deleteCategoriesServiceThunk(payload) );
    }

    const handleEdit = (payload) => {
        console.log('[EDIT CATEGORIES Service: handleEdit]->', payload);       
        dispatch( editCategoriesServiceThunk(payload) );
    }


    useEffect(()=>{
        if(itemError) {
            openNotificationError()
            setDispatchResponse(false);
        };
        if(!itemError && itemData.status === 200) {
            openNotificationSuccess();
            dispatch(fetchCategoriesServicesThunk());
            setDispatchResponse(true);
            dispatch(resetCategoriesServiceDataThunk());
        };

    },[dispatch, itemError, itemData, openNotificationError, openNotificationSuccess]);

    useEffect(()=>{
        dispatch(fetchCategoriesServicesThunk());
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
            <CategoriesServicesList
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
