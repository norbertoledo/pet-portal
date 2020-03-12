import React from 'react'
import { Row, Col, Layout, Button } from 'antd';
import logo from '../assets/images/logo/logo_landing.svg';
import logoGoogle from '../assets/images/stores/logo_google.png';
import logoApple from '../assets/images/stores/logo_apple.png';
import './scss/Landing.scss';

export default function Landing() {
    return (
        <Layout className="landing">
            
            <Row className="landing__header">
                <Col className="landing__col">
                    <img src={logo} alt="Pet Portal"/>
                </Col>
            </Row>

            <Row className="landing__description">
                <Col className="landing__col">
                    <h2>¿Que te ofrecemos?</h2>
                    <Row>

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum officiis perferendis harum laudantium ipsam quasi, perspiciatis ab aspernatur, quo magnam dolore corrupti at eum. Ratione ea unde vel eos iste.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum officiis perferendis harum laudantium ipsam quasi, perspiciatis ab aspernatur, quo magnam dolore corrupti at eum. Ratione ea unde vel eos iste.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum officiis perferendis harum laudantium ipsam quasi, perspiciatis ab aspernatur, quo magnam dolore corrupti at eum. Ratione ea unde vel eos iste.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum officiis perferendis harum laudantium ipsam quasi, perspiciatis ab aspernatur, quo magnam dolore corrupti at eum. Ratione ea unde vel eos iste.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum officiis perferendis harum laudantium ipsam quasi, perspiciatis ab aspernatur, quo magnam dolore corrupti at eum. Ratione ea unde vel eos iste.</p>
                    </Row>
                </Col>
            </Row>
            
            <Row className="landing__download">
                <Col className="landing__col">        
                    <h2>Descarga la App de Pet Portal</h2>
                    <Row className="landing__download-logos">
                        <Col span={{ xs:24, md:12}} className="landing__download-logo">
                           
                                <img src={logoGoogle} alt="Pet Portal - Play Store"/>
                           
                        </Col>
                        <Col span={{ xs:24, md:12}} className="landing__download-logo">
                           
                                <img src={logoApple} alt="Pet Portal - Apple Store"/>
                           
                        </Col>
                    </Row>
                </Col>
            </Row>
            
        </Layout>
    )
}
