import React, { Component } from 'react'
import './index.css'
import { Button } from 'antd-mobile'
export default class LoginFirst extends Component {
  render() {
     return (
      <div className='loginfirst'>
        <section className='login-top'>
          <p>请先登录</p>
          <Button className='mybtn' onClick={() => {this.props.props.history.push('/login')}} >点击登陆</Button>
        </section>
        <section className='login-bottom'>
          <img src="https://static.zhipin.com/zhipin/v134/web/geek/images/logo-2x.png" alt=""/>
        </section>
      </div>
    )
  }
}