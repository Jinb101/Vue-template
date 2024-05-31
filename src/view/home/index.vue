<template>
    <div class="">23333333</div>
</template>

<script setup>
import { inject, onMounted, ref, unref, getCurrentInstance } from 'vue'
import { useRouter, useRoute } from 'vue-router';

console.log(123);
// const { loading } = getCurrentInstance().appContext.config.globalProperties;


onMounted(() => {
    console.log('onMounted');
})
</script>

<style scoped></style>
