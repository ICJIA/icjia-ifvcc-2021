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
    path: "/404/",
    name: "FourOhFourError",
    component: () => import(/* webpackChunkName: "error" */ "../views/404.vue"),
  },
  {
    path: "/councils/",
    name: "Councils",
    component: () =>
      import(/* webpackChunkName: "councils" */ "../views/Councils.vue"),
  },
  {
    path: "/councils/:slug/",
    name: "SingleCouncil",
    component: () =>
      import(/* webpackChunkName: "councils" */ "../views/CouncilsSingle.vue"),
  },
  {
    path: "/circuits/",
    name: "AllCircuits",
    component: () =>
      import(/* webpackChunkName: "circuits" */ "../views/Circuits.vue"),
  },
  {
    path: "/search/",
    name: "Search",
    component: () =>
      import(/* webpackChunkName: "search" */ "../views/Search.vue"),
  },
  {
    path: "/news/",
    name: "News",
    component: () => import(/* webpackChunkName: "news" */ "../views/News.vue"),
  },
  {
    path: "/news/:slug/",
    name: "NewsSingle",
    component: () =>
      import(/* webpackChunkName: "NewsSingle" */ "../views/NewsSingle.vue"),
  },
  {
    path: "/:slug/",
    name: "Page",
    component: () => import(/* webpackChunkName: "Page" */ "../views/Page.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "CatchAllRedirect",
    component: () => import(/* webpackChunkName: '404' */ "../views/404.vue"),
    meta: {},
  },
];

const router = new VueRouter({
  mode: "history",
  base: appConfig.publicPath,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  let jwt = localStorage.getItem("jwt");

  if (requiresAuth && !store.state.auth.isAuthenticated) {
    return next({
      path: "/login/",
      query: { redirect: to.fullPath },
    });
  }

  next();
});

router.afterEach((routeTo, routeFrom) => {
  NProgress.done();
});

export default router;
