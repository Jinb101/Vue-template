<script setup>
import { RouterView } from 'vue-router';
import loading from '@com/Loading.vue';
// 提供 isLoading 状态
</script>

<template>
    <div id="app">
        <loading></loading>
        <RouterView />
    </div>
</template>

<style scoped></style>
