<template>
  <v-alert
    v-model="alert"
    close-text="Close Alert"
    dark
    class="mt-1 mx-1"
    :type="type"
    :dismissible="dismissable"
  >
    <span class="home-alert">{{ text }}</span>
  </v-alert>
</template>

<script>
export default {
  data() {
    return {
      alert: true,
    };
  },
  props: {
    text: {
      type: String,
      default: "no text set",
    },
    type: {
      type: String,
      default: "info",
    },
    dismissable: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style>
.home-alert {
  font-weight: 700;
  font-family: "Raleway", sans-serif !important;
}
</style>
