import React, { Component } from 'react'
import './index.css'
import { TabBar, NavBar } from 'antd-mobile'
import store from './../../store'
import {
  offLineMesAction
} from './../../store/actionCreators'
import { connect } from 'react-redux'

class TabHandF extends Component {
  componentDidUpdate() {
    this.props.getOffLineMsg(this.props.user_id)
  }
  render() {
    const { tabobj, pathname, redirectTo } = this.props
    let barTitle 
    tabobj.forEach(v => {
      if(v.path === pathname ){
        barTitle = v.title
      } 
    })
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
            badge={(v.text === '消息' && this.props.unread > 0) ? this.props.unread : ''}
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

const mapStateToprops = state => ({
  unread: state.unReadMsg,
  user_id: state.userInfo._id
})
const mapDispatchToProps = dispatch => ({
  getOffLineMsg: id => {
    dispatch(offLineMesAction({
      userId: id
    }))
  }
})
export default connect(mapStateToprops, mapDispatchToProps)(TabHandF)