<template>
  <div class="container">
    <el-carousel height="calc(100vh - 59px)">
      <el-carousel-item v-for="item in 4" :key="item">
        <div
          :style="{
            backgroundImage: `url(
              ${require('@/assets/wallpaper.png')}
              )`,
          }"
        ></div>
      </el-carousel-item>
    </el-carousel>
    <div class="center">测试标题</div>
  </div>
</template>

<style lang="scss" scoped>
.el-carousel div {
  width: 100%;
  height: 100%;
  background-size: cover;
}

.container {
  position: relative;
}
.center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%);
  height: 100px;
  line-height: 100px;
  font-size: 32px;
  color: #fff;
  text-align: center;
}
</style>
