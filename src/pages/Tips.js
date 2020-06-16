import React, {useState, useEffect, Suspense} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTipsThunk } from '../redux/thunks/tipsThunk';
import LoadingSpinner from '../components/LoadingSpinner';

import { Layout, notification } from 'antd';

export default function Tips() {
    const { Content } = Layout;
    const {isLoading, tipsError, tipsData} = useSelector(state=>state.tips);
    const dispatch = useDispatch();
    const [tips, setTips] = useState([]);
    
    useEffect(()=>{
        dispatch(fetchTipsThunk());
    },[dispatch]);

    useEffect(()=>{
        setTips(tipsData.data);
    },[tipsData.data]);

    console.log("TIPS -> ", tips);


    return (

        <Layout className="users">
            <Content className="users__content">
            {
                !tips.length>0
                ? <div className="layout-spinner"><LoadingSpinner/></div>
                : <Suspense fallback={ <div><LoadingSpinner/></div> }></Suspense>
            }
                
                <div>
                    {
                        tips.map( (item,index ) => (
                            <div key={index}>
                                <h2>{item.title}</h2>
                                <p>{item.description}</p>
                                <p>{item.link}</p>
                                <hr/>
                            </div>
                        ))
                    }
                </div>
            </Content>
        </Layout>
        
    )
}
