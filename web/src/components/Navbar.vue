<script setup>
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

const handelClick = () => {
  window.location = 'http://localhost:8081/';
};
</script>

<template>
  <div class="navbar">
    <el-menu :default-active="route.fullPath" :router="true" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/news">新闻中心</el-menu-item>
      <el-menu-item index="/product">产品与服务</el-menu-item>
      <el-menu-item index="" @click="handelClick()">登录</el-menu-item>
    </el-menu>
    <div class="right">官网</div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 999;
}

.right {
  position: fixed;
  top: 0;
  right: 20px;
  height: 59px;
  widows: 100px;
  line-height: 59px;
  text-align: center;
  cursor: pointer;
}
</style>
