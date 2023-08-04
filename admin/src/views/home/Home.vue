<script setup>
import store from "@/store";
import axios from "axios";
import { computed, onMounted, ref } from "vue";
import config from "@/config/pageConfig";

const welcomeText = computed(() => {
  const visitTime = new Date().getHours();
  if (visitTime <= 10) {
    return "美好的一天都是从早上开始的。快起来运动一下吧！ o((>ω< ))o";
  }
  if (visitTime <= 12) {
    return "都中午了，还不打算休息下吗？笨蛋 ヾ(•ω•`)o";
  }
  if (visitTime <= 14) {
    return "都下午两点了，快去休息下吧！别撑着了。ヾ(≧▽≦*)o";
  }
  if (visitTime <= 21) {
    return "没事情可以找点事情做哟！可别让自己闲着打发时间哟。 (●'◡'●)";
  }
  if (visitTime <= 24) {
    return "这都多少点了还不休息！还是想喝杯咖啡提提神？（￣︶￣）↗　";
  }
});
const avatarUrl = computed(() =>
  store.state.userInfo.avatar
    ? config.nodeAddress + store.state.userInfo.avatar
    : config.defaultAvatar
);
const loopList = ref([]);
onMounted(() => {
  getData();
});

const getData = async () => {
  const res = await axios.get("adminApi/product/list");
  loopList.value = res.data.data;
};

const getCover = (item) => {
  return `url(${config.nodeAddress}${item.cover})`;
};
</script>
<template>
  <div>
    <el-page-header content="首页" icon="" title="管理系统"> </el-page-header>
    <el-card shadow="always" class="box-card">
      <el-row>
        <el-col :span="4">
          <el-avatar :size="80" :src="avatarUrl" alt="头像" />
        </el-col>
        <el-col :span="20">
          <h3 style="line-height: 100px">
            欢迎{{ $store.state.userInfo.username }}回来
            <span>{{ welcomeText }}</span>
          </h3>
        </el-col>
      </el-row>
    </el-card>
    <el-card shadow="always" class="box-card">
      <template #header>
        <div class="card-header">
          <span>公司产品</span>
        </div>
      </template>
      <el-carousel :interval="4000" type="card" height="200px" v-if="loopList.length">
        <el-carousel-item v-for="item in loopList" :key="item._id">
          <div
            :style="{
              backgroundImage: getCover(item),
              backgroundSize: 'cover',
            }"
          >
            <h3>{{ item.title }}</h3>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>
<style lang="scss" scoped>
.box-card {
  margin-top: 50px;
}
.el-carousel__item h3 {
  color: #fff;
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
</style>
