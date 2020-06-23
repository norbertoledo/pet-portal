import React from 'react';
import {Link, withRouter} from 'react-router-dom';
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
    MessageOutlined,
    ControlOutlined
} from '@ant-design/icons';

function MenuSider(props) {
    
    const {isCollapsed, location} = props;
    const {Sider} = Layout;
    const {Item} = Menu;

    //console.log(props);
    return (
        <Sider 
            className="menu-sider" 
            //-> Con icono del Bottom del sidebar
            collapsible 
            inlinecollapsed={isCollapsed.toString()}
            //->Con Icono del MenuTop
            //collapsed={isCollapased}
            >
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[location.pathname]}
            >
                <Item key="/admin">
                    <Link to={"/admin"}/>
                    <HomeOutlined />
                    <span className="nav-text">Homepage</span>
                </Item>
                <Item key="/admin/users">
                    <Link to={"/admin/users"}/>
                    <TeamOutlined />
                    <span className="nav-text">Usuarios</span>
                </Item>
                <Item key="/admin/services">
                    <Link to={"/admin/services"}/>
                    <ShopOutlined />
                    <span className="nav-text">Servicios</span>
                </Item>
                <Item key="/admin/places">
                    <Link to={"/admin/places"}/>
                    <EnvironmentOutlined />    
                    <span className="nav-text">Lugares</span>
                </Item>
                <Item key="/admin/tips">
                    <Link to={"/admin/tips"}/>
                    <MessageOutlined />
                    <span className="nav-text">Tips</span>
                </Item>
                <Item key="/admin/links">
                    <Link to={"/admin/links"}/>
                    <LinkOutlined />
                    <span className="nav-text">Links</span>
                </Item>
                <Item key="/admin/categories">
                    <Link to={"/admin/categories"}/>
                    <UnorderedListOutlined />
                    <span className="nav-text">Categorías</span>
                </Item>
                
                <Item key="/admin/states">
                    <Link to={"/admin/states"}/>
                    <CompassOutlined />
                    <span className="nav-text">Regiones</span>
                </Item>

                <Item key="/admin/roles">
                    <Link to={"/admin/roles"}/>
                    <ControlOutlined />
                    <span className="nav-text">Roles</span>
                </Item>
                
            </Menu>
        </Sider>
    )
}


export default withRouter(MenuSider);