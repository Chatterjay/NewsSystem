<script setup>
import { computed, onMounted, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import axios from "axios";
import moment from "moment";
import _ from "lodash";
import router from "@/router";

moment.locale("zh-cn");

const searchText = ref("");
const visible = ref(false);
const newsList = ref([]);

onMounted(async () => {
  const res = await axios.get("/webApi/news/list");
  newsList.value = res.data.data;
});
const searchList = computed(() =>
  searchText.value
    ? newsList.value.filter((item) => item.title.includes(searchText.value))
    : []
);

const topNewsList = computed(() => newsList.value.slice(0, 4));

const whichTime = (time) => {
  return moment(time).format("lll");
};

const whichTab = ref(1);
const tablist = [
  {
    label: "最新动态",
    name: 1,
  },
  {
    label: "典型案例",
    name: 2,
  },
  {
    label: "通知公告",
    name: 3,
  },
];

const tabNews = computed(() => {
  return _.groupBy(newsList.value, (item) => item.category);
});

const handleChangePage = (id) => {
  router.push(`/news/${id}`);
};
</script>

<template>
  <div class="container">
    <div
      class="newHeader"
      :style="{
        backgroundImage: `url(${require('@/assets/wallpaper2.png')})`,
      }"
    ></div>
    <div class="search">
      <el-popover placement="bottom" title="搜索结果" width="50%" :visible="visible">
        <template #reference>
          <el-input
            v-model="searchText"
            class="w-20 m-2"
            size="large"
            placeholder="搜索关键字"
            :prefix-icon="Search"
            type="search"
            @input="visible = true"
            @blur="visible = false"
          />
        </template>
        <div v-if="searchList.length">
          <div
            v-for="data in searchList"
            :key="data._id"
            class="search-item"
            @click="handleChangePage(data._id)"
          >
            {{ data.title }}
          </div>
        </div>
        <div v-else>
          <el-empty description="暂无该内容" :image-size="50"></el-empty>
        </div>
      </el-popover>
    </div>

    <div class="topNews">
      <el-row>
        <el-col :span="6" v-for="item in topNewsList" :key="item._id">
          <el-card
            :body-style="{ padding: '0px' }"
            shadow="hover"
            @click="handleChangePage(item._id)"
          >
            <div
              class="img"
              :style="{
                backgroundImage: ` url(http://localhost:3000${item.cover})`,
              }"
            ></div>
            <div style="padding: 14px">
              <span>{{ item.title }}</span>
              <div class="bottom">
                <time class="time"></time>
                <el-button text class="button">{{ whichTime(item.editTime) }}</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="tabs">
      <el-tabs v-model="whichTab" class="demo-tabs" style="margin: 20px">
        <el-tab-pane
          v-for="item in tablist"
          :key="item.label"
          :label="item.label"
          :name="item.name"
        >
          <el-row>
            <el-col :span="18">
              <div v-for="data in tabNews[item.name]" :key="data._id">
                <el-card
                  :body-style="{ padding: '0px' }"
                  shadow="hover"
                  @click="handleChangePage(data._id)"
                >
                  <div
                    class="tab-img"
                    :style="{
                      backgroundImage: ` url(http://localhost:3000${data.cover})`,
                    }"
                  ></div>
                  <div style="padding: 14px">
                    <span>{{ data.title }}</span>
                    <div class="tab-bottom">
                      <time class="time"></time>
                      <el-button text class="tab-button">{{
                        whichTime(data.editTime)
                      }}</el-button>
                    </div>
                  </div>
                </el-card>
              </div>
            </el-col>

            <el-col :span="6">
              <el-timeline>
                <el-timeline-item
                  v-for="data in tabNews[item.name]"
                  :key="data._id"
                  :timestamp="whichTime(data.editTime)"
                >
                  {{ data.title }}
                </el-timeline-item>
              </el-timeline>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-backtop :right="100" :bottom="100" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
}

.newHeader {
  background-size: cover;
  width: 100%;
  height: 400px;
}

.search {
  position: absolute;
  top: 300px;
  width: 100%;
  text-align: center;

  .el-input {
    width: 50%;
  }
}

.search-item {
  height: 50px;
  line-height: 50px;

  &:hover {
    color: #ccc;
  }
}
.topNews {
  margin: 20px;
  .img {
    width: 100%;
    height: 150px;
    background-color: cover;
  }
  .time {
    font-size: 12px;
    color: #ccc;
  }
}

.el-card {
  margin: 20px;
  cursor: pointer;
}
.tab-img {
  width: 160px;
  height: 120px;
  background-size: cover;
  float: left;
  margin-right: 20px;
  .tab-time {
    font-size: 12px;
    color: #ccc;
  }
}
</style>
