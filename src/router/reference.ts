// 提前引用有关组件，便于router进行直接引用

// 没有的vue文件自行创建引入即可
export const Hello = () => import('@/components/HelloWorld.vue')
export const Test = () => import('@/components/NewHello.vue')
export const Able = () => import('@/components/AbleTest.vue')
export const ttt = () => import('@/components/TempTest.vue')
// export const init = () => import('@/App copy.vue')

export const Root = ()=>import('@/layouts/lolipop/Default.vue')
export const Home = ()=>import('@/views/Home.vue')
