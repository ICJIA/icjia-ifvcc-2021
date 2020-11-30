<template>
  <div>
    <div v-if="!error">
      <Breadcrumb
        v-if="page"
        :key="$route.path"
        :title="page.title"
      ></Breadcrumb>
      <v-container v-if="page" class="markdown-body" style="margin-top: -30px">
        <v-row>
          <v-col cols="12">
            <h1 style="text-transform: uppercase">{{ page.title }}</h1>
            <Banner class="mb-4" v-if="page.metaData.showBanner"></Banner>
            <div class="text-center">
              <v-img
                v-if="page.splash"
                :src="
                  getImagePath(`${page.splash.formats.large.url}`, 0, 0, 100)
                "
                :lazy-src="
                  getImagePath(`${page.splash.formats.thumbnail.url}`, 0, 0, 1)
                "
                width="100%"
                height="400"
                class="mb-5"
                :alt="getAltText(page)"
                style="border: 1px solid #fafafa"
                ><template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="blue darken-3"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </div>
            <div
              class="image-caption"
              v-if="page.splash && page.splash.caption"
            >
              {{ page.splash.caption }}
            </div>

            <div
              v-html="renderToHtml(page.body)"
              @click="handleClicks"
              class="dynamic-content"
            ></div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <div class="text-right">
              <ToggleCouncil
                @toggle-council="toggle"
                style="margin-bottom: 80px; margin-top: -30px"
              ></ToggleCouncil>
            </div>
          </v-col>
        </v-row>
        <v-row class="align-center">
          <v-col md="2" cols="12"></v-col>
          <v-col cols="12" md="8">
            <div v-if="selectBy === 'county'">
              <v-select
                v-if="counties"
                dense
                :items="counties"
                v-model="selectedCounty"
                item-text="name"
                item-value="slug"
                label="Select a county"
                style="font-weight: 900 !important; font-size: 18px"
                solo
                class="align-center"
                v-on:change="fetchCouncilByCounty"
              ></v-select>

              <div v-if="selectedCounty && county">
                <CouncilCardByCounty
                  :items="county.data.counties"
                  :showLinkToCounty="true"
                  :showNews="true"
                ></CouncilCardByCounty>
              </div>
            </div>
            <div v-if="selectBy === 'circuit'">
              <v-select
                v-if="circuits"
                dense
                :items="circuits"
                v-model="selectedCircuit"
                item-text="name"
                item-value="slug"
                label="Select a judicial circuit"
                style="font-weight: 900 !important; font-size: 18px"
                solo
                class="align-center"
                v-on:change="fetchCouncilByCircuit"
              ></v-select>

              <div v-if="selectedCircuit && circuit">
                <CouncilCardByCircuit
                  :items="circuit.data.councils"
                  :showLinkToCounty="false"
                  :showNews="true"
                ></CouncilCardByCircuit>
              </div>
            </div>
          </v-col>
          <v-col md="2" cols="12"></v-col>
        </v-row>
      </v-container>
    </div>
    <!-- <div v-if="isLoading"><Loader></Loader></div> -->
  </div>
</template>

<script>
import { handleClicks } from "@/mixins/handleClicks";
import { renderToHtml } from "@/services/Markdown";
import { GET_SINGLE_PAGE_QUERY } from "@/graphql/pages";
import {
  GET_ALL_COUNTIES_QUERY,
  GET_SINGLE_COUNTY_QUERY,
  GET_ALL_CIRCUITS_FOR_SELECT_QUERY,
  // eslint-disable-next-line no-unused-vars
  GET_SINGLE_CIRCUIT_QUERY,
} from "@/graphql/councils";
import { getImageURL } from "@/services/Image";

export default {
  name: "Page",
  mixins: [handleClicks],

  data() {
    return {
      pages: null,
      error: null,
      errorMsg: "",
      isMounted: false,
      tocAble: null,
      meta: null,
      page: null,
      isLoading: true,
      renderToHtml,
      counties: null,
      items: null,
      selectedCounty: null,
      selectedCircuit: null,
      circuit: null,
      county: null,
      selectBy: "county",
    };
  },
  created() {},
  mounted() {},
  watch: {
    // eslint-disable-next-line no-unused-vars
    // selectBy(newValue, oldValue) {
    //   if (newValue === "circuit") {
    //     this.items = [];
    //   } else {
    //     this.items = this.counties;
    //   }
    // },
  },
  methods: {
    toggle(e) {
      this.selectBy = e;
      console.log("view: ", this.selectBy);
    },
    goto404() {
      this.isLoading = false;
      this.$router.push("/404").catch((err) => {
        console.log(err);
      });
    },
    // eslint-disable-next-line no-unused-vars
    async fetchCouncilByCounty() {
      this.county = await this.$apollo.query({
        query: GET_SINGLE_COUNTY_QUERY,
        variables: { slug: this.selectedCounty },
      });
      //console.log(test.data.counties);
    },

    async fetchCouncilByCircuit() {
      this.circuit = await this.$apollo.query({
        query: GET_SINGLE_CIRCUIT_QUERY,
        variables: { slug: this.selectedCircuit },
      });
    },

    render(content) {
      return renderToHtml(content);
    },
    getAltText(page) {
      if (page.splash.alternativeText) {
        return page.splash.alternativeText;
      } else {
        return "IFVCC Image";
      }
    },

    getImagePath(url, imgWidth = 450, imgHeight = 200, imageQuality = 30) {
      let imgPath;

      imgPath = `https://ifvcc.icjia-api.cloud${url}`;
      const thumborImgPath = getImageURL(
        imgPath,
        imgWidth,
        imgHeight,
        imageQuality
      );
      // console.log(thumborImgPath)
      return thumborImgPath;
    },
  },
  apollo: {
    pages: {
      prefetch: true,
      query: GET_SINGLE_PAGE_QUERY,
      variables() {
        return {
          slug: "councils",
        };
      },
      error(error) {
        this.errorMsg = JSON.stringify(error.message);
      },
      result(ApolloQueryResult) {
        this.page = ApolloQueryResult.data.pages[0];
        console.log("fetched page content");
      },
    },
    counties: {
      prefetch: true,
      query: GET_ALL_COUNTIES_QUERY,
      variables() {
        return {};
      },
      error(error) {
        this.errorMsg = JSON.stringify(error.message);
      },
      result(ApolloQueryResult) {
        this.counties = ApolloQueryResult.data.counties;

        console.log("fetched counties");
      },
    },
    councils: {
      prefetch: true,
      query: GET_ALL_CIRCUITS_FOR_SELECT_QUERY,
      variables() {
        return {};
      },
      error(error) {
        this.errorMsg = JSON.stringify(error.message);
      },
      result(ApolloQueryResult) {
        this.circuits = ApolloQueryResult.data.councils;
        console.log("fetched circuits");
      },
    },
  },
};
</script>

<style>
.vs__selected-options {
  flex-wrap: nowrap;
}

.v-list-item__title {
  font-weight: 900 !important;
  font-size: 18px !important;
  line-height: 24px !important;
}

.council-info {
  font-weight: 900;
  font-size: 20px;
  padding: 10px;
}
</style>
