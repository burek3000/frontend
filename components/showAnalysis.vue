<template>
  <div>
    <v-row>
      <v-col>
        <v-btn outlined color="deep-purple" to="/results"
          ><v-icon>mdi-arrow-left-bold</v-icon> Nazad
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col lg="6" md="12">
        <v-data-table
          :headers="headersEmotion"
          :items="emotions"
          class="elevation-1"
          disable-pagination
          hide-default-footer
        >
          <template slot="no-data">
            <div>Nema ničeg za prikazati.</div>
          </template>
        </v-data-table>
      </v-col>

      <v-col>
        <v-data-table
          :headers="headersIntensity"
          :items="intensity"
          class="elevation-1"
          disable-pagination
          hide-default-footer
        >
          <template slot="no-data">
            <div>Nema ničeg za prikazati.</div>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({ emotions: "result/getEmotionAnalysis" }),
    ...mapGetters({ intensity: "result/getIntensityAnalysis" }),
  },

  data() {
    return {
      headersEmotion: [
        { text: "Emocija", value: "title", class: "deep-purple lighten-4 " },
        {
          text: "Broj pojavljivanja",
          value: "all",
          class: "deep-purple lighten-4 ",
        },
        {
          text: "Točni odgovori",
          value: "percent",
          class: "deep-purple lighten-4 ",
        },
      ],
      headersIntensity: [
        { text: "Intenzitet", value: "title", class: "deep-purple lighten-4 " },
        {
          text: "Broj pojavljivanja",
          value: "all",
          class: "deep-purple lighten-4 ",
        },
        {
          text: "Točni odgovori",
          value: "percent",
          class: "deep-purple lighten-4 ",
        },
      ],
    };
  },
};
</script>


<style  scoped>
</style>