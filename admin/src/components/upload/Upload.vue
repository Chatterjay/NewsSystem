<script setup>
import { defineEmits, defineProps } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";

const props = defineProps({
  avatar: String,
});

const emit = defineEmits(["changeHandel"]);

// 每次选择完图片后的回调
const handelChange = (file) => {
  emit("changeHandel", file.raw);
};
</script>

<template>
  <el-upload
    class="avatar-upload"
    drag
    multiple
    style="width: 360px"
    :auto-upload="false"
    :on-change="handelChange"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">拖入文件或者 <em>点击上传</em></div>
  </el-upload>
</template>

<style lang="scss" scoped>
.avatar {
  width: 100%;
  height: 100%;
}
</style>