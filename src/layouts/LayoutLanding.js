import React from 'react'
import {Route} from 'react-router-dom';
import './scss/LayoutLanding.scss'


export default function LayoutLanding(props) {
    const {routes} = props;
    return (
        <div className="layout-landing">
            <div className="layout-landing__content">
                <LoadRoutes routes={routes}/>
            </div>
            <div className="layout-landing__footer">
                <p>Pet Portal  |  ©2020  |  Norberto Ledo | DAM</p>
            </div>
        </div>
    );
}

function LoadRoutes ({routes}){
    //console.log(routes);
    return routes.map( (route, index) => (
        <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
        />));
}
