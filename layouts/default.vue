<template>
  <v-app
    ><v-app-bar dense v-if="isLoggedIn">
      <v-spacer></v-spacer>
      <v-btn class="btn" x-large @click.prevent="handleLogout" text>
        Odjava
      </v-btn>
    </v-app-bar>
    <nuxt />
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("auth", ["isLoggedIn"]),
  },

  methods: {
    ...mapActions("auth", ["doLogout"]),

    async handleLogout() {
      await this.doLogout();

      window.location.reload(true);
    },
  },
};
</script>


<style scoped>
.btn {
  text-transform: none;
  color: white;
}


</style>