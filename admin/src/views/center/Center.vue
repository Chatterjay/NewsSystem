<script setup>
import store from "@/store";
import { computed, reactive, ref } from "vue";
import { ElNotification } from "element-plus";
import upload from "@/util/upload";
import Upload from "@/components/upload/Upload";
import config from "@/config/pageConfig";

const { username, gender, introduction, avatar } = store.state.userInfo;
const changeUserFormRef = ref();
const changeUserForm = reactive({
  username,
  gender,
  introduction,
  avatar,
  file: null,
});
const changeUserFormRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
  role: [{ required: true, message: "请选择用户权限", trigger: "blur" }],
  introduction: [{ required: true, message: "请输入个人简介", trigger: "blur" }],
  avatar: [{ required: true, message: "请上传头像", trigger: "blur" }],
});
// 性别选择
const options = [
  {
    label: "保密",
    value: 0,
  },
  {
    label: "男",
    value: 1,
  },
  {
    label: "女",
    value: 2,
  },
];
// 每次选择完图片后的回调
const handelChange = (file) => {
  changeUserForm.avatar = URL.createObjectURL(file);
  changeUserForm.file = file;
};
// 左侧头像
const avatarUrl = computed(() =>
  store.state.userInfo.avatar
    ? config.nodeAddress + store.state.userInfo.avatar
    : config.defaultAvatar
);

// 上传数据
const submitForm = () => {
  changeUserFormRef.value.validate(async (valid) => {
    if (valid) {
      // console.log("上传", changeUserForm);
      // 更改传出格式;
      const res = await upload("/adminApi/user/upload", changeUserForm);
      if (res.ActionType === "OK") {
        store.commit("changeUserInfo", res.data);
        ElNotification({
          title: "Success",
          message: "修改成功",
          type: "success",
        });
        return;
      }
    }
    ElNotification({
      title: "Error",
      message: "修改失败 您还有未填写项 请检查",
      type: "error",
    });
  });
};
</script>
<template>
  <div>
    <el-page-header content="个人中心" icon="" title="管理系统" />
    <el-row :gutter="20" class="el-row">
      <el-col :span="8">
        <el-card class="box-card">
          <el-avatar :size="80" :src="avatarUrl" alt="头像" />
          <h3>{{ $store.state.userInfo.username }}</h3>
          <h3>
            {{ $store.state.userInfo.role === 1 ? "管理员" : "其他用户" }}
          </h3>
        </el-card>

        <el-card class="box-card" style="margin-top: 20px">
          <template #header>
            <span>简介</span>
          </template>
          <span>
            {{ $store.state.userInfo.introduction }}
          </span>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>个人信息</span>
            </div>
          </template>
          <el-form
            ref="changeUserFormRef"
            :model="changeUserForm"
            :rules="changeUserFormRules"
            label-width="120px"
            class="demo-ruleForm"
            status-icon
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="changeUserForm.username" />
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-select
                v-model="changeUserForm.gender"
                placeholder="Select"
                style="width: 240px"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="简介" prop="introduction">
              <el-input v-model="changeUserForm.introduction" type="textarea" />
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
              <Upload :avatar="changeUserForm.avatar" @changeHandel="handelChange" />
            </el-form-item>
            <el-form-item>
              <el-button @click="submitForm()" type="success">上传</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.box-card {
  text-align: center;
}
.el-row {
  margin-top: 50px;
}
</style>
