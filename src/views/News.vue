<template>
  <div>
    <Breadcrumb :key="$route.path" title="News Archive"></Breadcrumb>
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="text-right">
            <Toggle @toggle="toggle"></Toggle>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="posts" class="view-container">
      <v-row v-if="view === 'block'" class="masonry">
        <v-col
          v-for="(item, index) in posts"
          :key="index"
          class="child"
          cols="12"
          :md="$myApp.config.masonryBlockCols"
        >
          <info-card
            :item="item"
            :text-only="false"
            read-more-text="Read News"
            @init="resize"
            @imageLoaded="resize"
          ></info-card>
        </v-col>
      </v-row>

      <v-row v-if="view === 'list'" style="margin-top: -20px" class="masonry">
        <v-col cols="12" sm="12" class="child">
          <div v-for="(item, index) in posts" :key="`list-${index}`">
            <info-card
              :item="item"
              :text-only="true"
              read-more-text="Read News"
              @init="resize"
              @imageLoaded="resize"
            ></info-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { handleClicks } from "@/mixins/handleClicks";
import { renderToHtml } from "@/services/Markdown";
import { GET_ALL_POSTS_QUERY } from "@/graphql/posts";
import { getImageURL } from "@/services/Image";
export default {
  name: "News",
  mixins: [handleClicks],
  components: {},

  data() {
    return {
      posts: null,
      error: null,
      errorMsg: "",
      isMounted: false,
      tocAble: null,
      meta: null,
      news: null,
      masonry: null,
      view: "block",
      isLoading: true,
      renderToHtml,
    };
  },
  created() {
    // console.log(this.error);
    // console.dir(this.posts);
  },
  mounted() {},
  methods: {
    toggle(e) {
      this.view = e;
      // console.log('view: ', this.view)
      this.resize();
    },
    resize() {
      const elem = document.querySelector(".masonry");
      const masonry = new window.Masonry(elem, {
        itemSelector: ".child",
      });
      masonry.layout();
      console.log("layout resized");
    },
    render(content) {
      return renderToHtml(content);
    },
    getAltText(post) {
      if (post.splash.alternativeText) {
        return post.splash.alternativeText;
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
    posts: {
      prefetch: true,
      query: GET_ALL_POSTS_QUERY,
      variables() {
        return {};
      },
      error(error) {
        this.errorMsg = JSON.stringify(error.message);
      },
      result(ApolloQueryResult) {
        // console.log(
        //   ApolloQueryResult.data && ApolloQueryResult.data.posts.length > 0
        // );

        if (
          ApolloQueryResult.data &&
          ApolloQueryResult.data.posts.length > 0 === false
        ) {
          this.goto404();
        } else {
          this.post = ApolloQueryResult.data.posts[0];
          this.error = false;
          this.isLoading = false;
          console.log("fetched content");
        }
      },
    },
  },
};
</script>
