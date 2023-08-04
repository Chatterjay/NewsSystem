<script setup>
import TopHeader from "@/components/mainBox/TopHeader";
import SideMenu from "@/components/mainBox/SideMenu";
</script>
<template>
  <el-container>
    <SideMenu />
    <el-container direction="vertical">
      <!-- 手动改成垂直布局 -->
      <TopHeader />
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.el-main {
  overflow: auto;
  height: calc(100vh - 60px);
}
</style>