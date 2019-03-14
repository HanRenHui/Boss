import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import AutoRoute from './components/AutoRoute'
// import 
import routes from './routes/routes'

export default class App extends Component {


  render() {
    return (
      <Router>
        <div>
        {/* 用来做自动登陆 */}
        <AutoRoute />
          <Switch>
            {routes.map((route , index) => (
              <Route 
                key={index}
                path={route.path} 
                exact={route.exact}  
                render={(props) => (<route.component routes={route.routes} props={props}/>)} 
              />
            ))}
            {/* 匹配落单路由 */}
          </Switch>
        </div>
      </Router>
    )
  }
}
