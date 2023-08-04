<script setup>
import Upload from "@/components/upload/Upload.vue";
import { ref, reactive } from "vue";
import { ElNotification } from "element-plus";
import upload from "@/util/upload";
import router from "@/router";

const UserFormRef = ref();
const UserForm = reactive({
  username: "",
  password: "",
  role: 2, // 默认为其他, 1为管理员
  introduction: "",
  avatar: "",
  file: null,
  gender: 0,
});
const UserFormRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  introduction: [{ required: true, message: "请输入个人简介", trigger: "blur" }],
  avatar: [{ required: true, message: "请上传头像", trigger: "blur" }],
});
const options = [
  {
    label: "管理员",
    value: 1,
  },
  {
    label: "其他用户",
    value: 2,
  },
];
const submitForm = () => {
  UserFormRef.value.validate(async (valid) => {
    if (valid) {
      // 提交后后端数据
      await upload("adminApi/user/add", UserForm);
      router.push("/user-manage/userList");
      ElNotification({
        title: "Success",
        message: "用户添加成功",
        type: "success",
        duration: 2000,
      });
      return;
    }
    ElNotification({
      title: "Error",
      message: "用户添加失败",
      type: "error",
      duration: 2000,
    });
  });
};
// 每次选择完图片后的回调
const handleChange = (file) => {
  UserForm.avatar = URL.createObjectURL(file);
  UserForm.file = file;
};
</script>
<template>
  <div>
    <el-page-header content="添加用户" icon="" title="用户管理" />

    <el-card>
      <template #header>
        <div class="card-header">
          <span>个人信息</span>
        </div>
      </template>
      <el-form
        ref="UserFormRef"
        :model="UserForm"
        :rules="UserFormRules"
        label-width="80px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="UserForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="UserForm.password" type="password" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="UserForm.role" placeholder="Select" style="width: 240px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="简介" prop="introduction">
          <el-input v-model="UserForm.introduction" type="textarea" />
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <Upload :avatar="UserForm.avatar" @changeHandel="handleChange" />
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm()" type="primary">添加用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.el-page-header {
  margin-bottom: 50px;
}
</style>
