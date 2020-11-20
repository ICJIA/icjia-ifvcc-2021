<template>
  <v-app>
    <div style="min-height: 100vh !important">
      <AppNav></AppNav>
      <!-- <AppSidebar></AppSidebar> -->
      <v-main>
        <ApolloQuery :query="GET_ALERT" notifyOnNetworkStatusChange>
          <template slot-scope="{ result }">
            <div v-if="result.error" class="text-center error apollo">
              {{ result.error }}
            </div>
            <div v-if="!isLoading(result.loading) && !result.error">
              <Alert
                :type="result.data.home.alert.type"
                :text="result.data.home.alert.text"
                :dismissable="result.data.home.alert.dismissable"
                v-if="result.data.home.alert"
              ></Alert>
            </div>
          </template>
        </ApolloQuery>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-main>
      <!-- <AppFooter></AppFooter> -->
    </div>
  </v-app>
</template>

<script>
import { GET_ALERT } from "@/graphql/alert.js";
import NProgress from "nprogress";
export default {
  /* eslint-disable no-unused-vars */
  name: "App",
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      console.log(to, from);
    },
  },
  mounted() {},
  components: {},
  data: () => ({
    fab: false,
    GET_ALERT,
  }),
  methods: {
    isLoading(loading) {
      // eslint-disable-next-line no-undef
      loading ? NProgress.start() : NProgress.done();
      return loading ? true : false;
    },
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 100;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.container.full-width {
  width: 100%;
  padding: 0px !important;
}
</style>
