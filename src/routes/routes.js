import LoginFirst from  './../pages/LoginFirst'
import Login from './../pages/Login'
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
  }
]

export default routes 