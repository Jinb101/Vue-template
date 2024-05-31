import { ref, readonly } from 'vue';

// 创建一个响应式的 isLoading 状态
const isLoading = ref(false);

// 创建一个 open 方法来开启加载动画
const open = () => {
    console.log('loading open');
    isLoading.value = true;
};

// 创建一个 close 方法来关闭加载动画
const close = () => {
    isLoading.value = false;
};

// 导出 isLoading 状态和 open、close 方法
export default {
    isLoading: readonly(isLoading), // 使用 readonly 来防止外部直接修改 isLoading 状态
    open,
    close,
};
