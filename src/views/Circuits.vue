<template>
  <div>
    <Breadcrumb
      v-if="circuits"
      :key="$route.path"
      title="All Circuits"
    ></Breadcrumb>
    <v-container>
      <v-row>
        <v-col>
          <Banner class="mb-10"></Banner>
          <div v-if="!isLoading">
            <div v-for="(circuit, index) in circuits" :key="`circuit-${index}`">
              <v-card
                class="mb-12 markdown-body"
                elevation="0"
                color="#f3f5f7"
                style=""
              >
                <div class="text-right" style="margin-top: 1px"></div>
                <div class="px-10 py-8">
                  <div style="font-size: 30px; font-weight: 900 !important">
                    {{ circuit.title }}
                  </div>
                  <div style="font-size: 12px; color: #999" class="text-left">
                    Last updated {{ timeFromDate(circuit.updatedAt) }}
                  </div>

                  <v-card-text style="margin-top: -10px">
                    <div
                      v-html="render(circuit.body)"
                      @click="handleClicks"
                      class="dynamic-content"
                    ></div>
                  </v-card-text>
                  <div v-if="circuit.posts && circuit.posts.length">
                    <h2 style="font-weight: 900">Latest circuit news</h2>
                    <CouncilCardPosts
                      :posts="circuit.posts"
                      style="margin-left: 10px"
                    ></CouncilCardPosts>
                  </div>
                </div>
              </v-card>
            </div>
          </div>
          <div v-else><Loader></Loader></div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { handleClicks } from "@/mixins/handleClicks";
import { renderToHtml } from "@/services/Markdown";
import { GET_ALL_CIRCUITS_QUERY } from "@/graphql/councils";
import { timeFromDate } from "@/services/DateTime";

export default {
  name: "AllCircuits",
  mixins: [handleClicks],

  data() {
    return {
      error: null,
      errorMsg: "",
      isMounted: false,
      isLoading: true,
      renderToHtml,
      circuits: null,
      timeFromDate,
    };
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    goto404() {
      this.isLoading = false;
      this.$router.push("/404").catch((err) => {
        console.log(err);
      });
    },
    // eslint-disable-next-line no-unused-vars

    render(content) {
      return renderToHtml(content);
    },
  },
  apollo: {
    councils: {
      prefetch: true,
      query: GET_ALL_CIRCUITS_QUERY,
      variables() {},
      error(error) {
        this.errorMsg = JSON.stringify(error.message);
      },
      result(ApolloQueryResult) {
        this.circuits = ApolloQueryResult.data.councils;
        console.log("fetched all circuits");
        this.isLoading = false;
      },
    },
  },
};
</script>

<style></style>
