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
      identity: -1,
      // 记录验证码
      captchaText: '',
      // 记录用户名
      username: '',
      // 记录密码
      password: '',
    }
  }

  onChange = (value) => {
    this.setState({
      value,
    });
  };
  // 记录注册者身份 0: 大神， 1: 老板

  handleOk = value => {
    console.log(value[0]);
    
    this.setState({
      identity: value[0]
    });
  }
  handleSubmit = e => {
    const {username, password, captchaText, identity} = this.state 

    console.log(username, password, captchaText, identity);
    
    e.preventDefault()
  }

  handleChange = (e, flag) => {
    let value = e.target.value
    switch(flag) {
      case 1: 
        this.setState({
          username: value
        })
        break;
      case 2: 
        this.setState({
          password: value
        })
        break;
      case 3:
        this.setState({
          captchaText: value
        })
        break;
      default:
        return;
    }
  }

  render() {
    const { getFieldProps } = this.props.form;
    let mydata = [
      {value: 0, label: '大神'},
      {value: 1, label: '老板'}
    ]
    const {username, password, captchaText} = this.state 
    return (
      
      <div className='login'>
        <header>
          <img src="https://static.zhipin.com/zhipin/v134/web/geek/images/logo-2x.png" style={{width: 280}} alt=""/>
        </header>
        <section className='login-body'>
          <div className='body-content'>
          <form onSubmit={e => this.handleSubmit(e)} className='loginform'>
            <input type="text" onChange={ e =>  this.handleChange(e, 1)} value={username} placeholder='请输入用户名'/>
            <input type="password" onChange={ e =>  this.handleChange(e, 2)} value={password}  placeholder='请输入密码'/>
            <div className='captch'>
              <input type="text" onChange={ e =>  this.handleChange(e, 3)} value={captchaText} placeholder='请输入验证码'/>
              <img src="http://localhost:1888/captcha" alt=""/>
            </div>
            <Picker  data={mydata} cols={1} {...getFieldProps('district3')} className="forss" onOk={e => this.handleOk(e)}>
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