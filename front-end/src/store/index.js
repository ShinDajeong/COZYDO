import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    email: '',
    userNickname: '',
    userIdx: '',
    //     accessToken:null,
    loginChk: false,
  },
  getters: {
    //   getAccessToken(state) {
    //     if (localStorage.accessToken && typeof localStorage.accessToken != "undefined")
    //         return localStorage.accessToken;
    //     else
    //         return state.accessToken;
    //     }
    // ,
    getLoginChk(state) {
      if (localStorage.loginChk) return localStorage.loginChk
      return state.loginChk
    },
    getEmail(state) {
      console.log('로그인 email')
      if (localStorage.email) return localStorage.email
      return state.email
    },
    getUserIdx(state) {
      console.log('로그인 userIdx')
      if (localStorage.userIdx) return localStorage.userIdx
      return state.userIdx
    },
    getUserName(state) {
      console.log("state.userNicname은"+state.userNickname)
      if (localStorage.userNickname) return localStorage.userNickname
      return state.userNickname
    },
  },
  mutations: {
    // payload 가 response
    LOGIN(state, payload) {
      // state.accessToken = accessToken
      if (payload['status'] === false) {
        // 로그인 실패
        console.log('로그인 실패')
        this.loginChk = false
      } else {
        console.log('로그인 성공')
        state.loginChk = true
        //   state.accessToken = payload["auth-token"];
        state.email = payload['object'].email;
        localStorage.email = state.email
        state.userNickname = payload['object'].nickname;
        localStorage.userNickname = state.userNickname
        state.userIdx = payload['object'].idx
        console.log(payload['object'].idx)
        console.log(state.userIdx)
        localStorage.userIdx = state.idx
        //   localStorage.accessToken = state.accessToken;
      }
    },
    LOGOUT(state) {
      // state.accessToken = null;
      state.userNickName = ''
      localStorage.clear()
      state.loginChk = false
    },
  },
  actions: {
    LOGIN(context, user) {
      return axios({
        method: 'post',
        url: 'https://i4a201.p.ssafy.io:8080/user/login',

        params: {
          email: user.email,
          password: user.password,
        },
      }).then((response) => {
        context.commit('LOGIN', response.data)
        // axios
        //     .defaults
        //     .headers
        //     .common["auth-token"] = `${response
        //     .data["auth-token"]}`;
      })
    },
    LOGOUT(context) {
      context.commit('LOGOUT')
      // axios
      //     .defaults
      //     .headers
      //     .common["auth-token"] = undefined;
    },
  },
  modules: {},
})
