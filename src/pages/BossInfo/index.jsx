import React, { Component } from 'react'
import './index.css'
import { NavBar,Grid, List, InputItem, TextareaItem, Button, Toast } from 'antd-mobile'
import store from './../../store'
import { updateActopm } from './../../store/actionCreators'
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
      desc: ''
    }
  }
  // componentWillMount() {
  //   this.unsubscribe = store.subscribe(() => {
  //     title: 
  //   })
  // }
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
  handleGrid = (index) => {
    this.setState({
      pic: this.state.picArr[index].icon
    })
  }
  componentWillMount() {
    const picData = [
      {icon: require('./../../assets/images/boy.png'), text: 'boy'},
      {icon: require('./../../assets/images/bull.png'), text: 'bull'},
      {icon: require('./../../assets/images/chick.png'), text: 'chick'},
      {icon: require('./../../assets/images/crab.png'), text: 'crab'},
      {icon: require('./../../assets/images/girl.png'), text: 'girl'},
      {icon: require('./../../assets/images/hedgehog.png'), text: 'hedgehog'},
      {icon: require('./../../assets/images/hippopotamus.png'), text: 'hippopotamus'},
      {icon: require('./../../assets/images/koala.png'), text: 'koala'},
      {icon: require('./../../assets/images/lemur.png'), text: 'lemur'},
      {icon: require('./../../assets/images/man.png'), text: 'man'},
      {icon: require('./../../assets/images/pig.png'), text: 'pig'},
      {icon: require('./../../assets/images/tiger.png'), text: 'tiger'},
      {icon: require('./../../assets/images/whale.png'), text: 'whale'},
      {icon: require('./../../assets/images/woman.png'), text: 'woman'},
      {icon: require('./../../assets/images/zebra.png'), text: 'zebra'},
    ]
    this.setState({
      picArr: picData
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
    
    const { pic } = this.state 
    const title = pic ? (
      <div className='title'>
        已选择头像: <img src={pic} alt="" style={{width: 20}}/>
      </div>
    ) : (
      <p className='title'>请选择头像</p>
    )
    return (
      <div className='bosspage'>
        <NavBar
          mode="dark"
          className='bossBar'
        >请补充BOSS信息</NavBar>
        { title }
        <Grid data={this.state.picArr} columnNum={5}  onClick={(el, index) => this.handleGrid(index)} />
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
