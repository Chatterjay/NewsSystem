import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"

export default createStore({
  state: {
    // $router 判断是否是第一次登录
    isGetterRouter: false,
    // $SideMenu 侧边栏是否折叠
    isCollapse: false,
    // $Login 存储用户数据
    userInfo: {}
  },
  getters: {
  },
  mutations: {
    changeGetterRouter(state, value) {
      state.isGetterRouter = value
    },
    changeCollapsed(state) {
      state.isCollapse = !state.isCollapse
    },
    changeUserInfo(state, value) {
      state.userInfo = {
        ...state.value, // 展开旧的数据
        ...value // 合并新的数据
      }
    },
    // 清除持久化数据
    clearUserInfo(state, value) {
      state.userInfo = {}
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    // 控制是否持久化
    paths: ["isCollapse", "userInfo"]
  })]
})
