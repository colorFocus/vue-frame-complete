import Vue from "vue";
import App from "@/App.vue";
import router from "@/router/index";
import store from "@/store/index";
import {i18n} from "@/lang/index.js";

//引用element-ui样式
import ElementUI from "element-ui";
Vue.use(ElementUI);
// import "@/assets/less/elevariables.scss";//apd-ui.css中包含了element-ui的样式

//框架ui
import "@/assets/less/index.less";

//全局指令directive
import "@/directive/dialogDrag.js";

//全局filter
import * as filters from "@/filters";
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

//全局组件
import headerBar from "@/components/HeaderBar.vue";
Vue.component(headerBar.name, headerBar);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
