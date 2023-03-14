<template>
  <nav>
    <!-- <v-app-bar density="prominent" shrink-on-scroll :elevate-on-scroll="userStore.loggedIn" :flat="!userStore.loggedIn" app fixed
      fade-img-on-scroll> -->
    <!-- app-bar的滚动检测能力暂时还没有迁移过来，就离谱，具体可见依赖库 -->
    <v-app-bar>
      <template v-slot:image>
        <!-- 为图片下部分增加蒙版，不影响内容显示 -->
        <v-img :src="appStore.navImg !== '' ? appStore.navImg : theme.current.value.dark ? '/bgd.jpg' : '/bgl.png'"
          :gradient="
            theme.current.value.dark
              ? 'to top, rgba(66,66,66,1), rgba(66,66,66,.5)'
              : 'to top, rgba(255,255,255,1), rgba(255,255,255,.5)'
          " />
      </template>

      <v-app-bar-nav-icon @click="drawerShow = !drawerShow" />
      <v-toolbar-title class="font-weight-bold">{{ title }}</v-toolbar-title>

      <div class="flex-grow-1" />

      <!-- 注意只有增加icon标记，内部的icon才会被按照icon的slot解析成正常大小 -->
      <v-btn icon @click="switchDarkTheme">
        <v-icon>mdi-invert-colors</v-icon>
      </v-btn>

      <!-- <v-menu v-if="userStore.loggedIn" offset-y transition="slide-x-reverse-transition" :close-on-content-click="false">
        <template v-slot:activator="{ on }">
          <v-btn icon text v-on="on">
            <v-badge color="red" overlap>
              <template v-slot:badge v-if="messageNum">
                <span>{{ messageNum }}</span>
              </template>
              <v-icon dark>mdi-bell</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-card class="pl-3 pt-2 pr-3 pb-2 elevation-20" style="overflow: scroll; z-index: 100 !important;"
          min-height="250" max-width="550">
          <NotifCenter />
        </v-card>
      </v-menu> -->

      <v-btn v-if="userStore.loggedIn" class="ml-3" icon :to="{ name: 'Home', params: { id: 0 } }">
        <v-avatar color="primary" size="46">
          <v-img :src="userStore.avatar || '/default-avatar.jpg'" />
        </v-avatar>
      </v-btn>

    </v-app-bar>

    <v-navigation-drawer v-model="drawerShow" app temporary hide-overlay>
      <v-list-item cla :title="siteTitle"></v-list-item>

      <v-divider />

      <v-list nav>

        <v-list-item v-for="item in navItems" :key="item.title" link :to="item.to" exact>
          <template v-slot:prepend>
            <v-icon>{{ item.icon }}</v-icon>
          </template>

          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>

        <v-list-item v-if="userStore.isAdmin" link :to="{ name: 'Home' }" exact>
          <template v-slot:prepend>
            <v-icon>mdi-security</v-icon>
          </template>
          <v-list-item-title>处理举报</v-list-item-title>
        </v-list-item>

      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn @click="logoutOrLogin" block>
            {{
              userStore.loggedIn ? 'Logout' : 'Login'
            }}
          </v-btn>
        </div>
      </template>

    </v-navigation-drawer>

  </nav>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { useRouter } from "vue-router"  // 引入useRouter
import { useTheme } from 'vuetify' // 引入主题控制


import { useAppStore } from '@/store/app'
import { useUserStore } from '@/store/user'
import { siteTitle } from '@/config/strings'
// import * as LoginAPI from '../APIs/login'
// import NotifCenter from './NotifCenter'
// import * as NotifAPI from '../APIs/notification'

// 定义当前组件可接收的参数，可被直接使用
// 但要想声明变量类型，该方法不能通过泛型来声明，而需要调整声明方式为泛型
// 具体声明方式和接口类似
const props = defineProps<{
  position?: string
}>()
// 或者可以利用withDefault方法来进行基于泛型的声明

// emit相当于接收传进来的函数

const router = useRouter()
const theme = useTheme()

const appStore = useAppStore()
const userStore = useUserStore()

// 因为reactive只对对象类型有效，即对象、数组和 Map、Set 这样的集合类型
// 对 string、number 和 boolean 这样的 原始类型 无效，因此需要用ref
// 响应式变量声明类型可通过泛型进行
// let messageNum = ref<number>(5);
let drawerShow = ref<boolean>(false);
let timer = ref<any>(null);

// js没有interface，必须制定语言为ts
interface navItem {
  title: string
  icon: string
  to: object
}
const navItems = reactive<navItem[]>([
  { title: 'Today', icon: 'mdi-compass', to: { name: 'Home' } },
  {
    title: '搜寻',
    icon: 'mdi-magnify',
    to: { name: 'Home' },
  },
  {
    title: '小组列表',
    icon: 'mdi-account-group',
    to: { name: 'able' },
  },
  { title: '话题广场', icon: 'mdi-flower', to: { name: 'test' } },
]);

// 计算属性声明
// 声明类型通过泛型实现
const title = computed<string>(() => appStore.title);
const checkLoginIn = computed<string>(() => userStore.token);

// 监听是否登陆状态的变化
watch(checkLoginIn, (newVal) => {
  if (newVal !== 'null') {
    updateNotifCount()

    // update notifications every minute
    if (timer.value !== null) clearInterval(timer.value)
    timer.value = setInterval(() => {
      updateNotifCount()
    }, 60000)
  } else {
    clearInterval(timer)
  }
},)

async function updateNotifCount() {
  return;
  // const response = await NotifAPI.getNotifCount()
  // this.messageNum = response.data
}

function logoutOrLogin() {
  if (userStore.loggedIn) {
    // LoginAPI.logout()
    document.location.replace('/')
  } else {
    router.push({ name: 'Login' })
  }
}

function switchDarkTheme() {
  theme.global.name.value = theme.current.value.dark ? 'light' : 'dark'
  // localStorage.setItem('dark', value ? 'y' : '')
}

</script>
