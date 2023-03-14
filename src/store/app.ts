/*
  管理整体应用的信息
  例如页面标题，头部图片

  author wyx
*/

// Utilities
import { defineStore } from 'pinia'
// import { piniaPluginPersist } from '@/plugins/piniaPersist'
import { siteTitleInFull } from '@/config/strings'

// defineStore可声明一个数据仓库
// 第一个字符串为不可重复的仓库ID，第二个为对象形式的仓库配置
export const useAppStore = defineStore('app', {
  // 保存当前项目的有关属性，全局记录，类似data
  state: () => {
    return {
      title: siteTitleInFull, // 当前页标题
      navImg: '' as string,
      snackbar: {
        display: false,
        content: '',
        color: 'info',
      } as SnackbarOption,
    }
  },
  // 可声明特殊属性，相当于computed
  // 这里的每一个内容都是一个变量
  getters: {},
  // 可声明针对属性的操作方法
  // 封装处理数据的函数（业务逻辑)：同步异步请求，更新数据

  // 甚至可以直接引用pinia的storeToRef方法，直接在页面进行内容的修改
  actions: {
    updateTitle(title: string) {
      this.title = title
    },

    /**
     * When the option is not specified, then the function defaultedly assumes that a snackbar is to be
     * displayed, and hence you must provide a `content` and a `color` option. Otherwise the function
     * will throw an exception. When no option is provided, then the function will hide the current
     * snackbar.
     */
    updateSnackbar(option: SnackbarOption | null) {
      this.snackbar.display = false
      if (option != null) {
        if (option.content == undefined || option.color == undefined)
          throw new Error('Incorrect parameters in the option provided.')
        setTimeout(() => {
          this.snackbar.display = true
          this.snackbar.content = option.content
          this.snackbar.color = option.color
        }, 100)
      }
    },

    updateNavImg(img: string) {
      this.navImg = img
    },
  },

  // 持久化，可选用localStorage或者sessionStorage
  // persist: piniaPluginPersist('app'),
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'app',  //自定义 Key值
        storage: localStorage,  // 选择存储方式
      },
    ],
  },
})
