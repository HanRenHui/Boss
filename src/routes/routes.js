import LoginFirst from  './../pages/LoginFirst'
import Login from './../pages/Login'
import BossInfo from './../pages/BossInfo'
import UserInfo from './../pages/UserInfo'
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
    path: '/boss',
    exact: false,
    component: BossInfo
  }, {
    path: '/user',
    exact: false,
    component: UserInfo
  }
]

export default routes 