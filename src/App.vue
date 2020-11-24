<template>
  <v-app>
    <AppNav
      :meta="appNav"
      :key="`appNav-${$route.path}`"
      :isLoading="isLoading"
    ></AppNav>
    <!-- <AppSidebar></AppSidebar> -->

    <v-main>
      <transition name="fade" mode="out-in">
        <router-view style="min-height: 90vh !important"></router-view>
      </transition>
    </v-main>

    <AppFooter
      :key="`appFooter-${$route.path}`"
      :isLoading="isLoading"
      :meta="appFooter"
    ></AppFooter>
  </v-app>
</template>

<script>
import { GET_NAV_META_QUERY } from "@/graphql/nav";
import _ from "lodash";
import NProgress from "nprogress";
export default {
  /* eslint-disable no-unused-vars */
  name: "App",
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      //console.log(to, from);
    },
    isLoading(newValue, oldValue) {
      if (newValue) {
        NProgress.start();
      } else {
        NProgress.done();
      }
    },
  },
  mounted() {},
  components: {},
  data: () => ({
    fab: false,
    nav: null,
    appNav: null,
    appFooter: null,
    appSidebar: null,
    isLoading: true,
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
        this.isLoading = false;
      },
      result(ApolloQueryResult) {
        this.nav = ApolloQueryResult.data.pages;
        this.nav = _.sortBy(this.nav, ["metaData.menuRank"], ["asc"]);

        this.appFooter = this.nav.filter((item) => {
          if (item.metaData.showInFooter) return item;
        });

        this.appNav = this.nav.filter((item) => {
          if (item.metaData.showInNav) return item;
        });

        this.appSidebar = this.nav.filter((item) => {
          if (item.metaData.showInSidebar) return item;
        });
        console.log("fetched content");
        this.error = false;
        this.isLoading = false;
      },
    },
  },
  methods: {
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
