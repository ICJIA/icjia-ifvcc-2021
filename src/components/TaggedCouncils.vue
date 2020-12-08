<template>
  <div style="border-top: 1px solid #ccc" class="pb-12">
    <div style="font-size: 14px; font-weight: bold" class="mt-5 mb-3">
      Circuits:
    </div>
    <span
      v-for="(council, index) in councils"
      :key="`council-tag-${index}`"
      class="mr-2 mt-4"
    >
      <v-btn x-small :to="`/circuits/${council.slug}`">
        {{ council.title }}
      </v-btn>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    councils: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped></style>
