<script setup>
import {
  HomeFilled,
  Avatar,
  UserFilled,
  MessageBox,
  Reading,
  Pointer,
} from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import store from "@/store";

const route = useRoute();
// 仅对管理员显示 添加完成后进入路由配置 requireAdmin
const vAdmin = {
  mounted(e) {
    if (store.state.userInfo.role !== 1) {
      e.parentNode.removeChild(e);
      return;
    }
  },
};
</script>

<template>
  <el-aside :width="$store.state.isCollapse ? '64px' : '200px'">
    <el-menu
      :collapse="$store.state.isCollapse"
      :collapse-transition="false"
      :router="true"
      :default-active="route.fullPath"
    >
      <!--:default-active="route.fullPath" 获取路由并且对侧边栏进行高亮-->
      <el-menu-item index="/index">
        <el-icon>
          <HomeFilled />
        </el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/center">
        <el-icon>
          <Avatar />
        </el-icon>
        <span>个人中心</span>
      </el-menu-item>
      <el-sub-menu index="/user-manage" v-admin>
        <template #title>
          <el-icon>
            <UserFilled />
          </el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item index="/user-manage/addUser">添加用户</el-menu-item>
        <el-menu-item index="/user-manage/userList">用户列表</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/news-manage">
        <template #title>
          <el-icon>
            <MessageBox />
          </el-icon>
          <span>新闻管理</span>
        </template>
        <el-menu-item index="/news-manage/addNews">添加新闻</el-menu-item>
        <el-menu-item index="/news-manage/newsList">新闻列表</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/product-manage">
        <template #title>
          <el-icon>
            <Reading />
          </el-icon>
          <span>产品管理</span>
        </template>
        <el-menu-item index="/product-manage/addProduct">添加产品</el-menu-item>
        <el-menu-item index="/product-manage/productList">产品列表</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<style lang="scss" scoped>
.el-aside {
  height: 100vh;

  .el-menu {
    height: 100vh;
  }
}
</style>
