<template>
  <div>
    <span v-if="showUpdatedInText">
      <span v-if="postedMeta.showUpdated"
        >Updated: <strong>{{ postedMeta.updatedAt | format }}</strong>

        &nbsp;//&nbsp;</span
      ></span
    ><span v-if="postedMeta.showUpdated">Published: </span
    ><span style="font-weight: 400">{{
      postedMeta.published_at | format
    }}</span>
  </div>
</template>

<script>
import { dateDiff } from "@/services/DateTime";
export default {
  computed: {
    postedMeta() {
      let obj = {};
      obj.published_at = this.meta.published_at;
      obj.updatedAt = this.meta.updatedAt;

      if (dateDiff(obj.published_at, obj.updatedAt, "hours") > 24) {
        obj.showUpdated = true;
      } else {
        obj.showUpdated = false;
      }
      return obj;
    },
  },
  props: {
    meta: {
      type: Object,
      default: () => {},
    },
    showUpdatedInText: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
