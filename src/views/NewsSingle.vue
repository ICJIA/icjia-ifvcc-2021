<template>
  <div>
    <div v-if="!error">
      <v-container v-if="post" class="markdown-body">
        <v-row>
          <v-col
            cols="12"
            :md="dynamicFlex(post.showTOC)"
            order-md="1"
            order="2"
            order-sm="2"
          >
            <h1>{{ post.title }}</h1>
            <div
              v-html="renderToHtml(post.body)"
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
            v-if="post.showTOC"
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
      renderToHtml,
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
        return showToc ? "8" : "12";
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
          this.error = false;
          this.isLoading = false;
          console.log("fetched content");
        }
      },
    },
  },
};
</script>
