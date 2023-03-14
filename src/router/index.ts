import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// 基于reference加载有关页面
import * as page from '@/router/reference';
import {setRouterGuard} from '@/router/guard';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: page.Root,
    // children的内容会自动配置于父类的router-view中
    children: [
      {
        path: '', // 默认展示首页
        name: 'Home',
        component: page.Home,
      },
      {
        path: 'test',
        name: 'test',
        component: page.Test,
        // meta信息可以在路由守卫中被访问，今儿做一些处理
        meta: {
          title: '首页'
        }
      },
      {
        path: 'hello',
        name: 'hello',
        component: page.Hello,
        meta: {
          title: '测试'
        }
      },
      {
        path: '/able',
        name: 'able',
        component: page.Able,
        meta: {
          title: '测试222'
        }
      },
      {
        path: 'ttt',
        name: 'ttt',
        component: page.ttt,
      }
    ]
  },
  // 匹配未匹配的路由并批量导向
  // { path: '*',redirect: '/login' }
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 注意不能在set内部用use方法尝试获取路由
// 因为此时只是创建，还没有被加载，所以无法获取到
// 所以直接讲当前创建的路由传输进去即可
setRouterGuard(router)


export default router;
