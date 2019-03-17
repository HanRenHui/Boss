import LoginFirst from  './../pages/LoginFirst'
import Login from './../pages/Login'
import BossInfo from './../pages/BossInfo'
import UserInfo from './../pages/UserInfo'
import Boss from './../pages/Boss'
import BossList from './../pages/BossList'
import Me from './../pages/Me'
import Chat from './../pages/Chat'
import ChatList from './../pages/ChatList'
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
    path: '/boss',
    exact: false,
    component: Boss,
    routes: [
      {
        path: '/boss/list',
        exact: false,
        component: BossList
      },
      {
        path: '/boss/chat',
        exact: false,
        component: ChatList
      },
      {
        path: '/boss/me',
        exact: false,
        component: Me
      },
    ]
  },
  {
    path: '/user',
    exact: false,
    component: Boss,
    routes: [
      {
        path: '/user/list',
        exact: false,
        component: BossList
      },
      {
        path: '/user/chat',
        exact: false,
        component: ChatList
      },
      {
        path: '/user/me',
        exact: false,
        component: Me
      },
    ]
  },
  {
    path: '/chats/:id',
    component: Chat,
    exact: false
  }
]

export default routes 