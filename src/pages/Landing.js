import React from 'react'
import { Row, Col, Layout } from 'antd';
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
                    <p>Pet Portal es una aplicación móvil con el objetivo brindar información y servicios a lus usuarios y así a satisfacer las necesidades relacionadas con el mantenimiento y cuidado de las mascotas.</p>
                    <p>Además de la información proporcionada por el portal, la idea es crear una comunidad donde los profesionales relacionados de alguna manera con los animales tengan un lugar para promover su trabajo y ofrecer sus servicios.</p>
                    <p>Pet Portal posee una interfaz amigable e intuitiva con la vital intención de alcanzal la información requerida sin hacer demasiados pasos.</p>
                    <p>Pueden disfrutar de Pet Portal de forma gratuita, descargando la aplicación móvil desde los stores.</p>
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
