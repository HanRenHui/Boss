import React, { Component } from 'react'
import TabHandF from './../../components/TabHandF'
import { Route } from 'react-router-dom'
import io  from 'socket.io-client'


export default class User extends Component {
  redirectTo = path => {
    this.props.props.history.push(path)
  }
  componentDidMount() {
    let socket = io('ws://localhost:1888')
    socket.on('server message', data => {
      console.log(data)
    })
  }
  render() {
    const tabObj = [
      {
        title: 'BOSS列表',
        path: '/user/list',
        text: '大神',
        imgUrl: 'job',
        activeUrl: 'job-active'        
      },
      {
        title: '消息列表',
        path: '/user/chat',
        text: '消息' ,
        imgUrl: 'msg',
        activeUrl: 'msg-active'        
      },
      {
        title: '个人中心',
        path: '/user/me',
        text: '我的',
        imgUrl: 'user',
        activeUrl: 'user-active' 
      }
    ]
    return (
      <div className='boss'>
        <TabHandF 
            tabobj={tabObj} 
            pathname={this.props.props.location.pathname}
            redirectTo={this.redirectTo}
          />
        {this.props.routes.map((route, index) => (
          <Route
          path={route.path} 
          key={index} 
          exact={route.exact} 
          render={(props) => <route.component props={props} routes={route.routes} />}
         />
        ))}
        
      </div>  
    )
  }
}