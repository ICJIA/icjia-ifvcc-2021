<template>
  <div>
    <span style="font-size: 12px; font-weight: bold; margin-right: 8px"
      >Select:</span
    >
    <v-btn-toggle v-model="display" borderless>
      <v-btn value="circuit" x-small>
        <span>Judicial Circuit</span>

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
      display: "county",
    };
  },
  watch: {
    display(newValue, oldValue) {
      if (!newValue) {
        this.$emit("council-toggle", oldValue);
      } else {
        this.$emit("council-toggle", newValue);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
