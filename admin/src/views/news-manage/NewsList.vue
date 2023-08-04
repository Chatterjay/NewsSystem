<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import formatTime from "@/util/formatTime";
import { Edit, Star, Delete, StarFilled } from "@element-plus/icons-vue";
import router from "@/router";
const tableData = ref([]);
const previewData = ref({});
const dialogVisible = ref(false);

onMounted(() => {
  getTableData();
});

const getTableData = async () => {
  const res = await axios.get("adminApi/news/list");
  tableData.value = res.data.data;
};

// 格式化分类信息
const categoryFormat = (category) => {
  const arr = ["最新动态", "典型案例", "通知公告"];
  return arr[category - 1];
};

// 开关回调
const handleSwitchChange = async (item) => {
  await axios.post("/adminApi/news/publish", {
    _id: item._id,
    isPublish: item.isPublish,
  });
  getTableData();
};

// 预览回调
const handlePreview = (data) => {
  previewData.value = data;
  dialogVisible.value = true;
};

// 删除回调
const handleDelete = async (item) => {
  await axios.delete(`/adminApi/news/list/${item._id}`);
  await getTableData();
};

// 编辑回调
const handleEdit = async (item) => {
  router.push(`/news-manage/editNews/${item._id}`);
};
</script>

<template>
  <div>
    <el-dialog v-model="dialogVisible" title="预览新闻" width="60%">
      <div>
        <h2>{{ previewData.title }}</h2>
        <div style="margin-top:5px font-size:12px">
          {{ formatTime.getTime(previewData.editTime) }}
        </div>

        <el-divider>
          <el-icon><star-filled /></el-icon>
        </el-divider>

        <div v-html="previewData.content" class="htmlContent"></div>
      </div>
    </el-dialog>
    <el-card>
      <el-page-header content="新闻列表" icon="" title="新闻管理" />

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="标题" width="180" />
        <el-table-column prop="category" label="类别">
          <template #default="scope">
            {{ categoryFormat(scope.row.category) }}
          </template>
        </el-table-column>

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

        <el-table-column label="是否发布">
          <template #default="scope">
            <el-switch
              v-model="scope.row.isPublish"
              :active-value="1"
              :inactive-value="0"
              @change="handleSwitchChange(scope.row)"
            />
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
            <el-button
              size="small"
              :icon="Star"
              circle
              type="warning"
              @click="handlePreview(scope.row)"
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
