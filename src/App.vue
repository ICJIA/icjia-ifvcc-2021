<template>
  <v-app>
    <div style="min-height: 100vh !important">
      <AppNav></AppNav>
      <!-- <AppSidebar></AppSidebar> -->
      <v-main>
        <router-view></router-view>
      </v-main>
      <!-- <AppFooter></AppFooter> -->
    </div>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},
  mounted() {
    console.log(this.$myApp.config.clientURL);
  },

  data: () => ({
    //
  }),
};
</script>
