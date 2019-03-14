import LoginFirst from  './../pages/LoginFirst'
import Login from './../pages/Login'
import BossInfo from './../pages/BossInfo'
import UserInfo from './../pages/UserInfo'
import Boss from './../pages/Boss'
import User from './../pages/User'
import React from 'react'
import UserList from './../pages/UserList'
function BossList() {
  return <div>BossList</div>
}

function Chat() {
  return <div>Chat</div>
}
function Me() {
  return <div>Me</div>
}
const routes = [
  {
    path: '/',
    exact: true,
    component: LoginFirst
  },
  {
    path: '/login',
    exact: false,
    component: Login
  },
  {
    path: '/bossinfo',
    exact: false,
    component: BossInfo
  }, 
  {
    path: '/userinfo',
    exact: false,
    component: UserInfo
  },
  {
    path: '/user',
    exact: false,
    component: User,
    routes: [
      {
        path: '/user/list',
        exact: false,
        component: BossList
      },
      {
        path: '/user/chat',
        exact: false,
        component: Chat
      },
      {
        path: '/user/me',
        exact: false,
        component: Me
      },
    ]
  },
  {
    path: '/boss',
    exact: false,
    component: Boss,
    routes: [
      {
        path: '/boss/list',
        exact: false,
        component: UserList
      },
      {
        path: '/boss/chat',
        exact: false,
        component: Chat
      },
      {
        path: '/boss/me',
        exact: false,
        component: Me
      },
    ]
  }
]

export default routes 