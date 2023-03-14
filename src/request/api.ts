import { get, post } from '@/request/index'

// 编写实际调用后端接口的请求，对变量进行内容调整与返回值返回

// 用户请求
const user = () => {
  const getUser = (url: string, params: any) => {
    return get(url, params)
  }
  const postUser = (url: string, params: any) =>{
    return post(url, params)
  }
  return {
    getUser, postUser
  }

}

// 权限请求
const permission =  () => {
  const login = (url: string, params: any) => {
    return get(url, params)
  }
  return {
    login
  }
}

const userService = user()
const permissionService = permission()

export { userService, permissionService }
