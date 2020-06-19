import React, {useState, useEffect, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategoriesPlacesThunk, createCategoriesPlaceThunk, editCategoriesPlaceThunk, deleteCategoriesPlaceThunk, resetCategoriesPlaceDataThunk } from '../redux/thunks/categoriesPlacesThunk';
import LoadingSpinner from '../components/LoadingSpinner';
import { Layout, notification } from 'antd';
import CategoriesPlacesList from '../components/CategoriesPlacesList';

export default function CategoriesPlaces() {
    const { Content } = Layout;
    const dispatch = useDispatch();
    
    const {categoriesPlaceError:itemError, categoriesPlaceData:itemData, categoriesPlacesData:itemsData} = useSelector(state=>state.categoriesPlaces);
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
        console.log('[CREATE CATEGORY PLACE: handleCreate]->', payload);       
        dispatch( createCategoriesPlaceThunk(payload) );
    }

    const handleDelete = (payload) => {
        console.log('[DELETE CATEGORY PLACE: handleDelete]->', payload);       
        dispatch( deleteCategoriesPlaceThunk(payload) );
    }

    const handleEdit = (payload) => {
        console.log('[EDIT CATEGORIES PLACE: handleEdit]->', payload);       
        dispatch( editCategoriesPlaceThunk(payload) );
    }


    useEffect(()=>{
        if(itemError) {
            openNotificationError()
            setDispatchResponse(false);
        };
        if(!itemError && itemData.status === 200) {
            openNotificationSuccess();
            dispatch(fetchCategoriesPlacesThunk());
            setDispatchResponse(true);
            dispatch(resetCategoriesPlaceDataThunk());
        };

    },[dispatch, itemError, itemData, openNotificationError, openNotificationSuccess]);

    useEffect(()=>{
        dispatch(fetchCategoriesPlacesThunk());
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
            <CategoriesPlacesList
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
