import React from 'react';
import { useDispatch } from 'react-redux';
import { signupThunk } from '../redux/thunks/authThunk';
import { Layout } from 'antd';
import { Row, Col } from 'antd';
import LoginForm from '../components/SignupForm'


export default function Signup() {

    const { Content } = Layout;

    const dispatch = useDispatch();
    
    const handleSubmit = (payload) => {

        console.log('[SIGNUP: handleSubmit]->', payload);
        
        dispatch( signupThunk(payload) );
    }


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
}
