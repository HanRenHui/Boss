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
        <AutoRoute />
          <Switch>
            {/* 用来做自动登陆 */}
            {routes.map((route , index) => (
              <Route 
                key={index}
                path={route.path} 
                exact={route.exact}  
                render={(props) => (<route.component routes={route.routes} props={props}/>)} 
              />
            ))}
          </Switch>
        </div>
      </Router>
    )
  }
}
