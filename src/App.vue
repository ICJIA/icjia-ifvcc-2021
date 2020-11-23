<template>
  <v-app>
    <div>
      <AppNav></AppNav>
      <!-- <AppSidebar></AppSidebar> -->
      <v-main>
        <transition name="fade" mode="out-in">
          <router-view style="min-height: 90vh !important"></router-view>
        </transition>
      </v-main>
      <AppFooter :key="$route.path" v-if="nav" :meta="nav"></AppFooter>
    </div>
  </v-app>
</template>

<script>
import { GET_NAV_META_QUERY } from "@/graphql/nav";
import NProgress from "nprogress";
export default {
  /* eslint-disable no-unused-vars */
  name: "App",
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      //console.log(to, from);
    },
  },
  mounted() {},
  components: {},
  data: () => ({
    fab: false,
    nav: null,
  }),
  apollo: {
    pages: {
      prefetch: true,
      query: GET_NAV_META_QUERY,
      variables() {
        return {};
      },
      error(error) {
        this.errorMsg = JSON.stringify(error.message);
      },
      result(ApolloQueryResult) {
        this.nav = ApolloQueryResult.data.pages;
        this.error = false;
        this.isLoading = false;
        console.log("fetched content");
        console.dir(this.nav);
      },
    },
  },
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
