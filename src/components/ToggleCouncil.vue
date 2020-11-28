<template>
  <div>
    <span style="font-size: 12px; font-weight: bold; margin-right: 8px"
      >Select by:</span
    >
    <v-btn-toggle v-model="icon" borderless>
      <v-btn value="circuit" x-small>
        <span>Circuit</span>

        <v-icon right x-small>mdi-format-list-bulleted</v-icon>
      </v-btn>

      <v-btn value="county" x-small>
        <span>County</span>

        <v-icon right x-small> mdi-view-module </v-icon>
      </v-btn>
    </v-btn-toggle>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icon: "county",
    };
  },
  watch: {
    icon(newValue) {
      this.$emit("council-toggle", newValue);
    },
  },
};
</script>

<style lang="scss" scoped></style>
