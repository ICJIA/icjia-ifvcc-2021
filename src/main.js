import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { createProvider } from "./vue-apollo";
import "@/assets/github-markdown.css";
import "@/assets/app.css";
import "@/components/_globals";
import "alpinejs";

import "@/filters";
//import "material-design-icons-iconfont/dist/material-design-icons.css";
// import Masonry from "masonry-layout";
// NProgress
// eslint-disable-next-line no-unused-vars
import Nprogress from "nprogress";
import "nprogress/nprogress.css";

import "@fortawesome/fontawesome-free/css/all.css";

Vue.config.productionTip = false;

// Set up app wide read-only configs and install as plugin
import { myApp } from "./services/AppInit";
myApp.install = function () {
  Object.defineProperty(Vue.prototype, "$myApp", {
    get() {
      return myApp;
    },
  });
};
Vue.use(myApp);

import VueMeta from "vue-meta";

Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true,
});

new Vue({
  router,
  store,
  vuetify,
  apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount("#app");
