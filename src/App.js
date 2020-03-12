import React from 'react';
import {Route, Switch} from 'react-router-dom';
import routes from './config/routes';
import './App.scss';


function App() {

  return (
    <div className="app">
 
     <Switch>
        { routes.map((route, index)=>(
          <RouteWithSubRoutes key={index} {...route}/>
        ))}
      </Switch>
          
    </div>
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

export default App;
