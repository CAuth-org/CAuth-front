import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from "path"; // 需要引入 path

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src") // 配置 `@` 指向 `src/`
    }
  },
  server: { // 修正为 server
    proxy: {
      '/api': {
        target: 'http://localhost:8080',  // 后端 API 服务器地址
        changeOrigin: true,  // 允许跨域
        rewrite: (path) => path.replace(/^\/api/, ''),  // 重写路径，将 /api 去掉
      },
    },
  },
})
