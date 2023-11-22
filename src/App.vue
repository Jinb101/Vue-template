<script setup>
import { defineAsyncComponent } from 'vue';
import { RouterView } from 'vue-router';

const AsyncRouterView = defineAsyncComponent(() => import('vue-router').then(m => m.RouterView));
</script>

<template>
  <div id="app">
    <s_view>
        <AsyncRouterView />
    </s_view>
  </div>
</template>

<style scoped>

</style>
