<script setup>
import axios from "axios";
import { onMounted, ref, reactive } from "vue";
import { ElNotification } from "element-plus";
import config from "@/config/pageConfig";

const tableData = ref([]);
onMounted(() => {
  getTableData();
});
const getTableData = async () => {
  const res = await axios.get("/adminApi/user/list");
  tableData.value = res.data.data;
};
// 编辑回调
const handleEdit = async (data) => {
  const res = await axios.get(`adminApi/user/list/${data._id}`);
  // 合并对象
  Object.assign(UserForm, res.data.data[0]);
  dialogVisible.value = true;
};
const handleDelete = async (data) => {
  await axios.delete(`/adminApi/user/list/${data._id}`);
  getTableData();
};

const dialogVisible = ref(false);

const UserFormRef = ref();
let UserForm = reactive({
  username: "",
  password: "",
  role: 2, // 默认为其他, 1为管理员
  introduction: "",
  gender: 0,
});
const UserFormRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  introduction: [{ required: true, message: "请输入个人简介", trigger: "blur" }],
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

// 确认提交修改
const handleEditConfirm = () => {
  UserFormRef.value.validate(async (valid) => {
    if (valid) {
      //1-更新后端
      await axios.put(`adminApi/user/list/${UserForm._id}`, UserForm);
      //2-dialog隐藏
      dialogVisible.value = false;
      //3-获取tab1e数据
      getTableData();
      ElNotification({
        title: "Success",
        message: "用户信息编辑成功",
        type: "success",
        duration: 2000,
      });
      return;
    }
  });
};
</script>
<template>
  <div>
    <el-card>
      <el-page-header content="用户列表" icon="" title="用户管理" />

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="username" label="用户名" width="180" />
        <el-table-column label="头像" width="180">
          <template #default="scope">
            <div v-if="scope.row.avatar">
              <el-avatar :size="50" :src="`${config.nodeAddress}` + scope.row.avatar" />
            </div>
            <div v-else>
              <el-avatar :size="50" :src="config.defaultAvatar" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="权限">
          <template #default="scope">
            <el-tag v-if="scope.row.role === 1" class="ml-2" type="danger">管理员</el-tag>
            <el-tag v-else class="ml-2" type="success">其他用户</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-popconfirm
              title="您确定要删除吗?"
              confirm-button-text="确定"
              cancel-button-text="再想想"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" title="编辑用户信息" width="48%">
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
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleEditConfirm()"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
.el-table {
  margin-top: 20px;
}
</style>
