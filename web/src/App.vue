<script setup>
import NavBar from "@/components/Navbar.vue";
</script>
<template>
  <div>
    <NavBar />
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
// 滚动条优化
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  position: absolute;
}
::-webkit-scrollbar-track {
  background: #1890ff;
}
::-webkit-scrollbar-thumb {
  background-color: #ddd;
}
</style>
