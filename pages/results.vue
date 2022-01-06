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
        <v-tab> Rezultati<v-icon>mdi-book-open-variant</v-icon></v-tab>
        <v-tab> Novi korisnik <v-icon>mdi-account-plus</v-icon></v-tab>

        <v-tab-item>
          <v-card flat class="tab-content">
            <show-results />
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat class="tab-content">
            <new-user />
          </v-card>
        </v-tab-item>
      </v-tabs>
    </div>
  </div>
</template>

<script>
import ShowResults from "~/components/showResults";
import NewUser from "~/components/newUser";

export default {
  middleware: ["require-auth-expert"],
  components: {
    ShowResults,
    NewUser,
  },

  async fetch({ store }) {
    await Promise.all([await store.dispatch("result/fetchTestResults")]);
  },

  head() {
    return {
      title: "Rezultati",
    };
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