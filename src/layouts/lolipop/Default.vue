<template>
  <v-app>
    <v-main>
      <Navigator />

      <!-- 在多个组件间动态切换时缓存被移除的组件实例 -->
      <!-- <keep-alive> -->
      <router-view :key="$route.path" v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component"></component>
        </transition>
      </router-view>
      <!-- </keep-alive> -->

    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Navigator from '@/components/Navigator.vue'
</script>
