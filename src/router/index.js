import Vue from "vue";
import VueRouter from "vue-router";
import Begin from "../views/Begin.vue";

Vue.use(VueRouter);

const Home = () => import(/* webpackChunkName: "home" */ "../views/Home.vue");
const Demo1 = () => import(/* webpackChunkName: "demo1" */ "../views/Demo1.vue");
const Demo2 = () => import(/* webpackChunkName: "demo2" */ "../views/Demo2.vue");

const routes = [
  {
    path: '/',
    name: "begin",
    component: Begin
  },
  {
    path: '/personnel/employeeManage',
    component: Begin
  },
  {
    path: '/personnel/organizationManage',
    component: Home
  },
  {
    path: '/personnel/singleEmployeeManage',
    component: Demo1
  },
  {
    path: '/personnel/permissionSetting',
    component: Demo2
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
