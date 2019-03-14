import React, { Component } from 'react'
import './index.css'
import { NavBar, List, InputItem, TextareaItem, Button, Toast } from 'antd-mobile'
import store from './../../store'
import { updateActopm } from './../../store/actionCreators'
import AvatarInfo from './../../components/AvatarInfo'
export default class BossInfo extends Component {
  constructor() {
    super() 
    this.state = {
      // 记录已选择头像的地址
      pic: '',
      // 招聘职位
      title: '',
      // 公司名
      company: '',
      // 招聘薪资
      money: '',
      // 对职位的要求
      desc: '',
      info: {}
    }
  }
 
  handleSubmit = () => {
    const { pic, title, company, money, desc} = this.state 
    if(!pic) {
      return Toast.info('请先选择头像', 1)
    }else if(!title || !company || !money || !desc) {
      return Toast.info('请将表单填写完整', 1)
    }
    store.dispatch(updateActopm({
      pic,
      company, 
      money,
      desc,
      title
    }))

  }
  handleGrid = (data) => {
    this.setState({
      pic: data
    })
  }
  componentWillMount() {
    
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        pic: store.getState().avatar,
        info: store.getState().userInfo ? 
              store.getState().userInfo: {}
      }, () => {
        this.props.props.history.push('/boss/list')
      })
    })
  }
  onChange = (type, val) => {
    switch(type){
      case 'title':
        this.setState({
          title: val
        })
        break
      case 'company':
        this.setState({
          company: val
        })
        break
      case 'money': 
        this.setState({
          money: val
        })
        break
      case 'desc':
        this.setState({
          desc: val
        })
        break
      default : 
        return 
    }
  }

  render() {
    
    
    return (
      <div className='bosspage'>
        <NavBar
          mode="dark"
          className='bossBar'
        >请补充BOSS信息</NavBar>
        <AvatarInfo handleGrid={this.handleGrid}/>
        <List style={{marginTop: 30}} >
          <InputItem onChange={v => this.onChange('title', v)}>招聘职位</InputItem>
          <InputItem onChange={v => this.onChange('company', v)}>公司名称</InputItem>
          <InputItem onChange={v => this.onChange('money', v)}>招聘薪资</InputItem>
          <TextareaItem autoHeight title='职位要求' onChange={v => this.onChange('desc', v)}/>
        </List>
        <Button className='saveBtn' onClick={this.handleSubmit}>保存</Button>
      </div>
    )
  }
}
