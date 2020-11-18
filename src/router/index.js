/* eslint-disable no-unused-vars */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NProgress from "nprogress";
import appConfig from "@/config.json";
import store from "@/store";

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

router.beforeEach((to, from, next) => {
  NProgress.start();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  let jwt = localStorage.getItem("jwt");

  if (requiresAuth && !store.state.auth.isAuthenticated) {
    return next({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  }

  next();
});

router.afterEach((routeTo, routeFrom) => {
  NProgress.done();
});

export default router;
