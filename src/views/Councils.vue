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
        <v-row class="align-center">
          <v-col class="align-center">
            <v-select
              v-if="counties"
              dense
              :items="counties"
              v-model="selectedCounty"
              item-text="name"
              item-value="slug"
              label="Select a county"
              style="font-weight: 900 !important"
              outlined
              class="align-center"
              v-on:change="getCounty"
            ></v-select>
            <div class="text-center" v-if="selectedCounty">
              {{ selectedCounty }} info here
            </div>
          </v-col>
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
import { GET_ALL_COUNTIES_QUERY } from "@/graphql/councils";
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
      selectedCounty: null,
    };
  },
  created() {},
  mounted() {},
  methods: {
    goto404() {
      this.isLoading = false;
      this.$router.push("/404").catch((err) => {
        console.log(err);
      });
    },
    // eslint-disable-next-line no-unused-vars
    getCounty() {
      console.log(this.selectedCounty);
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
  },
};
</script>

<style>
.vs__selected-options {
  flex-wrap: nowrap;
}
</style>