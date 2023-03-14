<script setup lang="ts">
import { ref } from 'vue'
import { mdiAccount } from '@mdi/js'

defineProps<{ msg: string }>()

// const msg = "测试内容"
// msg = "测试内容"
const count = ref(0)
// const mdiAccount = mdiAccount
</script>

<template>
    123
    <div style="color:red">
        abc
        <v-icon icon="mdi:mdi-home" />
        <v-icon color="red"> mdiAccount </v-icon>
        <v-icon color="blue" icon="mdi-account"></v-icon>
        <v-icon color="black" icon="mdi-vuetify"></v-icon>
    </div>
    <h1>{{ msg }}</h1>

    <div class="card">
        <button type="button" @click="count++">count is {{ count }}</button>
        <p>
            Edit
            <code>components/HelloWorld.vue</code> to test HMR
        </p>
    </div>

    <p>
        Check out
        <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite
        starter
    </p>
    <p>
        Install
        <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
        in your IDE for a better DX
    </p>
    <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
    color: #888;
}

.v-icon {
    color: red;
}
</style>
