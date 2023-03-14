/*
  管理用户有关信息
  例如用户token、用户名、用户权限等等

  author wyx
*/

import { defineStore } from 'pinia'
import { updateHeadersCommon } from '@/request/index'

const visitor: UserInfo = {
  token: '',
  name: '游客',
  age: 0,
  isAdmin: true,
  avatar: ''
};

export const useUserStore = defineStore('user', {
  // 初始化为游客
  state: (): UserInfo => visitor,
  getters: {
    // loggedIn: state => state.token && state.token !== null,
    loggedIn: () => true,
  },
  // 相比vuex中同步更新store的mutations和异步处理业务的actions
  // pinia将他们进行了合并，因此有关方法均在actions进行即可
  actions: {
    updateToken(token: string) {
      this.token = token
    },

    updateUserInfo(userInfo: UserInfo) {
      // 直接重制
      this.$state = userInfo
      // this.userInfo = userInfo
    },

    logout() {
      this.$state = visitor
      updateHeadersCommon({})
    },

    loadAdmin() {
      // 发送请求确认是否是管理员
      // const adminResponse = await ReportAPI.isCurrentUserAdmin()
      // const isAdmin = adminResponse.data
      const isAdmin = true;
      this.isAdmin = isAdmin;
    },

    // 解析token来进行有关用户信息的初始化
    async resolveToken(payload: any) {
      if (payload === undefined) {
        // Load stored token and username
        const localToken = localStorage.getItem('token')
        if (!localToken || !localToken.length || localToken === 'null') {
          this.logout()
          return
        }
        const localUsername = localStorage.getItem('username')
        this.token = localToken
        this.name = localUsername ? localUsername : 'null';
        updateHeadersCommon({ Authorization: localToken })
        await this.loadAdmin()
      } else if (payload === null) {
        // Seen as logging out
        this.logout()
      } else {
        // 正常流程
        const { token, username } = payload
        this.token = token
        this.name = username
        updateHeadersCommon({ Authorization: token })
        await this.loadAdmin()
      }
    },

  },
  // 持久存储后便可以将所有内容自动放置在本地存储中进行持久保存？
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user',
        storage: localStorage,
      },
    ],
  },
})
