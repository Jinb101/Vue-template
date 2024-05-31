import { defineConfig } from 'vite';
import path from 'path-browserify'; //vite 写法 esm 模式
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import legacy from '@vitejs/plugin-legacy';
import AutoImport from 'unplugin-auto-import/vite'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
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
        // isCustomElement: (tag) => tag === 's-view',
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


        },
    },
    build: {
        minify: 'terser',
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
