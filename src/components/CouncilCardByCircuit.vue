<template>
  <div>
    <v-card class="mb-8 markdown-body" elevation="0" color="#f9f9f9" style="">
      <div class="text-right" style="margin-top: 1px"></div>
      <div class="px-10 py-8">
        <div style="font-size: 30px; font-weight: 900 !important">
          {{ items[0].name }}
        </div>
        <div style="font-size: 12px; color: #999" class="text-left">
          Last updated: {{ items[0].updatedAt }}
        </div>

        <v-card-text style="margin-top: -10px">
          <div
            v-html="render(items[0].body)"
            @click="handleClicks"
            class="dynamic-content"
          ></div>
        </v-card-text>
        <div v-if="showNews && items[0].posts.length">
          <h2>Latest circuit news</h2>
          {{ items[0].posts }}
        </div>

        <div class="mt-8 text-right" v-if="showLinkToCircuit">
          <v-btn x-small :to="`/circuits/${items[0].slug}/`">
            Link <v-icon right x-small>link</v-icon>
          </v-btn>
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
      default: () => [],
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
