<template>
  <div>
    <div v-for="(post, index) in posts" :key="`posts-${index}`">
      <div style="font-size: 12px; color: #777">
        {{ displayDate(post.published_at) }}
      </div>
      <h3 style="margin-top: 0; padding-top: 2px">
        <router-link :to="`/news/${post.slug}`" style="font-weight: 700">{{
          post.title
        }}</router-link>
      </h3>
    </div>
  </div>
</template>

<script>
import { displayDate } from "@/services/DateTime";
export default {
  data() {
    return {
      displayDate,
    };
  },
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped></style>
