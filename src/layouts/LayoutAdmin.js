import React, {useState, useEffect, useCallback, Suspense} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import {Layout} from 'antd';


import './scss/LayoutAdmin.scss';
import MenuTop from '../components/MenuTop';
import MenuSider from '../components/MenuSider';


import { checkIsLogged, logoutThunk } from '../redux/thunks/authThunk';
import LoadingSpinner from '../components/LoadingSpinner';


const LayoutAdmin = props => {
    
    const { Header, Content, Footer } = Layout;
    const { routes } = props;

    const [isCollapased, setIsCollapsed] = useState(false);
    
    const {isLogged, isLoading} = useSelector(state=>state.auth);

    const dispatch = useCallback(useDispatch(),[]);


    const handleToggleMenu = ()=>{
        console.log('colapso o abro');
        setIsCollapsed(!isCollapased);
    }
    
    const handleLogout = ()=>{
        console.log("logout")
        dispatch( logoutThunk() );
    }


    useEffect(()=>{
        dispatch( checkIsLogged() );
    },[dispatch]);


 
    return(
        <>
            {
                isLoading 
                ? <div className="layout-spinner"><LoadingSpinner/></div>
                : <Suspense fallback={ <div><LoadingSpinner/></div> }>

                    {
                        !isLogged
                        ? <>
                            <Redirect to="/admin/login" />
                            <Layout className="layout-signin">
                                <Content className="layout-signin__content">
                                    { routes.map((route, index)=>(
                                        <RouteWithSubRoutes key={index} {...route}/>
                                    ))}
                                </Content>
                                <Footer className="layout-signin__footer">
                                    Pet Portal  |  © 2020  |  Norberto Ledo - Proyecto Final DAM
                                </Footer>
                            </Layout>
                        </>
                        : <>
                            <Redirect to="/admin" />
                            <Layout>
                    
                                <MenuSider isCollapased={isCollapased}/>
                    
                                <Layout className="layout-admin">
                                    
                                    <Header className="layout-admin__header">
                                        <MenuTop
                                            handleToggleMenu={handleToggleMenu}
                                            handleLogout={handleLogout}
                                            isCollapased={isCollapased}
                                        />
                                    </Header>
                                    
                                    <Content className="layout-admin__content">
                                        { routes.map((route, index)=>(
                                            <RouteWithSubRoutes key={index} {...route}/>
                                        ))}
                                    </Content>

                                    <Footer className="layout-admin__footer">
                                        Pet Portal  |  © 2020  |  Norberto Ledo - Proyecto Final DAM
                                    </Footer>

                                </Layout>
                    
                            </Layout>
                        </>
                    }
                </Suspense>
            }
        
        </>
    );


}
const RouteWithSubRoutes = (route)=>{

    return(
      <Route
        path={route.path}
        exact={route.exact}
        render={props => <route.component routes={route.routes} {...props}/>}
      />
    )
  }

export default LayoutAdmin;
