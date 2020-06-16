import React, {useState, useEffect, Suspense} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServicesThunk } from '../redux/thunks/servicesThunk';
import LoadingSpinner from '../components/LoadingSpinner';
import { Layout, notification } from 'antd';

const Services = () => {
    const { Content } = Layout;
    const {isLoading, servicesError, servicesData} = useSelector(state=>state.services);
    const dispatch = useDispatch();
    const [services, setServices] = useState([]);
    
    useEffect(()=>{
        dispatch(fetchServicesThunk());
    },[dispatch]);

    useEffect(()=>{
        setServices(servicesData.data);
    },[servicesData.data]);

    console.log("SERVICES -> ", services);


    return (

        <Layout className="users">
            <Content className="users__content">
            {
                !services.length>0
                ? <div className="layout-spinner"><LoadingSpinner/></div>
                : <Suspense fallback={ <div><LoadingSpinner/></div> }></Suspense>
            }
                
                <div>
                    {
                        services.map( (item,index ) => (
                            <div key={index}>
                                <h2>{item.name}</h2>
                                <p>{item.description}</p>
                                <p>{item.address}</p>
                                <p>{item.phone}</p>
                                <p>{item.website}</p>
                                <p>{item.state}</p>
                                <p>{item.category}</p>
                                <p>{item.latlng.lat}</p>
                                <p>{item.latlng.long}</p>
                                <img src={item.thumb} alt={item.title} className="img-responsive"/>
                                <img src={item.image} alt={item.title} className="img-responsive"/>
                                <hr/>
                            </div>
                        ))
                    }
                </div>
            </Content>
        </Layout>
        
    )
}

export default Services;
