<template>
  <div>
    <v-card class="px-3 py-3 mb-8 markdown-body" elevation="1" color="#f9f9f9">
      <div v-for="(item, index) in items" :key="`item-${index}`">
        <div v-if="item.councils.length">
          <div
            v-for="(council, index) in item.councils"
            :key="`council-${index}`"
          >
            <div style="font-size: 30px; font-weight: 900 !important">
              {{ council.title }}
            </div>
            <div style="font-size: 12px; color: #999" class="text-left">
              Last updated: {{ council.updatedAt }}
            </div>

            <v-card-text style="margin-top: -10px">
              <div
                v-html="render(council.body)"
                @click="handleClicks"
                class="dynamic-content"
              ></div>
            </v-card-text>
            <div v-if="council.posts.length && showNews">
              <h2>Latest circuit news</h2>
              {{ council.posts }}
            </div>

            <div class="mt-8 text-right" v-if="showLinkToCounty">
              <v-btn x-small :to="`/county/${item.slug}/`">
                Link <v-icon right x-small>link</v-icon>
              </v-btn>
            </div>
            <div class="mt-8 text-right" v-if="showLinkToCircuit">
              <v-btn x-small :to="`/county/${item.slug}/`">
                Link <v-icon right x-small>link</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
        <div v-else class="council-info text-center mb-2">
          No council information listed
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { handleClicks } from "@/mixins/handleClicks";
import { renderToHtml } from "@/services/Markdown";
import { getImageURL } from "@/services/Image";
export default {
  mixins: [handleClicks],
  methods: {
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
  props: {
    isLoading: {
      type: Boolean,
      default: true,
    },
    items: {
      type: Array,
      default: () => {},
    },
    showLinkToCounty: {
      type: Boolean,
      default: false,
    },
    showLinkToCircuit: {
      type: Boolean,
      default: false,
    },
    showNews: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style></style>
