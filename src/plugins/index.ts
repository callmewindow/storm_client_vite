/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from '@/plugins/webfontloader'
import vuetify from '@/plugins/vuetify'
// 由于这里是同时引用的，所以可能
import pinia from '@/store'
import router from '@/router'

import piniaPluginPersist from 'pinia-plugin-persist'
pinia.use(piniaPluginPersist)

// Types
import type { App } from 'vue'

// 自动将依赖下有关内容加载到vue中
// 先加载pinia，确保router可以获取到store的值？
// 不太行，以为需要等到app搭建完毕才会加载pinia
export function registerPlugins (app: App) {
  loadFonts()
  app
    .use(vuetify)
    .use(pinia)
    .use(router)
}
