import React, {useState, useEffect, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlacesThunk, createPlaceThunk, editPlaceThunk, deletePlaceThunk, resetPlaceDataThunk } from '../redux/thunks/placesThunk';
import LoadingSpinner from '../components/LoadingSpinner';
import { Layout, notification } from 'antd';
import PlacesList from '../components/PlacesList';

export default function Places() {
    const { Content } = Layout;
    const dispatch = useDispatch();
    
    const {placeError:itemError, placeData:itemData, placesData:itemsData} = useSelector(state=>state.places);
    const {categoriesPlacesData:categoriesData} = useSelector(state => state.categoriesPlaces);

    const [categories, setCategories]=useState(categoriesData);
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
        console.log('[CREATE PLACE: handleCreate]->', payload);       
        dispatch( createPlaceThunk(payload) );
    }

    const handleDelete = (payload) => {
        console.log('[DELETE PLACE: handleDelete]->', payload);       
        dispatch( deletePlaceThunk(payload) );
    }

    const handleEdit = (payload) => {
        console.log('[EDIT PLACE: handleEdit]->', payload);       
        dispatch( editPlaceThunk(payload) );
    }


    useEffect(()=>{
        if(itemError) {
            openNotificationError()
            setDispatchResponse(false);
        };
        if(!itemError && itemData.status === 200) {
            openNotificationSuccess();
            dispatch(fetchPlacesThunk());
            setDispatchResponse(true);
            dispatch(resetPlaceDataThunk());
        };

    },[dispatch, itemError, itemData, openNotificationError, openNotificationSuccess]);

    useEffect(()=>{
        setCategories(categoriesData.data);
    },[categoriesData]);

    useEffect(()=>{
        dispatch(fetchPlacesThunk());
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
            !items.length>0 && !categories.length>0
            ? 
            <div className="layout-spinner"><LoadingSpinner/></div>
            : 
            <PlacesList
                categories={categories}
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
