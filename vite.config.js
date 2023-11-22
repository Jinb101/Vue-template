// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
// })
import { defineConfig } from 'vite';
import path from 'path-browserify'; //vite 写法 esm 模式
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [VantResolver()], // 按需加载vant 组件
        }),
    ],
    base: './',
    // // 静态资源服务的文件夹，默认public
    publicDir: 'public',
    // 自定义组件
    compilerOptions: {
        isCustomElement: (tag) => tag === 's-view',
      },
    resolve: {
        alias: {
             '@': path.resolve('src'),
             '@/com': path.resolve('src/components'),
        },
    },

    css: {
        // 引入 autoprefixer
        postcss: {
            plugins: [
                // require('autoprefixer')
            ],
        },
        // 引入全局 scss
        preprocessorOptions: {
            scss: {
                additionalData: "@import './src/assets/styles/common.scss';",
            },
        },
    },
    server: {
        // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
        host: 'localhost',
        port: 8101, // 服务器端口号
        open: false, // 是否自动打开浏览器
        // 代理
        proxy: {
            '/api': {
                target: 'http://test.official.jsxrk.xin/api',
                changeOrigin: true,
                pathRewrite: {
                  '^/api': '/'// 重写,
                }
              },
              '/env': {
                target: 'http://official.jsxrk.xin/api',
                changeOrigin: true,
                pathRewrite: {
                  '^/env': '/'
                }
              }
        },
    },
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
          // 生产环境配置
          // ...
        } else {
          // 开发环境配置
          // ...
        }
    },
});
