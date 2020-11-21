<template>
  <ApolloQuery
    :query="GET_HOME"
    notifyOnNetworkStatusChange
    :variables="{ now, eventLimit, postLimit }"
    @result="afterFetch"
  >
    <template slot-scope="{ result }">
      <div v-if="isLoading(result.loading)">
        <Loader></Loader>
      </div>

      <div v-if="!isLoading(result.loading) && !result.error">
        <!-- START: home components -->

        <Alert
          :type="result.data.home.alert.type"
          :text="result.data.home.alert.text"
          :dismissable="result.data.home.alert.dismissable"
          v-if="result.data.home.alert"
        ></Alert>

        <HomeSlider
          :slides="result.data.home.slider"
          v-if="result.data.home.slider"
        ></HomeSlider>

        <HomeFeatureBoxes
          v-if="result.data.home.featureBoxDisplay"
          :feature-boxes="result.data.home.featureBoxDisplay.featureBox"
        ></HomeFeatureBoxes>

        <!-- <HomeBoxes></HomeBoxes> -->

        <div style="background: #fafafa">
          <v-container style="margin-top: -20px">
            <v-row>
              <v-col sm="12" md="6" cols="12" class="child">
                <v-sheet
                  class="px-2 py-2"
                  elevation="0"
                  style="background: #fafafa"
                >
                  <v-container fluid class="mb-8" style="margin: 0; padding: 0">
                    <div style="background: #fafafa" class="px-3 py-3">
                      <v-row no-gutters>
                        <v-col>
                          <h2
                            style="
                              color: #444;
                              font-weight: 900;
                              font-size: 36px;
                            "
                          >
                            Latest News
                          </h2>
                        </v-col>
                        <v-col class="text-right mt-5 hidden-sm-and-down">
                          <v-btn outlined x-small color="black" to="/news"
                            >news archive&nbsp;<v-icon right x-small
                              >view_headline</v-icon
                            ></v-btn
                          >
                        </v-col>
                      </v-row>
                    </div>
                  </v-container>

                  <HomePosts
                    :posts="result.data.posts"
                    v-if="result.data.posts"
                    style="margin-top: -30px"
                  ></HomePosts>
                </v-sheet>
              </v-col>
              <v-col sm="12" md="6" cols="12" class="child">
                <v-sheet
                  class="px-2 py-2"
                  elevation="0"
                  style="background: #fafafa"
                >
                  <v-container
                    fluid
                    class="mb-8"
                    style="margin: 0; padding: 0"
                    v-if="result.data.home.infoDisplay"
                  >
                    <div style="background: #fafafa" class="px-3 py-3">
                      <v-row no-gutters>
                        <v-col>
                          <h2
                            style="
                              color: #444;
                              font-weight: 900;
                              font-size: 36px;
                            "
                            class="markdown-body"
                          >
                            {{ result.data.home.infoDisplay.title }}
                          </h2>
                        </v-col>

                        <v-col cols="12" class="mt-3">
                          <v-sheet
                            class="px-2"
                            elevation="0"
                            style="background: #fafafa"
                          >
                            <span
                              class="markdown-body"
                              v-html="
                                renderToHtml(result.data.home.infoDisplay.body)
                              "
                            ></span>
                            <div class="text-center">
                              <v-btn
                                v-if="result.data.home.infoDisplay.callToAction"
                                outlined
                                x-small
                                :to="
                                  result.data.home.infoDisplay.callToAction.url
                                "
                                class="mt-9"
                              >
                                {{
                                  result.data.home.infoDisplay.callToAction
                                    .text
                                }}&nbsp;<v-icon x-small>{{
                                  result.data.home.infoDisplay.callToAction.icon
                                }}</v-icon></v-btn
                              >
                            </div>
                          </v-sheet>
                        </v-col>
                      </v-row>
                    </div>
                  </v-container>
                </v-sheet>
              </v-col>
            </v-row>
          </v-container>

          <!-- END: home components -->
        </div>
        <div v-if="result.error" class="text-center error apollo">
          {{ result.error }}
        </div>
      </div>
    </template>
  </ApolloQuery>
</template>
<script>
import { GET_HOME } from "@/graphql/home.js";
// eslint-disable-next-line no-unused-vars
import { renderToHtml } from "@/services/Markdown";
// eslint-disable-next-line no-unused-vars
import _ from "lodash";
import moment from "moment";
// eslint-disable-next-line no-unused-vars
import tz from "moment-timezone";
export default {
  name: "Home",
  components: {},
  computed: {
    name() {
      return this.data;
    },
  },
  created() {
    this.now = moment().tz(this.$myApp.config.timezone).format("YYYY-MM-DD");
  },
  mounted() {
    //console.log(this.$myApp.config.timezone);
  },
  data() {
    return {
      GET_HOME,
      renderToHtml,
      now: null,
      mergedEvents: () => [],
      eventLimit: this.$myApp.config.home.eventLimit,
      postLimit: this.$myApp.config.home.postLimit,
    };
  },
  methods: {
    isLoading(loading) {
      // eslint-disable-next-line no-undef
      loading ? NProgress.start() : NProgress.done();
      return loading ? true : false;
    },

    afterFetch(result) {
      //TODO: Fix for either no eventRange or no events
      if (result.data && result.data.events && result.data.eventRange) {
        let mergedEvents = [...result.data.events, ...result.data.eventRange];
        mergedEvents = _.sortBy(mergedEvents, (o) => o.start);
        this.mergedEvents = mergedEvents.slice(0, this.eventLimit);
      }
    },
  },
};
</script>

<style>
.hover {
  cursor: pointer;
}
.card:hover {
  box-shadow: 0px 0px 15px #000000;
  z-index: 2;
  -webkit-transition: all 100ms ease-in;
  -webkit-transform: scale(1.01);
  -ms-transition: all 100ms ease-in;
  -ms-transform: scale(1.01);
  -moz-transition: all 100ms ease-in;
  -moz-transform: scale(1.01);
  transition: all 100ms ease-in;
  transform: scale(1.01);
  cursor: pointer;
  background: #fafafa;
}
</style>
