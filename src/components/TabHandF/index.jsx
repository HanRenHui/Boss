import React, { Component } from 'react'
import './index.css'
import { TabBar, NavBar } from 'antd-mobile'
export default class TabHandF extends Component {
  render() {
    
    const { tabobj, pathname, redirectTo } = this.props
    console.log(pathname)
    let barTitle 
    tabobj.forEach(v => {
      if(v.path === pathname ) barTitle = v.title
    })
    return (
      <div className='tabHandF'>
       <NavBar
          style={{position: 'fixed', top: 0, left: 0, width: '100%'}}
          className='navbar'
          mode="dark"
        >{ barTitle }</NavBar>
        <TabBar
          className='tab'
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="primary"
        >
          {tabobj.map((v, index) => (
          <TabBar.Item
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