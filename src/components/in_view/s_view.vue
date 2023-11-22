<template>
  <div class="app-container">
    <!-- 顶部导航栏 -->
    <TopHeader v-if="showHeader" />

    <!-- 页面内容区域插槽 -->
    <div class="content-container">
      <slot></slot>
    </div>

    <!-- 底部导航栏 -->
    <BottomFooter v-if="showFooter" />
  </div>
</template>

<script setup>
import TopHeader from "@/components/header/TopHeader.vue";
import BottomFooter from "@/components/footer/BottomFooter.vue";

const props = defineProps(["showHeader", "showFooter"]);


</script>

<style scoped>
/* 样式可以在这里定义 */
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 设置容器高度为视窗度 */
}

.content-container {
  flex: 1; /* 让内容区域占据剩余空间 */
}
</style>
