import React, { Component } from 'react'
import './index.css'
import store from './../../store'
import {
  List,
  InputItem,
  TextareaItem,
  Button,
  Toast,
  Modal
} from 'antd-mobile'
import {
  logout
} from './../../api'
import {
  logoutAction
} from './../../store/actionCreators.js'
const alert = Modal.alert;
export default class Me extends Component {
  logout = () => {
    // 清空state数据
    store.dispatch(logoutAction())
    //清空服务端的session
    logout().then(data => {
      this.props.props.history.push('/')
      Toast.success('退出成功')
    })
  }
  render() {
    const userInfo = store.getState().userInfo || {}
    const { Author=''} = store.getState()
    const bossobj = [
      {
        title: '公司名称',
        content: userInfo.company
      }, 
      {
        title: '招聘薪资',
        content: userInfo.money
      },
      {
        title: '招聘职位',
        content: userInfo.title
      },
    
    ]
    const userobj = [
      {
        title: '应聘职位',
        content: userInfo.title
      },
      {
        title: '理想薪资',
        content: userInfo.money
      },
    ]
    let obj
    if(store.getState().identity === 1) {
      obj = userobj
    }else if(store.getState().identity === 2) {
      obj = bossobj
    } else {
      obj = []
    }
    return (
      <div className='me'>
        <header>
          <div className="left">
            <div className='infobox'>
              <h3>{Author}</h3>
              <p>我的个人主页👉</p> 
            </div>
          </div>
          <div className='right'>
            <img src={userInfo.avatar} alt="avatar"/>
          </div>
        </header>
        <ul className='unlessul'>
          <li>
            <span className='num'><strong>3</strong> </span>
            <span className='text'>沟通过</span>
          </li>
          <li>
            <span className='num'><strong>0</strong></span>
            <span className='text'>面试</span>
          </li>
          <li>
            <span className='num'><strong>0</strong></span>
            <span className='text'>已投递</span>
          </li>
          <li>
            <span className='num'><strong>3</strong></span>
            <span className='text'>感兴趣</span>
          </li>
        </ul>
        <p className='personal'>简介</p>
        <List>
        {obj.map((item, index) => (
          <InputItem
            key={index}
            value={item.content}
            disabled
          >{item.title}</InputItem>
        ))}
          <TextareaItem
            title='个人简介'
            data-seed="logId"
            autoHeight
            value={userInfo.desc}
            disabled
            ref={el => this.customFocusInst = el}
          />
        </List>
        <Button
          className='logout'
          type='primary'
          onClick={() =>
            alert('退出登录', '您确定要退出么???', [
              { text: 'Cancel', onPress: () => console.log('cancel') },
              { text: 'Ok', onPress: this.logout },
            ])
          }
        >
          退出登录
        </Button>

      </div>
    )
  }
}