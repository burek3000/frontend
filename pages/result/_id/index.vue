<template>
  <div class="app-container">
    <div class="content-container">
      <v-tabs
        background-color="#dcdcdc"
        icons-and-text
        active-class="active"
        slider-color="white"
        centered
      >
        <v-tab> Odgovori<v-icon>mdi-lead-pencil</v-icon></v-tab>
        <v-tab> Analiza <v-icon>mdi-google-analytics</v-icon></v-tab>

        <v-tab-item>
          <v-card flat class="tab-content">
            <show-answers></show-answers>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat class="tab-content">
            <show-analysis></show-analysis>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </div>
  </div>
</template>

<script>
import ShowAnswers from "~/components/showAnswers";
import ShowAnalysis from "~/components/showAnalysis";

export default {
  middleware: ["require-auth-expert"],
  components: {
    ShowAnswers,
    ShowAnalysis,
  },
  data() {
    return {};
  },
  async asyncData({ params, store }) {
    await Promise.all([
      await store.dispatch("result/fetchAnswers", params.id),
      await store.dispatch("result/fetchAnalysis", params.id),
    ]);
  },
};
</script>

<style  scoped>
.content-container {
  height: 100%;
  width: 70vw;
  margin: auto;
  background-color: white;
}

.app-container {
  padding: 2rem;
  height: 100%;
  background-color: #dcdcdc;
}

.tab-content {
  padding: 2rem;
}

.active {
  color: #7e57c2;
  background-color: #ffff;
}
</style>