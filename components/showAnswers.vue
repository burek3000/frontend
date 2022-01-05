<template>
  <div>
    <v-row >
        <v-spacer></v-spacer>
      <v-col cols="12" >
        <v-btn outlined color="deep-purple" to="/results"
          ><v-icon>mdi-arrow-left-bold</v-icon> Nazad
        </v-btn>
      </v-col>

      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="answers"
          class="elevation-1"
          disable-pagination
          hide-default-footer
        >
          <template slot="no-data">
            <div>Nema Odgovora za prikazati.</div>
          </template>

          <template
            v-for="header in headers.filter((header) =>
              header.hasOwnProperty('formatter')
            )"
            v-slot:[`item.${header.value}`]="{ value }"
          >
            {{ header.formatter(value) }}
          </template>
          <template v-slot:[`item.Answer.emotion`]="{ item }">
            <v-chip :color="getColor(item.Answer.emotion, item.emotion)" dark>
              {{ formatEmotion(item.Answer.emotion) }}
            </v-chip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>
i
<script>
import { mapGetters } from "vuex";

export default {
  name: "showAnswers",
  data() {
    return {
      headers: [
        { text: "Osoba", value: "person" },
        { text: "Spol", value: "gender", formatter: this.formatGender },

        {
          text: "Emocija",
          value: "emotion",
          formatter: this.formatEmotion,
        },
        {
          text: "Intenzitet",
          value: "intensity",
          formatter: this.formatIntensity,
        },
        {
          text: "Odgovor",
          value: "Answer.emotion",
          formatter: this.formatEmotion,
        },
      ],
    };
  },

  computed: {
    ...mapGetters({ answers: "result/getAnswers" }),
  },

  methods: {
    formatGender(value) {
      if (value === "F") {
        return "Ž";
      }
      return value;
    },
    formatEmotion(value) {
      if (value === "FE") {
        return "Strah";
      } else if (value === "HA") {
        return "Sreća";
      } else if (value === "AN") {
        return "Ljutnja";
      } else if (value === "SP") {
        return "Iznenađenje";
      } else if (value === "DI") {
        return "Gađenje";
      } else if (value === "SA") {
        return "Tuga";
      }
    },
    formatIntensity(value) {
      if (value === "O") {
        return "Otvorena usta";
      } else if (value === "C") {
        return "Zatvorena usta";
      } else if (value === "X") {
        return "Jako otvorena usta";
      }
    },
    getColor(answer, question) {
      if (answer === question) {
        return "green";
      } else {
        return "red";
      }
    },
  },
};
</script>

<style  scoped>
</style>