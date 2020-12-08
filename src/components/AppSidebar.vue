<template>
  <v-navigation-drawer v-model="drawer" app temporary disable-resize-watcher>
    <div v-if="meta">
      <v-list dense class="mt-5">
        <v-list-item link to="/">
          <v-list-item-content>
            <h3>Home</h3>
          </v-list-item-content>
        </v-list-item>
        <div v-for="item in meta" :key="`sidebar-${item.title}`">
          <!-- <div v-if="item.dividerBefore" class="my-2">
            <v-divider />
          </div> -->
          <v-list-item link :to="`${item.pathPrefix}${item.slug}/`">
            <v-list-item-content>
              <h3>
                <span v-if="item.menuTitle">
                  {{ item.menuTitle }}
                </span>
                <span v-else>
                  {{ item.title }}
                </span>
              </h3>
            </v-list-item-content>
          </v-list-item>
          <!-- <div v-if="item.dividerAfter" class="my-2">
            <v-divider />
          </div> -->
        </div>
        <v-divider></v-divider>
        <v-list-item link to="/search/">
          <v-list-item-content>
            <h3>Search</h3>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { EventBus } from "@/event-bus";
// import _ from 'lodash'
export default {
  data: () => ({
    drawer: false,
    items: null,
  }),
  props: {
    meta: {
      type: Array,
      default: () => [],
    },
    isLoading: {
      type: Boolean,
      default: true,
    },
  },
  async created() {},
  mounted() {
    EventBus.$on("toggle-drawer", () => {
      console.log("open drawer");
      this.drawer = !this.drawer;
    });
    EventBus.$on("closeDrawer", () => {
      console.log("close drawer");
      this.drawer = false;
    });
  },
  methods: {
    routeToPage(item) {
      console.log(item);
      // this.drawer = false;
      // this.$router.push(`${item.path}/`).catch(() => {
      //   this.$vuetify.goTo(0);
      // });
    },
  },
};
</script>
<style>
/* #keep .v-navigation-drawer__border {
  display: none;
} */
</style>
