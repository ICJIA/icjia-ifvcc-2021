<template>
  <div
    class="text-center"
    :style="{
      'min-height': `${height}px`,
      'margin-top': `${marginTop}px`,
      'margin-bottom': `${marginBottom}px`,
    }"
  >
    <v-progress-circular
      indeterminate
      color="primary"
      :size="size"
    ></v-progress-circular>
    <div
      class="mt-12"
      style="font-size: 12px; font-weight: bold"
      v-if="!spinnerOnly"
    >
      LOADING ...
    </div>
  </div>
</template>

<script>
export default {
  mounted() {},
  props: {
    size: {
      type: String,
      default: "100",
    },
    height: {
      type: String,
      default: "500",
    },
    spinnerOnly: {
      type: Boolean,
      default: false,
    },
    marginTop: {
      type: String,
      default: "30",
    },
    marginBottom: {
      type: String,
      default: "30",
    },
  },
};
</script>

<style lang="scss" scoped></style>
