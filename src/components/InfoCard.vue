<template>
  <div>
    <v-card
      class="pa-2 grid-item mb-10 info-card py-3 px-3"
      outlined
      @click="$router.push(`/news/${item.slug}/`)"
    >
      <div style="font-size: 12px; margin-left: 15px">
        {{ displayDate(item.createdAt) }}
      </div>

      <v-card-text v-if="item.title"
        ><h2 style="margin-top: -10px">
          {{ item.title }}
        </h2></v-card-text
      >

      <v-img
        v-if="item.splash && !textOnly"
        :src="getImagePath(`${item.splash.formats.large.url}`, 450, 200, 80)"
        :lazy-src="
          getImagePath(`${item.splash.formats.thumbnail.url}`, 225, 100, 5)
        "
        width="100%"
        :height="splashHeight"
        class="mb-5"
        style="border: 1px solid #fafafa"
        alt="ILHEALS image"
        @load="resize"
        ><template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="blue darken-3"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>

      <v-card-text v-if="item.summary" style="margin-top: -15px">{{
        item.summary
      }}</v-card-text>
      <v-card-text>
        <div class="text-right">
          <v-btn x-small :to="`/news/${item.slug}`">
            {{ readMoreText }}
            <v-icon right>mdi-menu-right</v-icon>
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { format, parseISO } from "date-fns";
import { getImageURL } from "@/services/Image";
import { displayDate } from "@/services/DateTime";

export default {
  data() {
    return {
      displayDate,
    };
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    textOnly: {
      type: Boolean,
      default: true,
    },
    readMoreText: {
      type: String,
      default: "Read news",
    },
    splashHeight: {
      type: Number,
      default: 200,
    },
  },
  mounted() {
    this.$emit("init");
  },

  methods: {
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
    formatDate(d) {
      const temp = new Date(d).toJSON().split("T")[0];
      const myDate = `${temp}T23:59:59.000Z`;
      const formattedDate = format(parseISO(myDate), "MMMM dd, yyyy");
      return formattedDate;
    },
    resize() {
      // console.log('child image loaded')
      this.$emit("image-loaded");
    },
  },
};
</script>

<style lang="scss" scoped></style>
