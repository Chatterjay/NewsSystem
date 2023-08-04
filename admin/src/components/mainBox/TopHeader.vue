<script setup>
import { useStore } from "vuex";
import { Menu, User } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();
const headerCollapsed = () => {
  store.commit("changeCollapsed");
};

// 前往个人中心
const handleCenter = () => {
  router.push("/center");
};
// 退出登录
const handleLogout = () => {
  localStorage.removeItem("token");
  store.commit("clearUserInfo");
  router.push("/login");
};
</script>
<template>
  <el-header>
    <div class="left">
      <el-icon @click="headerCollapsed"> <Menu /> </el-icon
      ><span style="margin-left: 10px">管理系统</span>
    </div>
    <div class="right">
      <span>欢迎{{ $store.state.userInfo.username }}回来</span>
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon :size="25" color="#fff"><user /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<style lang="scss" scoped>
.el-header {
  background-color: #333;
  color: #fff;
  width: 100%;
  height: 60px;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left,
.right {
  display: flex;
}
.left {
  i {
    margin: auto;
    cursor: pointer;
  }
}
.right {
  .el-dropdown {
    margin: auto;
  }
}
</style>
