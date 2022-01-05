<template>
  <div>
    <v-row justify="center">
      <v-col>
        <v-btn outlined color="deep-purple" @click="handleDelete()"
          ><v-icon>mdi-delete</v-icon> Obriši označeno
        </v-btn>
      </v-col>
      <v-spacer></v-spacer>
      <v-col lg="1" md="2">
        <v-subheader> Pretraži </v-subheader>
      </v-col>
      <v-col lg="3" md="2">
        <v-text-field v-model="search" outlined dense></v-text-field>
      </v-col>
      <v-col lg="1" md="2">
        <v-subheader> Sortiraj</v-subheader>
      </v-col>
      <v-col lg="3" md="2">
        <v-select
          dense
          :items="headers"
          v-model="selectedSort"
          outlined
          @input="sort"
        ></v-select>
      </v-col>
    </v-row>

    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="results"
      :search="search"
      :sort-by.sync="sortBy"
      class="elevation-1"
      disable-pagination
      show-select
      hide-default-footer
    >
      <template slot="no-data">
        <div>Nema testova za prikazati.</div>
      </template>
      <template slot="no-results">
        <div>Nema pronađenih rezultata.</div>
      </template>
      <template
        v-for="header in headers.filter((header) =>
          header.hasOwnProperty('formatter')
        )"
        v-slot:[`item.${header.value}`]="{ value }"
      >
        {{ header.formatter(value) }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "showResults",
  data() {
    return {
      sortBy: "fullname",
      search: "",
      selectedSort: "",
      selected: [],
      headers: [
        { text: "Ime", value: "User.fullname" },
        {
          text: "Početak testa",
          value: "startTime",
          formatter: this.formatDate,
          filterable: false,
        },
        {
          text: "Završetak testa",
          value: "endTime",
          formatter: this.formatDate,
          filterable: false,
        },
        {
          text: "Trajanje testa",
          value: "duration",
          filterable: false,
        },
      ],
    };
  },

  computed: {
    ...mapGetters({ results: "result/getResults" }),
  },

  methods: {
    ...mapActions("result", ["deleteResults"]),
    formatDate(value) {
      const date = new Date(Date.parse(value));
      date.setTime(date.getTime() + new Date().getTimezoneOffset() * 60 * 1000);
      const dateFormatted =
        this.formatDigit(date.getDate().toString()) +
        "." +
        this.formatDigit((date.getMonth() + 1).toString()) +
        "." +
        this.formatDigit(date.getFullYear().toString()) +
        ". " +
        this.formatDigit(date.getHours().toString()) +
        ":" +
        this.formatDigit(date.getMinutes().toString()) +
        ":" +
        this.formatDigit(date.getSeconds().toString());
      return dateFormatted;
    },
    formatDigit(value) {
      if (value.length === 1) {
        return "0" + value;
      }
      return value;
    },
    sort() {
      this.sortBy = this.selectedSort;
    },
    async handleDelete() {
      const testIds = this.selected.map((test) => test.id);

      const returnData = await this.deleteResults(testIds);
      console.log(returnData);
      await this.$store.dispatch("result/fetchTestResults");
    },
  },
};
</script>

<style  scoped>
</style>