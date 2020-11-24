<template>
  <div>
    <span> </span>

    <div class="pr-10 py-0">
      <v-img
        src="https://icjiaifvcc.netlify.app/img/logo3-purple-black.png"
        :lazy-src="getImagePath(`/img/logo3-purple-black.png`, 0, 0, 20)"
        alt="Illinois HEALS"
        width="75"
        style="float: left; padding-right: 25px; padding-bottom: 15px"
        class="hover"
      />
    </div>
    Family Violence Coordinating Councils, at both the state and local/circuit
    levels, provide a forum to improve the institutional, professional and
    community response to family violence including child abuse, domestic abuse,
    and elder abuse. Councils provide professional education and prevention;
    coordinate interventions and services for victims and perpetrators; and
    contribute to both the improvement of the legal system and the
    administration of justice.
  </div>
</template>

<script>
import { getImageURL } from "@/services/Image";
export default {
  data() {
    return {
      getImageURL,
    };
  },
  methods: {
    getImagePath(url, imgWidth = 0, imgHeight = 0, imageQuality = 100) {
      let imgPath;
      imgPath = `${this.$myApp.config.clientURL}${url}`;
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
};
</script>

<style lang="scss" scoped></style>
