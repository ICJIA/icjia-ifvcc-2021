<template>
  <div>
    <div v-if="!error">
      <div v-if="post">
        {{ post }}
        <v-btn @click="fetchContent()">Test fetch</v-btn>
      </div>
    </div>
    <div v-if="isLoading"><Loader></Loader></div>
  </div>
</template>

<script>
import { handleClicks } from "@/mixins/handleClicks";
import { renderToHtml } from "@/services/Markdown";
import { GET_SINGLE_POST_QUERY } from "@/graphql/posts";
export default {
  name: "NewsSingle",
  mixins: [handleClicks],
  components: {},
  watch: {
    $route: "fetchContent",
  },
  data() {
    return {
      posts: null,
      error: null,
      errorMsg: "",
      isMounted: false,
      tocAble: null,
      meta: null,
      post: null,
      isLoading: true,
    };
  },
  created() {
    // console.log(this.error);
    // console.dir(this.posts);
  },
  mounted() {
    this.isMounted = true;
    const sections = Array.from(document.querySelectorAll("h2, h3"));
    this.tocAble = sections.length ? true : false;
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
      this.post = null;
      this.$apollo.queries.posts.skip = false;
      this.$apollo.queries.posts.refetch();
      // eslint-disable-next-line no-undef
      NProgress.done();
    },
    render(content) {
      return renderToHtml(content);
    },
    dynamicFlex(showToc) {
      if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) {
        return "12";
      } else {
        return showToc ? "9" : "12";
      }
    },
  },
  apollo: {
    posts: {
      prefetch: true,
      query: GET_SINGLE_POST_QUERY,
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
        //   ApolloQueryResult.data && ApolloQueryResult.data.posts.length > 0
        // );

        if (
          ApolloQueryResult.data &&
          ApolloQueryResult.data.posts.length > 0 === false
        ) {
          this.goto404();
        } else {
          this.post = ApolloQueryResult.data.posts[0];
          // this.post.showTOC =
          //   ApolloQueryResult.data.posts[0]["metaData"][0]["showTOC"];
          // delete this.post.metaData;
          this.error = false;
          this.isLoading = false;
          console.log("fetched content");
        }
      },
    },
  },
};
</script>
