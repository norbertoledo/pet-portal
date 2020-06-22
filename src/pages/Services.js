import React, {useState, useEffect, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServicesThunk, createServiceThunk, editServiceThunk, deleteServiceThunk, resetServiceDataThunk } from '../redux/thunks/servicesThunk';
import LoadingSpinner from '../components/LoadingSpinner';
import { Layout, notification } from 'antd';
import ServicesList from '../components/ServicesList';

const Services = () => {
    const { Content } = Layout;
    const dispatch = useDispatch();
    
    const {serviceError:itemError, serviceData:itemData, servicesData:itemsData} = useSelector(state=>state.services);
    const {statesData} = useSelector(state=>state.states);
    const {categoriesServicesData:categoriesData} = useSelector(state => state.categoriesServices);

    const [categories, setCategories]=useState(categoriesData);
    const [states, setStates]=useState(statesData);
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
        console.log('[CREATE SERVICE: handleCreate]->', payload);       
        dispatch( createServiceThunk(payload) );
    }

    const handleDelete = (payload) => {
        console.log('[DELETE SERVICE: handleDelete]->', payload);       
        dispatch( deleteServiceThunk(payload) );
    }

    const handleEdit = (payload) => {
        console.log('[EDIT SERVICE: handleEdit]->', payload);       
        dispatch( editServiceThunk(payload) );
    }


    useEffect(()=>{
        if(itemError) {
            openNotificationError()
            setDispatchResponse(false);
        };
        if(!itemError && itemData.status === 200) {
            openNotificationSuccess();
            dispatch(fetchServicesThunk());
            setDispatchResponse(true);
            dispatch(resetServiceDataThunk());
        };

    },[dispatch, itemError, itemData, openNotificationError, openNotificationSuccess]);

    useEffect(()=>{
        setCategories(categoriesData.data);
    },[categoriesData]);

    useEffect(()=>{
        setStates(statesData.data);
    },[statesData]);

    useEffect(()=>{
        dispatch(fetchServicesThunk());
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
            !items.length>0 && !categories.length>0 && !states.length>0
            ? 
            <div className="layout-spinner"><LoadingSpinner/></div>
            : 
            <ServicesList
                states={states}
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

export default Services;
