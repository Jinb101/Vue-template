import { defineConfig } from 'vite';
import path from 'path-browserify'; //vite 写法 esm 模式
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import legacy from '@vitejs/plugin-legacy';
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
          }),
          Components({
            resolvers: [ElementPlusResolver()],
          }),
        legacy({
            targets: ['defaults', 'not IE 11']
          })
    ],
    // 打包路径设置
    base: process.env.NODE_ENV === 'production' ? './' : '/',
    // // 静态资源服务的文件夹，默认 public
    publicDir: 'public',
    // 自定义组件
    compilerOptions: {
        isCustomElement: (tag) => tag === 's-view',
      },
    resolve: {
        alias: {
            '@': path.resolve('./src'),
        },
    },

    css: {
        // 引入 autoprefixer
        postcss: {
            plugins: [tailwindcss, autoprefixer],
        },
        // 引入全局 scss
        preprocessorOptions: {
            scss: {
                // additionalData: "@import './src/assets/styles/common.scss';",
            },
        },
    },
    server: {
        // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
        host: '0.0.0.0',
        port: 8101, // 服务器端口号
        open: false, // 是否自动打开浏览器
        // 代理
        proxy: {
            '/socket': {
                //webSocket 代理
                  target: 'ws://121.43.179.182:2347',
                  ws:true,//开启 ws, 如果是 http 代理此处可以不用设置
                  changeOrigin: true,
                  pathRewrite: {
                    '^/socket': ''
                  },
                  bypass(req, res, options) {
                    const proxyUrl = new URL((options.pathRewrite[req.url] || ''), options.target).href || '';
                    console.log(proxyUrl);
                    console.log(req.url); // 打印完整的请求地址
                    req.headers['x-req-proxy'] = proxyUrl;
                    res.setHeader('x-res-proxy', proxyUrl + req.url);
                  },
                }
            // '/dev': {
            //     pathRewrite: {
            //         '^/dev': ''  // 将/api 替换为空字符串，确保代理时能够正确匹配路径
            //       },
            //     target: 'http://test.lide.jsxrk.xin',
            //     changeOrigin: true,
            //     logLevel: 'debug',
            //     bypass(req, res, options) {
            //         const proxyUrl = new URL((options.pathRewrite[req.url] || ''), options.target).href || '';
            //         console.log(proxyUrl);
            //         console.log(req.url); // 打印完整的请求地址
            //         req.headers['x-req-proxy'] = proxyUrl;
            //         res.setHeader('x-res-proxy', proxyUrl + req.url);
            //       },
            //   },
            //   '/env': {
            //     target: 'http://lide.jsxrk.xin',
            //     changeOrigin: true,
            //     logLevel: 'debug',
            //     pathRewrite: {
            //       '^/env': ''// 重写，
            //     }
            //   },
        },
    },
    build: {
        minify:'terser',
        outDir: "./dist",
        //emptyOutDir: true,
        //assetsDir: "assets", //指定静态资源存放路径
        // sourcemap: false, //是否构建 source map 文件
        terserOptions: {
          // 生产环境移除 console
          compress: {
            drop_console: false,
            drop_debugger: true,
          },
        },
        // 块大小警告的限制（以 kbs 为单位）默认：500
        chunkSizeWarningLimit: 1000,
        // 分解块，将大块分解成更小的块
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (id.includes('node_modules')) {
                return id.toString().split('node_modules/')[1].split('/')[0].toString();
              }
            },
            chunkFileNames: (chunkInfo) => {
              const facadeModuleId = chunkInfo.facadeModuleId
                ? chunkInfo.facadeModuleId.split('/')
                : [];
              const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]';
              return `js/${fileName}/[name].[hash].js`;
            }
          }
        },
      },
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'env') {
          // 生产环境配置
          // ...
        } else {
          // 开发环境配置
          // ...
        }
    },
});
