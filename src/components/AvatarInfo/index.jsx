import React, { Component } from 'react'
import {
  Grid 
} from 'antd-mobile'
export default class AvatarInfo extends Component {
  constructor() {
    super() 
    this.state = {
      pic: ''
    }
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

  render() {
    const { pic } = this.props 
    const title = pic ? (
      <div className='title'>
        已选择头像: <img src={pic} alt="" style={{width: 20}}/>
      </div>
    ) : (
      <p className='title'>请选择头像</p>
    )
    return (
      <div>
        { title }
        <Grid 
          data={this.state.picArr} 
          columnNum={5}  
          onClick={(el, index) => this.props.handleGrid(this.state.picArr[index].icon)} 
        />
      </div>

    )
  }
}