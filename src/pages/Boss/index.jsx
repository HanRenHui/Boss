import React, { Component } from 'react'
import TabHandF from './../../components/TabHandF'
import { Route } from 'react-router-dom'
import UserList from './../UserList'
import io from 'socket.io-client'
import store from './../../store'
import {
  unreadAction
} from './../../store/actionCreators'
const socket = io('ws://localhost:1888')

export default class Boss extends Component {
  redirectTo = path => {
    this.props.props.history.push(path)
  }
  componentDidMount() {
    socket.on('server message', data => {
      // 未读数加一
      store.dispatch(unreadAction(data))
      
    })
  }
  render() {
    
    const tabObj = [
      {
        title: '大神列表',
        path: '/boss/list',
        text: '大神',
        imgUrl: 'job',
        activeUrl: 'job-active'        
      },
      {
        title: '消息列表',
        path: '/boss/chat',
        text: '消息' ,
        imgUrl: 'msg',
        activeUrl: 'msg-active'        
      },
      {
        title: '个人中心',
        path: '/boss/me',
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