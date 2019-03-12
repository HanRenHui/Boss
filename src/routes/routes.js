import LoginFirst from  './../pages/LoginFirst'
import Login from './../pages/Login'
import BossInfo from './../pages/BossInfo'
import UserInfo from './../pages/UserInfo'
import Boss from './../pages/Boss'
import User from './../pages/User'

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
    component: User
  },
  {
    path: '/boss',
    exact: false,
    component: Boss
  }
]

export default routes 