import { createRouter, createWebHashHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Home from '@/views/Home.vue';
import News from '@/views/News.vue';
import New from '@/views/New.vue';
import Product from '@/views/Product.vue';
const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/news',
    component: News,
  },
  {
    path: '/news/:id',
    component: New,
  },
  {
    path: '/product',
    component: Product,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, form, next) => {
  NProgress.start(); // 进度条读条开始
  next();
});
router.afterEach((to, from, next) => {
  NProgress.done(); // 进度条读条结束
});

export default router;
