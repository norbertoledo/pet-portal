import React from 'react'
import logo from '../assets/images/logo/logo_admin_light.png';
import { Row, Col, Layout } from 'antd';
import './scss/Admin.scss';
export default function Admin() {
    return (
        <Layout className="admin">
            <Row className="admin__content">   
                <Col className="admin__logo">
                    <img src={logo} alt="Pet Portal"/>
                </Col>
                <Col className="admin__message">
                    <h2>Bienvenidos al panel de administración</h2>
                </Col>
                
            </Row>
        </Layout>
    )
}
