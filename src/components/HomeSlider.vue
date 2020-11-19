<template>
  <v-carousel
    height="450"
    hide-delimiter-background
    show-arrows-on-hover
    style="margin-top: -1px"
  >
    <v-carousel-item v-for="(slide, index) in slides.slide" :key="index">
      <v-card color="grey lighten-4" height="100%">
        <v-row class="fill-height" align="center" justify="center" no-gutters>
          <v-col
            style="height: 100%; background: #442b99"
            cols="12"
            class="hidden-md-and-up"
          >
            <v-row
              class="fill-height"
              align="center"
              justify="center"
              no-gutters
            >
              <div
                style="
                  color: #fff;
                  font-weight: bold;
                  padding-right: 50px;
                  padding-left: 50px;
                "
              >
                <div class="text-center">
                  <div
                    style="font-size: 12px; color: #ccc"
                    class="text-center mb-3"
                    v-if="slide.postingDate"
                  >
                    {{ slide.postingDate | format }}
                  </div>
                  <h2 v-if="slide.title">{{ slide.title }}</h2>
                  <h3
                    style="color: #aaa; font-size: 14px"
                    class="mt-5"
                    v-if="slide.summary"
                  >
                    {{ slide.summary }}
                  </h3>
                  <v-btn
                    v-if="slide.url"
                    class="mt-12"
                    color="grey"
                    @click="route(slide.url)"
                    >Read more</v-btn
                  >
                </div>
              </div>
            </v-row>
          </v-col>
          <v-col md="12" cols="12" class="hidden-sm-and-down text-center">
            <v-img
              v-if="slide.image && slide.image.formats"
              :src="getImagePath(`${slide.image.formats.large.url}`, 0, 0, 100)"
              :lazy-src="
                getImagePath(`${slide.image.formats.large.url}`, 0, 0, 1)
              "
              max-height="450"
            >
              <div class="text-center" style="margin-top: 100px">
                <h1>ILLINOIS FAMILY VIOLENCE COORDINATING COUNCILS</h1>
                <h2 class="mt-5" style="color: #aaa">
                  Sponsored by the Illinois Criminal Justice Information
                  Authority
                </h2>
                <img
                  :src="
                    getImagePath(`/uploads/820863c_2da267a1b6.png`, 0, 0, 100)
                  "
                  alt="IFVCC logo"
                  class="mt-8"
                />
              </div>
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>
        </v-row>
      </v-card>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import { getImageURL } from "@/services/Image";
export default {
  mounted() {},
  methods: {
    route(url) {
      var r = new RegExp("^(?:[a-z]+:)?//", "i");
      if (r.test(url)) {
        window.open(url);
      } else {
        // eslint-disable-next-line no-unused-vars
        this.$router.push(url).catch((err) => {
          this.$vuetify.goTo(0);
        });
      }
    },
    getImagePath(url, imgWidth = 450, imgHeight = 200, imageQuality = 30) {
      let imgPath;
      imgPath = `${this.$myApp.config.api.base}${url}`;
      const thumborImgPath = getImageURL(
        imgPath,
        imgWidth,
        imgHeight,
        imageQuality
      );
      //console.log("splash path: ", thumborImgPath);
      return thumborImgPath;
    },
  },
  props: {
    slides: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      base: this.$myApp.config.api.base,
    };
  },
};
</script>
