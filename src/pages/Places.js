import React, {useState, useEffect, Suspense} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlacesThunk } from '../redux/thunks/placesThunk';
import LoadingSpinner from '../components/LoadingSpinner';
import { Layout, Tabs, notification } from 'antd';

export default function Places() {
    const { Content } = Layout;
    const { TabPane } = Tabs;
    const {isLoading, placesError, placesData} = useSelector(state=>state.places);
    const dispatch = useDispatch();
    const [places, setPlaces] = useState([]);
    
    useEffect(()=>{
        dispatch(fetchPlacesThunk());
    },[dispatch]);

    useEffect(()=>{
        setPlaces(placesData.data);
    },[placesData.data]);

    console.log("PLACES -> ", places);


    return (

        <Layout className="users">
            <Content className="users__content">
            {
                !places.length>0
                ? <div className="layout-spinner"><LoadingSpinner/></div>
                : <Suspense fallback={ <div><LoadingSpinner/></div> }></Suspense>
            }
                
                <div className="users__content-tabs">
                    <Tabs type="card">
                        <TabPane tab={<span>Lista de lugares</span>} key="1">
                            <div>
                                {
                                    places.map( (item,index ) => (
                                        <div key={index}>
                                            <h2>{item.title}</h2>
                                            <p>{item.description}</p>
                                            <p>{item.caption}</p>
                                            <p>{item.color}</p>
                                            <p>{item.latlng.lat}</p>
                                            <p>{item.latlng.long}</p>
                                            <img src={item.image} alt={item.title} className="img-responsive"/>
                                            <hr/>
                                        </div>
                                    ))
                                }
                            </div>
                        </TabPane>
                        <TabPane tab={<span>Crear nuevo lugar</span>} key="2">
                            
                        </TabPane>
                    </Tabs>
                </div>
            </Content>
        </Layout>
        
    )
}
