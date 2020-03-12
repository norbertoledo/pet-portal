import React from 'react';
import {Link} from 'react-router-dom';
import {Layout, Menu} from 'antd';
import './scss/MenuSider.scss';
import { 
    HomeOutlined, 
    CompassOutlined, 
    ShopOutlined, 
    TeamOutlined, 
    UnorderedListOutlined, 
    EnvironmentOutlined, 
    LinkOutlined, 
    MessageOutlined
} from '@ant-design/icons';

export default function MenuSider(props) {
    
    const {isCollapased} = props;
    const {Sider} = Layout;
    const {Item} = Menu;
    return (
        <Sider 
            className="menu-sider" 
            //-> Con icono del Bottom del sidebar
            collapsible 
            inlinecollapsed={isCollapased.toString()}
            //->Con Icono del MenuTop
            //collapsed={isCollapased}
            >
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["1"]}
            >
                <Item key="1">
                    <Link to={"/admin"}/>
                    <HomeOutlined />
                    <span className="nav-text">Homepage</span>
                </Item>
                <Item key="2">
                    <Link to={"/admin/users"}/>
                    <TeamOutlined />
                    <span className="nav-text">Usuarios</span>
                </Item>
                <Item key="3">
                    <Link to={"/admin/services"}/>
                    <ShopOutlined />
                    <span className="nav-text">Servicios</span>
                </Item>
                <Item key="4">
                    <Link to={"/admin/places"}/>
                    <EnvironmentOutlined />    
                    <span className="nav-text">Lugares</span>
                </Item>
                <Item key="5">
                    <Link to={"/admin/tips"}/>
                    <MessageOutlined />
                    <span className="nav-text">Tips</span>
                </Item>
                <Item key="6">
                    <Link to={"/admin/links"}/>
                    <LinkOutlined />
                    <span className="nav-text">Links</span>
                </Item>
                <Item key="7">
                    <Link to={"/admin/categories"}/>
                    <UnorderedListOutlined />
                    <span className="nav-text">Categorias</span>
                </Item>
                <Item key="8">
                    <Link to={"/admin/regions"}/>
                    <CompassOutlined />
                    <span className="nav-text">Provincias</span>
                </Item>
            </Menu>
        </Sider>
    )
}
