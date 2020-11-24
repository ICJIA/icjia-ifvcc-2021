<template>
  <v-footer padless class="noprint">
    <v-card
      flat
      tile
      class="text-center"
      style="width: 100%; background: #6c56bc"
    >
      <v-card-text>
        <div v-if="!isLoading">
          <v-btn
            to="/"
            text
            class="footer-link"
            style="font-weight: 900"
            aria-label="search"
            >Home</v-btn
          >
          <v-btn
            v-for="(item, index) in meta"
            :key="`nav-${index}`"
            :to="`/${item.slug}/`"
            text
            class="footer-link"
            style="font-weight: 900"
            :aria-label="item.title"
          >
            <span v-if="item.metaData.menuTitle">
              {{ item.metaData.menuTitle }}
            </span>
            <span v-else>{{ item.title }}</span>
          </v-btn>

          <v-btn
            to="/search/"
            text
            class="footer-link"
            style="font-weight: 900"
            aria-label="search"
            >Search</v-btn
          >
        </div>
        <div v-else>
          <Loader
            size="20"
            height="10"
            :spinnerOnly="true"
            marginTop="0"
            marginBottom="0"
          ></Loader>
        </div>
      </v-card-text>
    </v-card>
    <v-card
      flat
      tile
      class="text-center"
      style="width: 100%; background: #442b99"
    >
      <v-card-text class="mb-2" style="margin-top: 0px">
        <div style="font-size: 12px; color: #fff">
          &copy;&nbsp;{{ new Date().getFullYear() }}
          <strong>
            <a
              href="http://icjia.state.il.us"
              class="footer-link"
              target="_blank"
              rel="noreferrer"
              >Illinois Criminal Justice Information Authority</a
            > </strong
          >&nbsp;|&nbsp;
          <strong>
            <a
              href="https://archive.icjia.cloud"
              target="_blank"
              class="footer-link"
              rel="noreferrer"
              >Document Archive</a
            ></strong
          >&nbsp;|&nbsp;
          <strong>
            <a
              href="https://icjia.illinois.gov/status"
              target="_blank"
              class="footer-link"
              rel="noreferrer"
              >Site status</a
            ></strong
          >
          &nbsp;|&nbsp;
          <strong>
            <a
              href="https://icjia.illinois.gov/covid19"
              target="_blank"
              class="footer-link"
              rel="noreferrer"
              >Covid-19 Response</a
            ></strong
          >&nbsp;|&nbsp;
          <strong>
            <a
              href="https://github.com/ICJIA/icjia-ifvcc-2021"
              target="_blank"
              class="footer-link"
              rel="noreferrer"
              >Github</a
            >
          </strong>
        </div>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ["fab fa-facebook", "fab fa-twitter"],
    nav: [],
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
};
</script>

<style>
.footer-link {
  color: #fff !important;
  text-decoration: none;
  background: none;
}

.footer-link:hover {
  color: #aaa !important;
  text-decoration: underline;
}
</style>
