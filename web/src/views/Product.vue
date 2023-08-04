<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const loopList = ref([]);

onMounted(async () => {
  const res = await axios.get("/webApi/products/list");
  loopList.value = res.data.data;
});
</script>
<template>
  <div>
    <el-carousel
      height="calc(100vh - 59px)"
      direction="vertical"
      :autoplay="false"
      v-if="loopList.length"
    >
      <el-carousel-item v-for="item in loopList" :key="item._id">
        <div
          class="item"
          :style="{
            backgroundImage: `url(http://localhost:3000${item.cover})`,
          }"
        >
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <h2>{{ item.title }}</h2>
              </div>
            </template>
            <div>{{ item.introduction }}</div>
            <div style="margin-top: 20px">{{ item.detail }}</div>
          </el-card>
        </div>
      </el-carousel-item>
    </el-carousel>
    <el-empty description="暂无内容" v-else />
  </div>
</template>
<style scoped lang="scss">
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.item {
  width: 100%;
  height: 100%;
  background-size: cover;
}

.box-card {
  height: 100%;
  width: 50%;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>
