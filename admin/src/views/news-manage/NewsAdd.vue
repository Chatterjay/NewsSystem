<script setup>
import { ref, reactive } from "vue";
import editor from "@/components/editor/Editor";
import upload from "@/util/upload";
import Upload from "@/components/upload/Upload.vue";
import { ElNotification } from "element-plus";
import router from "@/router";

const NewsFormRef = ref();
const NewsForm = reactive({
  title: "",
  content: "",
  category: 1, // 1 最新动态 2 典型案例 3 通知公告
  cover: "",
  file: null,
  isPublish: 0, // 0 未发布 1 已发布
});
const NewsFormRules = reactive({
  title: [{ required: true, message: "请输入文章的标题", trigger: "blur" }],
  content: [{ required: true, message: "请输入文章内容", trigger: "blur" }],
  category: [{ required: true, message: "请选择分类", trigger: "blur" }],
  cover: [{ required: true, message: "请上传封面", trigger: "blur" }],
});
// 每次editor内容改变调用回调
const handleChange = (data) => {
  NewsForm.content = data;
};

const options = [
  {
    label: "最新动态",
    value: 1,
  },
  {
    label: "典型案例",
    value: 2,
  },
  {
    label: "通知公告",
    value: 3,
  },
];

const coverHandleChange = (file) => {
  NewsForm.cover = URL.createObjectURL(file);
  NewsForm.file = file;
};

const submitForm = () => {
  NewsFormRef.value.validate(async (valid) => {
    if (valid) {
      // 提交后后端数据
      await upload("/adminApi/news/add", NewsForm);
      router.push("/news-manage/newsList");

      ElNotification({
        title: "Success",
        message: "新闻创建成功",
        type: "success",
        duration: 2000,
        position: "bottom-right",
      });
      return;
    }
    ElNotification({
      title: "Error",
      message: "新闻创建失败 您还有未填项",
      type: "error",
      duration: 2000,
      position: "bottom-right",
    });
  });
};
</script>

<template>
  <div>
    <el-page-header content="创建新闻" icon="" title="新闻管理" />

    <el-card>
      <template #header>
        <div class="card-header">
          <span>创建新闻</span>
        </div>
      </template>

      <el-form
        ref="NewsFormRef"
        :model="NewsForm"
        :rules="NewsFormRules"
        label-width="80px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="NewsForm.title" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <editor @event="handleChange" />
        </el-form-item>
        <el-form-item label="类别" prop="category">
          <el-select
            v-model="NewsForm.category"
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
        <el-form-item label="封面" prop="cover">
          <Upload :avatar="NewsForm.cover" @changeHandel="coverHandleChange" />
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm()" type="primary">添加新闻</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<style lang="scss" scoped>
.el-card {
  margin-top: 50px;
}
</style>