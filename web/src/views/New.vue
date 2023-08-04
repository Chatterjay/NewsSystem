<script setup>
import axios from "axios";
import { onBeforeUnmount, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import moment from "moment";
import router from "@/router";
moment.locale("zh-cn");

const route = useRoute();
const currentNews = ref({});
const topNews = ref([]);

const whichTime = (time) => {
  return moment(time).format("lll");
};
const handleChange = (id) => {
  router.push(`/news/${id}`);
};
const stop = watchEffect(async () => {
  if (!route.params.id) return;
  const res = await axios.get(`webApi/news/list/${route.params.id}`);
  const res2 = await axios.get("/webApi/news/topList?limit=4");
  topNews.value = res2.data.data;
  currentNews.value = res.data.data[0];
});

onBeforeUnmount(() => {
  stop();
});
</script>
<template>
  <el-row>
    <el-col :span="17" :offset="1">
      <div>
        <h2>{{ currentNews.title }}</h2>
      </div>

      <div class="time">
        {{ whichTime(currentNews.editTime) }}
      </div>

      <el-divider />

      <div v-html="currentNews.content"></div>
    </el-col>
    <el-col :span="4" :offset="1" :pull="1">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>最近新闻</span>
          </div>
        </template>
        <div v-for="item in topNews" :key="item._id" class="new-title">
          <span>{{ item.title }}</span>
          <div class="time" style="padding: 3px" @click="handleChange(item._id)">
            {{ whichTime(item.editTime) }}
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.el-row {
  margin-top: 20px;
}
.time {
  font-size: 14px;
  color: #aaa;
}
.el-card {
  cursor: pointer;
}
.new-title {
  &:hover {
    background-color: rgb(234, 233, 233);
    transition: all 0.3s;
  }
}
</style>
