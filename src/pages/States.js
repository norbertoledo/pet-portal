import React, {useState, useEffect, Suspense} from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { fetchStatesThunk } from '../redux/thunks/statesThunk';
import LoadingSpinner from '../components/LoadingSpinner';
import { Layout, Tabs, notification } from 'antd';

export default function States() {
    
    const { Content } = Layout;
    const { TabPane } = Tabs;
    const {isLoading, statesError, statesData} = useSelector(state=>state.states);
    //const dispatch = useDispatch();
    const [states, setStates] = useState([]);
    
    /*
    useEffect(()=>{
        dispatch(fetchStatesThunk());
    },[dispatch]);
    */

    useEffect(()=>{
        setStates(statesData.data);
    },[statesData.data]);

    console.log("STATES -> ", states);


    return (

        <Layout className="users">
            <Content className="users__content">
            {
                !states.length>0
                ? <div className="layout-spinner"><LoadingSpinner/></div>
                : <Suspense fallback={ <div><LoadingSpinner/></div> }></Suspense>
            }
                
                
                <div className="users__content-tabs">
                    <Tabs type="card">
                        <TabPane tab={<span>Lista de regiones</span>} key="1">
                            <div>
                                {
                                    states.map( (item,index ) => (
                                        <div key={index}>
                                            <h2>{item.name}</h2>
                                            <p>{item.latlng.lat}</p>
                                            <p>{item.latlng.long}</p>
                                            <hr/>
                                        </div>
                                    ))
                                }
                            </div>
                        </TabPane>
                        <TabPane tab={<span>Crear nueva región</span>} key="2">
                            
                        </TabPane>
                    </Tabs>
                </div>
            </Content>
        </Layout>
        
    )
}
