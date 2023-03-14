<template>
  <div>
    {{ state.userName }}
  </div>
  <v-btn @click="handleClick">增加</v-btn>
  <div>
    123
  </div>
  <v-btn id="my-button">一个我的按钮</v-btn>
</template>

<script setup lang='ts'>
import { reactive } from 'vue';
import { userService } from '@/request/api';
import { userUrl } from '@/request/url';
// 定义一个状态对象
import { useAppStore } from '@/store/app';
// reactive创建双向绑定变量
// 创建一个该组件的状态对象
const state = reactive({
  userName: ''
})
// 实例化一个状态对象
const store = useAppStore();
// 解构并使数据具有响应式，即可以试试更新

// getUser()

function getUser() {
  try {
    userService.getUser(userUrl.get, '').then((resp: any) => {
      console.log(resp)
      state.userName = resp.data;
    })
  } catch (error) {
    console.log(error)
  }
}

// 组合式，直接新建方法名便可使用
function handleClick() {

}

</script>

<style lang="scss">
$btn: 100px;

#my-button {
  height: $button-height;
}

;

v-btn {
  color: blue;
}
</style>
