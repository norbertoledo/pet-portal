import React, {useState, useEffect, Suspense} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLinksThunk } from '../redux/thunks/linksThunk';
import LoadingSpinner from '../components/LoadingSpinner';
import { Layout, Tabs, notification } from 'antd';

export default function Links() {

    const { Content } = Layout;
    const { TabPane } = Tabs;
    const {isLoading, linksError, linksData} = useSelector(state=>state.links);
    const dispatch = useDispatch();
    const [links, setLinks] = useState([]);
    
    useEffect(()=>{
        dispatch(fetchLinksThunk());
    },[dispatch]);

    useEffect(()=>{
        setLinks(linksData.data);
    },[linksData.data]);

    console.log("LINKS -> ", links);


    return (

        <Layout className="users">
            <Content className="users__content">
            {
                !links.length>0
                ? <div className="layout-spinner"><LoadingSpinner/></div>
                : <Suspense fallback={ <div><LoadingSpinner/></div> }></Suspense>
            }
                
                
                <div className="users__content-tabs">
                    <Tabs type="card">
                        <TabPane tab={<span>Lista de links</span>} key="1">
                            <div>
                                {
                                    links.map( (item,index ) => (
                                        <div key={index}>
                                            <h2>{item.title}</h2>
                                            <p>{item.description}</p>
                                            <p>{item.link}</p>
                                            <hr/>
                                        </div>
                                    ))
                                }
                            </div>
                        </TabPane>
                        <TabPane tab={<span>Crear nuevo link</span>} key="2">
                            
                        </TabPane>
                    </Tabs>
                </div>
            </Content>
        </Layout>
        
    )
}
