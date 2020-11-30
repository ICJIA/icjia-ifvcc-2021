<template>
  <div>
    <div v-if="!error">
      <Breadcrumb
        v-if="page"
        :key="$route.path"
        :title="page.title"
      ></Breadcrumb>
      <v-container class="mt-8">
        <v-row>
          <v-col md="1"></v-col>
          <v-col cols="12" md="10">
            <div v-if="$apollo.loading">
              <Loader></Loader>
            </div>
            <div v-else>
              <CouncilCardByCounty
                :showLink="false"
                :items="items"
                :showNews="true"
                v-if="items && items.length"
              ></CouncilCardByCounty>
            </div>
          </v-col>
          <v-col md="1"></v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { handleClicks } from "@/mixins/handleClicks";
import { renderToHtml } from "@/services/Markdown";

import { GET_SINGLE_COUNTY_QUERY } from "@/graphql/councils";

export default {
  name: "Page",
  mixins: [handleClicks],

  data() {
    return {
      pages: null,
      error: null,
      errorMsg: "",
      isMounted: false,
      meta: null,
      page: null,
      isLoading: true,
      renderToHtml,
      items: [],
      county: null,
    };
  },
  created() {
    this.getCounty();
  },
  mounted() {},
  methods: {
    goto404() {
      this.isLoading = false;
      this.$router.push("/404").catch((err) => {
        console.log(err);
      });
    },
    // eslint-disable-next-line no-unused-vars
    async getCounty() {
      let county = await this.$apollo.query({
        query: GET_SINGLE_COUNTY_QUERY,
        variables: { slug: this.$route.params.slug },
      });
      // console.log(county.data.counties);
      this.items.push(county.data.counties[0]);
      console.log(this.items);
    },

    render(content) {
      return renderToHtml(content);
    },
  },
};
</script>

<style>
.council-info {
  font-weight: 900;
  font-size: 20px;
  padding: 10px;
}

.ifvcc-primary {
  color: #6c56bc;
}
</style>
