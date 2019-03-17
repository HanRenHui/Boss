import React, { Component } from 'react'
import TabHandF from './../../components/TabHandF'
import { Route } from 'react-router-dom'
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
    if(!store.getState().isSocket2) {
      store.dispatch({
        type: 'initsocket'
      })
      socket.on('server message', data => {
        store.dispatch(unreadAction(data))
      })
    }
  }
  
  render() {
    
    const tabObj1 = [
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
    const tabObj2 = [
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
    let pathname = this.props.props.location.pathname
    let tabobj 
    if(pathname.includes('/boss')) {
      tabobj = tabObj1
    }else if(pathname.includes('/user')) {
      tabobj = tabObj2
    }
    
    return (
      
      <div className='boss'>

        <TabHandF 
            tabobj={tabobj} 
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