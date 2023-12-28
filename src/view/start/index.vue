<template>
    <div class=" h-full w-full custom-loading-svg"
         v-loading="loading"
         :element-loading-svg="svg"
         element-loading-text="Loading..."
         element-loading-svg-view-box="-10, -10, 50, 50"></div>
</template>

<script setup>
import { inject, onMounted, ref, unref } from 'vue'



const message = ref("");
const receivedMessage = ref("");


const loading = ref(true)
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `


const createFingerprint = () => {
    // 浏览器指纹
    const fingerprint = Fingerprint2.get((components) => { // 参数只有回调函数时，默认浏览器指纹依据所有配置信息进行生成
        const values = components.map(component => component.value); // 配置的值的数组
        const murmur = Fingerprint2.x64hash128(values.join(''), 31); // 生成浏览器指纹
        const newValue = CryptoJS.SHA256(murmur).toString(CryptoJS.enc.Hex).substring(0, 8); // 生成 12 位哈希值
        console.log(components);
        console.log(values);
        console.log(murmur);
        console.log(newValue);
        localStorage.setItem('browserId', murmur); // 存储浏览器指纹，在项目中用于校验用户身份和埋点
    });
}





</script>

<style scoped >
.example-showcase .el-loading-mask {
    z-index: 9;
}
</style>
