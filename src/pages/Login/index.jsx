import React, { Component } from 'react'
import './index.css'
import { Button, Picker, List } from 'antd-mobile'
import { createForm } from 'rc-form';
class Login extends Component {
  constructor() {
    super()
    this.state = {
      value: 0,
      // 记录注册者身份
      identity: 0
    }
  }

  onChange = (value) => {
    this.setState({
      value,
    });
  };
  handleSubmit = () => {

  }

  handleChange = (e, flag) => {

  }
  // 记录注册者身份 0: 大神， 1: 老板
  handlePick = val => {
    console.log(val[0]);
    this.setState({
      identity: val[0]
    })
  }
  render() {
    const { getFieldProps } = this.props.form;
    let mydata = [
      {value: 0, label: '大神'},
      {value: 1, label: '老板'}
    ]
    return (
      <div className='login'>
        <header>
          <img src="https://static.zhipin.com/zhipin/v134/web/geek/images/logo-2x.png" style={{width: 280}} alt=""/>
        </header>
        <section className='login-body'>
          <div className='body-content'>
          <form onSubmit={this.handleSubmit} className='loginform'>
            <input type="text" onChange={ e =>  this.handleChange(e, 1)} placeholder='请输入用户名'/>
            <input type="password" onChange={ e =>  this.handleChange(e, 2)}  placeholder='请输入密码'/>
            <input type="text" onChange={ e =>  this.handleChange(e, 3)} placeholder='请输入验证码'/>
            <Picker  data={mydata} cols={1} {...getFieldProps('district3')} className="forss" onChange={val => this.handlePick(val)}>
              <List.Item arrow="horizontal" className='picker-item'>请选择身份</List.Item>
            </Picker>
            <Button type='primary' className='login-btn'>登陆</Button>
            <Button className='back-btn' onClick={() => this.props.props.history.push('/')}>返回</Button>
          </form>
            
          </div>
        </section>
      </div>
    )
  }
}

export default createForm()(Login);