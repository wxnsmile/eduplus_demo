import Vue from "vue";
import App from "./App.vue";
import router, {resetRouter} from "./router";

import store from "./store";

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "@/styles/index.scss";
Vue.use(Element)

import Http from "./http/http";
Vue.prototype.$http = Http;

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
