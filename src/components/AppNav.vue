<template>
  <v-app-bar color="white" fixed height="70" class="noprint" app>
    <div style="width: 15px" />
    <v-img
      :src="getImagePath(`/img/ifvcc-purple.png`, 0, 0, 100)"
      :lazy-src="getImagePath(`/img/ifvcc-purple.png`, 0, 0, 1)"
      alt="Illinois HEALS"
      max-width="60"
      style="margin-left: -5px; margin-right: 0px"
      class="hover"
      @click="gotoHome"
    />&nbsp;&nbsp;&nbsp;&nbsp;

    <v-toolbar-title class="heavy hover" @click="gotoHome">
      <span class="brand-state" style="margin-left: 10px"
        >ILLINOIS&nbsp;|&nbsp;</span
      >
      <span class="brand-name hidden-sm-and-down"
        >FAMILY VIOLENCE COORDINATING COUNCILS</span
      >
      <span class="brand-name hidden-md-and-up">FVCC</span>
    </v-toolbar-title>

    <v-spacer />
    <!-- {{ meta }} -->

    <div v-if="!isLoading">
      <v-btn
        v-for="(item, index) in meta"
        :key="`nav-${index}`"
        :to="`/${item.slug}/`"
        text
        style="font-weight: 900"
        :aria-label="item.title"
        class="hidden-sm-and-down"
        small
      >
        <span v-if="item.metaData && item.metaData.menuTitle">
          {{ item.metaData.menuTitle }}
        </span>
        <span v-else>{{ item.title }}</span>
      </v-btn>

      <v-btn
        text
        style="font-weight: 900; margin-left: 2px; margin-right: 2px"
        aria-label="Search"
        small
        to="/search/"
        ><v-icon>search</v-icon>
      </v-btn>

      <v-btn
        @click="toggleDrawer"
        text
        style="font-weight: 900"
        aria-label="Menu"
        small
        >Menu <v-icon right>menu</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
/* eslint-disable vue/no-use-v-if-with-v-for */
import { getImageURL } from "@/services/Image";
import { EventBus } from "@/event-bus";
export default {
  data() {
    return {
      loading: true,
      links: null,
    };
  },
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

  mounted() {
    // eslint-disable-next-line no-undef
    // console.log('STATIC_PATH=', STATIC_PATH)
  },
  methods: {
    toggleDrawer() {
      EventBus.$emit("toggle-drawer");
    },
    logoWidth() {
      // console.log(this.$vuetify.breakpoint);
      if (this.$vuetify.breakpoint.xs) {
        return 50;
      } else {
        return 90;
      }
    },
    gotoHome() {
      // EventBus.$emit('closeDrawer')
      if (this.$route.path === "/") {
        this.$vuetify.goTo(0);
      } else {
        this.$router.push("/");
      }
    },
    getImagePath(url, imgWidth = 450, imgHeight = 200, imageQuality = 30) {
      let imgPath;
      imgPath = `${this.$myApp.config.clientURL}${url}`;
      const thumborImgPath = getImageURL(
        imgPath,
        imgWidth,
        imgHeight,
        imageQuality
      );
      //console.log("splash path: ", thumborImgPath);
      return thumborImgPath;
    },
  },
};
</script>

<style>
.agency {
  font-weight: 900;
  font-size: 24px;
}

.brand-state {
  font-weight: 400;

  text-transform: uppercase;
  font-size: 22px;
  color: #333;

  /* color: #fff; */
}
.brand-name {
  font-weight: 900;
  font-size: 22px;
  color: #442b99;
  /* color: #fff; */
}
</style>
