<template>
    <div class="">23333333</div>
</template>

<script setup>
import { inject, onMounted, ref, unref, getCurrentInstance } from 'vue'
import { useRouter, useRoute } from 'vue-router';

const $loading = inject('$loading');




onMounted(() => {
    $loading.open()
    setTimeout(() => {
        $loading.close()
    }, 3000);
    console.log('onMounted');
})
</script>

<style scoped></style>
