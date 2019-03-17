import React, { Component } from 'react'
import './index.css'
import { TabBar, NavBar } from 'antd-mobile'
import store from './../../store'
import {
  offLineMesAction
} from './../../store/actionCreators'

export default class TabHandF extends Component {
  constructor() {
    super() 
    this.state = {
      unread: 0,
      userId: ''
    }
  }
  componentWillMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        unread: store.getState().unReadMsg,
        userId: store.getState().userInfo._id
      })
    })
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  componentDidMount() {
    store.dispatch(offLineMesAction())
  }
  render() {
    const { tabobj, pathname, redirectTo } = this.props
    let barTitle 
    tabobj.forEach(v => {
      if(v.path === pathname ){
        barTitle = v.title
      } 
    })
    let num = 0
    for(let i=0; i<this.state.unread.length; i++) {

      if((this.state.unread[i].from !== this.state.userId) && (!this.state.unread[i].read)) {
        num ++
      }
    }
    // console.log(this.state.unread);
    
    return (
      <div className='tabHandF'>
       <NavBar
          style={{position: 'fixed', top: 0, left: 0, width: '100%'}}
          className='navbar'
          mode="dark"
        >{ pathname !== '/boss/me' ? barTitle : '' }</NavBar>
        <TabBar
          className='tab'
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="#fff"
        >
          {tabobj.map((v, index) => (
          <TabBar.Item 
            badge={(v.text === '消息' && num > 0) ? num : ''}
            className='tabitem'
            title={v.text}
            key={index}
            icon={
              {uri: require(`./images/${v.imgUrl}.png`)}
            }
            selectedIcon={
              {uri: require(`./images/${v.activeUrl}.png`)}
            }
            selected={v.path === pathname}
            onPress={() => {
              redirectTo(v.path)
            }}
          >
            { v.text }
          </TabBar.Item>
          ))}
          
        </TabBar>
      </div>
    )
  }
}

