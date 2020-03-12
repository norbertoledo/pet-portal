import React from 'react';
import { useDispatch } from 'react-redux';
import { loginThunk, signupThunk } from '../redux/thunks/authThunk';
import { Layout, Tabs } from 'antd';
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm';

import logo from '../assets/images/logo/logo_header.png';
import './scss/SignIn.scss';

export default function SignIn() {

    const { Content } = Layout;
    const { TabPane } = Tabs;
    const dispatch = useDispatch();
    
    const handleLogin = (payload) => {
        console.log('[SIGNIN: handleLogin]->', payload);       
        dispatch( loginThunk(payload) );
    }
    const handleSignup = (payload) => {
        console.log('[SIGNIN: handleSignup]->', payload);       
        dispatch( signupThunk(payload) );
    }


    return (
        <div>
            <Layout className="signin">
                <Content className="signin__content">
                    <h1 className="signin__content-logo">
                        <img src={logo} alt="Pet Portal"/>
                    </h1>
                    <div className="signin__content-tabs">
                        <Tabs type="card">
                            <TabPane tab={<span>Ingresar</span>} key="1">
                                <LoginForm handleSubmit={handleLogin}/>    
                            </TabPane>
                   
                            <TabPane tab={<span>Registrarse</span>} key="2">
                                <SignupForm handleSubmit={handleSignup}/>    
                            </TabPane>
                        </Tabs>
                    </div>
                    {/* <Row>
                        <Col span={12} offset={6}>
                            <LoginForm handleSubmit={handleSubmit}/>
                        </Col>
                    </Row>            */}

                </Content>
                
            </Layout>
        </div>
    )
}


/*
return (
        <div>
            <Layout>
                <Content>
                    <Row>
                        <Col span={12} offset={6}>
                            <LoginForm handleSubmit={handleSubmit}/>
                        </Col>
                    </Row>           

                </Content>
                
            </Layout>
        </div>
    )
*/