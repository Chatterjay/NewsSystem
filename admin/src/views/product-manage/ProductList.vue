<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import formatTime from "@/util/formatTime";
import { Edit, Delete } from "@element-plus/icons-vue";
import router from "@/router";
const tableData = ref([]);
const previewData = ref({});

onMounted(() => {
  getTableData();
});

const getTableData = async () => {
  const res = await axios.get("adminApi/product/list");
  tableData.value = res.data.data;
};

// 格式化分类信息
const categoryFormat = (category) => {
  const arr = ["最新动态", "典型案例", "通知公告"];
  return arr[category - 1];
};

// 删除回调
const handleDelete = async (item) => {
  await axios.delete(`/adminApi/product/list/${item._id}`);
  await getTableData();
};

// 编辑回调
const handleEdit = async (item) => {
  router.push(`/product-manage/editProduct/${item._id}`);
};
</script>

<template>
  <div>
    <el-card>
      <el-page-header content="产品列表" icon="" title="产品管理" />
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="产品名称" width="180" />
        <el-table-column prop="introduction" label="简要描述" />
        <el-table-column label="创建时间">
          <template #default="scope">
            {{ formatTime.getTime(scope.row.createTime) }}
          </template>
        </el-table-column>

        <el-table-column label="更新时间">
          <template #default="scope">
            {{ formatTime.getTime(scope.row.editTime) }}
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              :icon="Edit"
              circle
              type="success"
              @click="handleEdit(scope.row)"
            />
            <el-popconfirm
              title="您确定要删除吗?"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-button size="small" :icon="Delete" circle type="danger" />
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<style lang="scss" scoped>
.el-table {
  margin-top: 20px;
}

::v-deep .htmlContent {
  img {
    max-width: 100%;
  }
}
</style>