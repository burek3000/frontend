<template>
  <div>
    {{ results }}
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  middleware: ["require-auth"],
  data() {
    return {};
  },

  async fetch({ store }) {
    await Promise.all([await store.dispatch("result/fetchTestResults")]);
  },
  computed: {
    ...mapGetters({ results: "result/getResults" }),
  },
    head() {
    return {
      title: "Rezultati",
    };
  },
};
</script>

<style lang="scss" scoped>
</style>