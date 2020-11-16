import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
// eslint-disable-next-line no-unused-vars
import NProgress from "nprogress";
import appConfig from "@/config.json";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: appConfig.publicPath,
  routes,
});

export default router;
