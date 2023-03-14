/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import 'vuetify/styles'

// icon

// 基于mdi/font
import '@mdi/font/css/materialdesignicons.css'
//
import { aliases, mdi} from 'vuetify/iconsets/mdi'

// Composables
import { createVuetify } from 'vuetify'

// 使用
// import colors from 'vuetify/lib/util/color'

// mdi/js power 暂时使用原生font进行图标的使用
// import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
// import { mdiAccount } from '@mdi/js'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      // 声明亮暗主题
      light: {
        dark: false,
        // 不包含在内的属性会保持原本的值
        colors: {
          // primary: colors.deepPurple.accent4,
          primary: '#1867C1',
          secondary: '#5CBBF6',
        },
      },
      dark: {
        dark: true,
        colors: {
          // primary: colors.lightBlue,
          primary: '#ffffff',
        }
      }
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...aliases,
      // account: mdiAccount,
    },
    sets: {
      mdi,
    },
  },
})
