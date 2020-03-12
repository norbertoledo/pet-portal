import React from 'react';
import {Button} from 'antd';
import {
    PoweroffOutlined
  } from '@ant-design/icons';

import './scss/MenuTop.scss'
import Logo from '../assets/images/logo/logo_header.png'

export default function MenuTop(props) {

    const {handleLogout} = props;

    
    return (
        <div className="menu-top">
            <div className="menu-top__left">
                <img className="menu-top__left-logo" src={Logo} alt="Pet Portal"/>
            </div>
            <div className="menu-top__right">
                <Button type="link" onClick={handleLogout}>
                    logout
                    <PoweroffOutlined />
                </Button>
            </div>
        </div>
    )
}
