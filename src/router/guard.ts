// 路由守卫，切换路由时进行处理
import { Router, RouteLocationNormalized } from "vue-router"
import { useUserStore } from "@/store/user"
// import Snackbar from '@/utils/snackbar'
// import { siteTitle } from "@/config/strings";

// 判断当前路由是否可达
function canRouteAccess(to: RouteLocationNormalized): boolean {
  // 如果没有匹配的导航则返回false
  if (to.matched.length === 0) return false;
  return true;
}

export function setRouterGuard(router: Router) {
  // 每次导航最开始工作的全局守卫
  router.beforeEach((to, from, next) => {
    // 这里的to和from均是格式化后的路由路径，类型为RouteLocationNormalized，包含路径、查询、meta等诸多内容
    // next可以看做一个导航方法，默认执行会前往to

    // 处理不可到达的路由
    const canAccess = canRouteAccess(to)
    if (!canAccess) return '/notfound'

    // 处理无权限的情况
    const userStore = useUserStore();
    console.log(useUserStore())
    const loggedIn = userStore.loggedIn;
    if (
      // 检查用户是否已登录
      !loggedIn &&
      // ! 避免无限重定向
      // (to.name !== 'Login' && to.name !== 'Home')
      // 基于meta处理需要登录和不需要登录的
      !to.matched.some(record => record.meta.noAuthRequired)
    ) {
      // 显示提示栏
      // Snackbar.emitsInfo(`欢迎来到${siteTitle}，要继续访问此内容，请先登录`)
      // 将用户重定向到登录页面
      // 携带to的信息，便于登录后前往对应页面
      next({ name: 'Login', query: { redirect: to.path } })
      // return { name: 'Login' }
    } else {
      // 否则正常进行（next之后方法还会进行，所以必须放在else里）
      next();
    }
    // 返回值控制本次导航是否执行
    // return true
  })

  // 等待所有组件内首位和异步路由组件被解析后才工作的解析守卫
  // router.beforeResolve((to,from) =>{})

  // 后置守卫，会在导航完成后开始工作，无法改变导航结果，但是可以访问结果
  router.afterEach((to, from, failure) => {
    if (failure) console.log(to, from)
  })

  // 捕获路由异常
  // router.
}
