<template>
  <div>
    <!-- <div width="100%" style="border-top: 0px solid #0d4fc9"></div> -->
    <div
      style="
        background: #7655e4;
        color: #fff;
        padding: 3px 15px;
        font-size: 13px;
      "
      class="text-right mb-4"
    >
      <router-link to="/" class="breadcrumb-link">IFVCC Home</router-link> |
      <span style="font-weight: 300">{{ truncate(title, 5) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Default Title here",
    },
  },
  data() {
    return {
      breadcrumbs: null,
      blacklist: ["/news", "/publications"],
    };
  },
  mounted() {
    // TODO: Figure out breadcrumbs here
    const paths = this.$route.path.split("/");
    const filtered = paths.filter(function (el) {
      if (el !== "") {
        return `${el}s`;
      }
    });

    const arr = ["home", ...filtered];
    this.breadcrumbs = arr.map((item) => {
      return `${item}`;
    });
  },

  methods: {
    truncate(string, maxWords) {
      const strippedString = string.trim();
      const array = strippedString.split(" ");
      const wordCount = array.length;
      let truncated = array.splice(0, maxWords).join(" ");

      if (wordCount > maxWords) {
        truncated = truncated + "...";
      }

      return truncated;
    },
  },
};
</script>

<style>
.breadcrumb-link {
  color: #fff !important;
  font-weight: bold;
  text-decoration: none;
  background: none;
}

.breadcrumb-link:hover {
  color: #ccc;
  text-decoration: underline;
}
</style>
