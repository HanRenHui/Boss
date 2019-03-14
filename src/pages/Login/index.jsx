import React, { Component } from 'react'
import './index.css'
import { Button, Picker, List, Toast } from 'antd-mobile'
import { createForm } from 'rc-form';
import store from './../../store'
import {
  loginAction
} from './../../store/actionCreators'
class Login extends Component {
  constructor() {
    super()
    this.state = {
      // 记录是否登陆
      isLogin: 0,
      value: 0,
      // 记录注册者身份
      identity: 0,
      // 记录验证码
      captchaText: '',
      // 记录用户名
      username: '',
      // 记录密码
      password: '',
      flag: true
    }
  }

  onChange = (value) => {
    this.setState({
      value,
    });
  };
  // 记录注册者身份 1: 大神， 2: 老板

  handleOk = value => {
    this.setState({
      identity: value[0] + 1
    });
  }
  handleSubmit = e => {
    const {username, password, captchaText, identity} = this.state 
    if(!username || !password ||!captchaText || !identity) {
      return Toast.fail('请将表单填写完整', 1);
    }
    
     // 登陆
    store.dispatch(loginAction({
      username, 
      password,
      captchaText,
      identity,
    }))
  }

  // 对表单内容双向数据绑定
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
  // 二维码点击切换
  changeCaptcha = e => {
    e.target.src = `http://localhost:1888/captcha?time=${Math.random()}`
  }
  // 负责登陆后的页面跳转
  jumpTo = pagename => {
    if(store.getState().userInfo.isInit === 1) {
      // 直接进入页面
      this.props.props.history.push(`/${pagename}/list`)
    }else {
      // 完善具体信息
      this.props.props.history.push(`/${pagename}info`)
    }
  }
  redirect = () => {
    const { identity } = store.getState()
    if(identity === 1) {
      // redirect to userpage
      this.jumpTo('user')
    }else if(identity === 2) {
      // redirect to bosspage
      this.jumpTo('boss')
    }
  }
  componentWillMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        avatar: store.getState().avatar,
        message: store.getState().message,
        errCode: store.getState().errCode,
        Author: store.getState().Author
      }, () => {
        console.log(this.state.errCode);
        
        if(this.state.errCode === 0) {
          // 登陆成功\
          
          Toast.success(this.state.message)
          // 判断是老板还是大神， 然后判断是不是有头像 所以有四个页面
          this.redirect()

        } else if(this.state.errCode === 1 || this.state.errCode === 2){
          // 登陆失败
          Toast.fail(this.state.message)
          // 更新二维码
          this.refs.captcha.src = `http://localhost:1888/captcha?time=${Math.random()}`
          this.setState({
            captchaText: '',
            password: ''
          })
        }
      })
    })
  }
  componentWillUnmount() {
    this.unsubscribe()
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
          <form className='loginform'>
            <input type="text" onChange={ e =>  this.handleChange(e, 1)} value={username} placeholder='请输入用户名'/>
            <input type="password" onChange={ e =>  this.handleChange(e, 2)} value={password}  placeholder='请输入密码'/>
            <div className='captch'>
              <input type="text" onChange={ e =>  this.handleChange(e, 3)} value={captchaText} placeholder='请输入验证码'/>
              <img src="http://localhost:1888/captcha" ref='captcha'  onClick={e => this.changeCaptcha(e)} alt=""/>
            </div>
            <Picker  data={mydata} cols={1} {...getFieldProps('district3')} className="forss" onOk={e => this.handleOk(e)}>
              <List.Item arrow="horizontal" className='picker-item'>请选择身份</List.Item>
            </Picker>
            <Button type='primary' onClick={this.handleSubmit} className='login-btn'>登陆</Button>
            <Button className='back-btn'  onClick={() => this.props.props.history.push('/')}>返回</Button>
          </form>
          <p className='notice'>注意：新账号会自动注册</p>
          </div>
        </section>
      </div>
    )
  }
}

export default createForm()(Login);