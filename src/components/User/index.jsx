import React, { Component } from 'react'

export default class User extends Component {
  handleClick = id => {
    console.log(this.props.history.push(`/chats/${id}`));
    
  }
  render() {
    const { list } = this.props
    return (
      <div onClick={id => this.handleClick(list._id)}  className='user'>
        <div className='mycard'>
            <div className="card-header">
              <div className="card-header-left">
                <img src={list.avatar} alt=""/>
                <span>{list.title}</span>
              </div>
              <div className="card-header-right">{list.money}</div>
            </div>
            <div className="card-body">
              {list.desc.split('\n').map((d, key) => (
                <div key={key}>{d}</div>
              ))}
            </div>
          </div>
      </div>
    )
  }
}