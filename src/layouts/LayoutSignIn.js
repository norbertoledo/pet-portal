import React from 'react'
import {Route} from 'react-router-dom';
import './scss/LayoutSignIn.scss'


export default function LayoutSignIn(props) {
    const {routes} = props;

    return (
        <div>
            <LoadRoutes routes={routes}/>
        </div>
    )
}

function LoadRoutes ({routes}){

    return routes.map( (route, index) => (
        <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
        />));
}
