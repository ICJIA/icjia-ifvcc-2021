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
          <v-col
            cols="12"
            :md="dynamicFlex(page.metaData.showTOC)"
            order-md="1"
            order="2"
            order-sm="2"
          >
            <h1 style="text-transform: uppercase">{{ page.title }}</h1>
            <Banner class="mb-8" v-if="page.metaData.showBanner"></Banner>
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
          <v-col
            cols="12"
            md="4"
            order-md="2"
            order="1"
            order-sm="1"
            v-if="page.metaData.showTOC"
            ><Toc></Toc>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-if="isLoading"><Loader></Loader></div>
  </div>
</template>

<script>
import { handleClicks } from "@/mixins/handleClicks";
import { renderToHtml } from "@/services/Markdown";
import { GET_SINGLE_PAGE_QUERY } from "@/graphql/pages";
import { getImageURL } from "@/services/Image";
export default {
  name: "Page",
  mixins: [handleClicks],
  components: {},
  watch: {
    $route: "fetchContent",
  },
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
    };
  },
  created() {},
  mounted() {
    this.isMounted = true;
    // const sections = Array.from(document.querySelectorAll("h2, h3"));
    // this.tocAble = sections.length ? true : false;
  },
  methods: {
    goto404() {
      this.isLoading = false;
      this.$router.push("/404").catch((err) => {
        console.log(err);
      });
    },
    fetchContent() {
      // eslint-disable-next-line no-undef
      NProgress.start();
      this.isLoading = true;
      this.error = null;
      this.page = null;
      this.$apollo.queries.pages.skip = false;
      this.$apollo.queries.pages.refetch();
      // eslint-disable-next-line no-undef
      NProgress.done();
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
    dynamicFlex(showToc) {
      if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) {
        return "12";
      } else {
        return showToc ? "8" : "12";
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
          slug: this.$route.params.slug,
        };
      },
      error(error) {
        this.errorMsg = JSON.stringify(error.message);
      },
      result(ApolloQueryResult) {
        // console.log(
        //   ApolloQueryResult.data && ApolloQueryResult.data.pages.length > 0
        // );

        if (
          ApolloQueryResult.data &&
          ApolloQueryResult.data.pages.length > 0 === false
        ) {
          this.goto404();
        } else {
          this.page = ApolloQueryResult.data.pages[0];
          this.error = false;
          this.isLoading = false;
          console.log("fetched content");
        }
      },
    },
  },
};
</script>
