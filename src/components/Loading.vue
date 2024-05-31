<template>
    <div v-if="isLoading"
         class="flex justify-center items-center fixed left-[50%] top-[50%]">
        <van-loading type="spinner" />
    </div>
</template>

<script setup>
import { inject } from 'vue'
import loading from './loading.js'

// 注入 isLoading 状态
const isLoading = inject('isLoading');
</script>

<style scoped></style>
