import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)


export default new Vuex.Store({
  state: {//全局共享的数据
    uname: "" || localStorage.getItem('uname'),
  },
  mutations: {//所有修改去哪聚共享数据函数
    setUname(state, uname) {
      state.uname = uname;
      // 把登录名存放在localStorage
      localStorage.setItem('uname', uname)
    },
  },
  actions: {
    // 学生登录
    login(context, user) { //context代表整个vuex对象
      (async function () {
        var result = await axios.get("/login", {
          params: user
        });
        context.commit("setUname", result.data.uname);
        // console.log(result.data.uname)
        // console.log(result)
      })()
    },
    // 管理员登录
    login1(context, user) { //context代表整个vuex对象

      (async function () {
        var result = await axios.get("/login1", {
          params: user
        });
        context.commit("setUname", result.data.uname);
        console.log(result.data.uname)
        console.log(result)
      })()
    }
  },
  getters: {
    uname: (state) => state.username
  },
  modules: {
  }
})
