import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

//如下是按照模块功能划分的路由
//文件标注路由
import fileRouter from "./fileRouter";
//schema路由
import schemaRouter from "./schemaRouter";

//创建router map
const routes = [
  fileRouter,
  schemaRouter,
  {
    path: "/",
    redirect: "/file",
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/denied",
    component: () => import("@/views/Denied.vue")
  },
  {
    path: "*",
    component: () => import("@/views/Notfound.vue")
  }
];

//创建router实例
const router = new VueRouter({
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    //在router-view使用keep-alive维持的时候，返回被维持页面，页面的滚动位置保持
    if (savedPosition) {
      return savedPosition;
    } else {
      return {x: 0, y: 0};
    }
  }
});

export default router;
