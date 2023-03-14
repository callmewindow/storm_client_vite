// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// personal
import * as path from 'path'

// 额外维护一个config貌似没有必要
import { settings } from './src/config/index'

// const BASE_URL = process.env.NODE_ENV === 'development' ? '/api' : 'http://localhost:8080'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
  ],
  base: settings.base,
  define: { 'process.env': {} },
  resolve: {
    // 设置别名，避免后续引用时出现太多相对路径
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // 'assets': path.resolve(__dirname, 'src/assets'),
      // 'components': path.resolve(__dirname, 'src/components'),
      // 'config': path.resolve(__dirname, './src/config'),
      // 'router': path.resolve(__dirname, 'src/router'),
      // 'tools': path.resolve(__dirname, 'src/tools'),
      // 'views': path.resolve(__dirname, 'src/views'),
      // 'plugins': path.resolve(__dirname, 'src/plugins'),
      // 'store': path.resolve(__dirname, 'src/store'),
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  // 设置全局引用的样式表
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/scss/global.scss";`
      }
    }
  },
  build: {
    target: 'modules',
    outDir: 'dist',           // 指定输出路径
    assetsDir: 'static',      // 指定生成静态资源的存放路径
    minify: 'terser',         // 混淆器,terser构建后文件体积更小
    sourcemap: false,         // 输出.map文件
    terserOptions: {
      compress: {
        drop_console: true,   // 生产环境移除console
        drop_debugger: true   // 生产环境移除debugger
      }
    },
  },
  server: {
    // 是否主动唤醒浏览器
    open: true,
    // 占用端口
    port: settings.port,
    // 是否使用https请求
    https: settings.https,
    // 扩展访问端口
    host: settings.host,
    // 跨域问题处理
    proxy: settings.proxyFlag ? {
      '/api': {
        target: settings.backendUrl,  // 后台接口
        changeOrigin: true,               // 是否允许跨域
        // secure: false,                    // 如果是https接口，需要配置这个参数
        rewrite: (path: any) => path.replace(/^\/api/, ''),
      },
    } : {}
  }
})
