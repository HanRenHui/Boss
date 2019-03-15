import React, { Component } from 'react'
import store from './../../store'
import './index.css'
import User from './../../components/User'
import {
  bosslistAction
} from './../../store/actionCreators'
export default class BossList extends Component {
  constructor() {
    super()
    this.state = {
      bossList: []
    }
  }
  componentWillMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        bossList: store.getState().bossList
      })
    })
  }
  componentDidMount() {
    store.dispatch(bosslistAction())
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  render() {
    
    return (
      <div className='bosslist'>
          {this.state.bossList.map((list, index) => (
          <User list={list} index={index} key={index} id={list._id} history={this.props.props.history}/>
          ))}
      </div>
    )
  }
}