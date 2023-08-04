  <script setup>
import Upload from "@/components/upload/Upload.vue";
import { ref, reactive } from "vue";
import { ElNotification } from "element-plus";
import upload from "@/util/upload";
import router from "@/router";

const ProductFormRef = ref();
const ProductForm = reactive({
  title: "",
  detail: "",
  introduction: "",
  cover: "",
  file: null,
});
const ProductFormRules = reactive({
  title: [{ required: true, message: "请输入产品名称", trigger: "blur" }],
  introduction: [
    { required: true, message: "请输入产品简要描述", trigger: "blur" },
  ],
  detail: [{ required: true, message: "请输入产品详细描述", trigger: "blur" }],
  cover: [{ required: true, message: "请上传产品图片", trigger: "blur" }],
});

const submitForm = () => {
  ProductFormRef.value.validate(async (valid) => {
    if (valid) {
      // 提交后后端数据
      await upload("adminApi/product/add", ProductForm);
      router.push("/product-manage/productList");
      ElNotification({
        title: "Success",
        message: "产品添加成功",
        type: "success",
        duration: 2000,
      });
      return;
    }
    ElNotification({
      title: "Error",
      message: "产品添加失败",
      type: "error",
      duration: 2000,
    });
  });
};
// 每次选择完图片后的回调
const handleChange = (file) => {
  ProductForm.cover = URL.createObjectURL(file);
  ProductForm.file = file;
};
</script>
<template>
  <div>
    <el-page-header content="添加产品" icon="" title="产品管理" />

    <el-card>
      <template #header>
        <div class="card-header">
          <span>产品信息</span>
        </div>
      </template>
      <el-form
        ref="ProductFormRef"
        :model="ProductForm"
        :rules="ProductFormRules"
        label-width="80px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="产品名称" prop="title">
          <el-input v-model="ProductForm.title" />
        </el-form-item>
        <el-form-item label="产品简要描述" prop="introduction">
          <el-input v-model="ProductForm.introduction" type="textarea" />
        </el-form-item>
        <el-form-item label="产品详细描述" prop="detail">
          <el-input v-model="ProductForm.detail" type="textarea" />
        </el-form-item>
        <el-form-item label="产品图片" prop="cover">
          <Upload :avatar="ProductForm.cover" @changeHandel="handleChange" />
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm()" type="primary">添加产品</el-button>
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