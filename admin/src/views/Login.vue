<script setup>
import router from "@/router";
import { reactive, ref } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
import store from "@/store";

// 表单响应式对象
const loginForm = reactive({
  username: "",
  password: "",
});

// 表单引用对象
const loginFormRef = ref();

// 表单规则
const loginRules = reactive({
  username: [
    {
      required: true,
      message: "请输入正确的用户名",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入正确的密码",
      trigger: "blur",
    },
  ],
});

// 提交表单函数
const resetForm = async () => {
  // 1. 校验表单 2. 获取表单内容提交后台 3. 设置token
  await loginFormRef.value.validate((valid) => {
    if (valid) {
      axios.post("/adminApi/user/login", loginForm).then((res) => {
        if (res.data.ActionType === "OK") {
          store.commit("changeUserInfo", res.data.data);
          store.commit("changeGetterRouter", false);
          router.push("/index");
          return;
        }
        ElMessage({
          showClose: true,
          message: "用户名或密码不正确.",
          type: "error",
        });
      });
    }
  });
};
</script>
<template>
  <div class="formContainer">
    <h3>管理面板</h3>
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      status-icon
      :rules="loginRules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm()">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.formContainer {
  width: 500px;
  height: 300px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgba(35, 39, 46, 0.4);
  color: #fff;
  text-align: center;
  border-radius: 20px;
  padding: 20px;

  h3 {
    font-size: 30px;
    margin-bottom: 20px;
  }
}

/* vue的深度选择器  */
::v-deep .el-form-item__label {
  color: #fff;
}
</style>
