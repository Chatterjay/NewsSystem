import { createRouter, createWebHashHistory } from 'vue-router'
import Login from "@/views/Login.vue"
import MainBox from "@/views/MainBox.vue"
import routersConfig from './config'
import store from "@/store/index"
const routes = [
  {
    path: "/login",
    name: 'login',
    component: Login
  },

]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

function ConfigRouter() {
  // 判断是否有manBox路由
  if (!router.hasRoute('mainBox')) {
    router.addRoute({
      path: "/mainBox",
      name: 'mainBox',
      component: MainBox,
    })
  }


  // 动态为mainBox创建路由
  routersConfig.forEach((item) => {
    checkPermission(item) && router.addRoute("mainBox", item)
  })
  // 改变isGetterRouter状态
  store.commit("changeGetterRouter", true)
}

function checkPermission(item) {
  if (item.requireAdmin) {
    return store.state.userInfo.role === 1
  }
  return true
}

router.beforeEach((to, form, next) => {
  if (to.name === 'login') {
    next()
    return
  }
  // 判断是否授权 否则回转到登录界面
  if (!localStorage.getItem('token')) {
    next({
      path: '/login'
    })
    return
  }
  // 判断是否是第一次登录
  if (!store.state.isGetterRouter) {
    // 删除所有的嵌套路由
    router.removeRoute('mainBox')
    ConfigRouter()
    // 因为进入后路由不会马上生效 此处是重新定向到当前(刷新)
    next({
      path: to.fullPath
    })
    return
  } else {
    next()
  }
})


export default router
