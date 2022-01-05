<template>
  <div>
    <v-form @submit.prevent="onSubmit" ref="form">
      <v-row>
        <v-col cols="6">
          <p class="label">Ime i prezime</p>

          <v-text-field
            filled
            v-model="form.fullname"
            dense
            outlined
            :rules="[(v) => !!v || 'Moraš upisati ime i prezime.']"
          />
          <p class="label">Uloga</p>

          <v-select
            dense
            :items="roles"
            v-model="form.role"
            outlined
            filled
            :rules="[(v) => !!v || 'Moraš odabrati ulogu.']"
          ></v-select>

          <p class="label">Korisničko ime</p>

          <v-text-field
            v-model="form.username"
            outlined
            dense
            filled
            :rules="[(v) => !!v || 'Moraš upisati korisničko ime.']"
          />

          <p class="label">Lozinka</p>

          <v-text-field
            v-model="form.password"
            outlined
            dense
            filled
            type="password"
            :rules="[(v) => !!v || 'Moraš upisati ime lozinku.']"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-btn dark color="#7e57c2" type="submit"> Dodaj </v-btn>

          <v-btn outlined color="#7e57c2" @click="reset"> Resetiraj </v-btn>
        </v-col>
      </v-row>
    </v-form>

    <v-snackbar top v-model="alert.show" :timeout="alert.timeout">
      <div class="alert">{{ alert.message }}</div>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      form: {
        fullname: "",
        username: "",
        role: "user",
        password: "",
      },
      alert: {
        show: false,
        message: "",
        timeout: 4000,
      },
      roles: [
        { text: "Expert", value: "expert" },
        {
          text: "Korisnik",
          value: "user",
        },
      ],
    };
  },
  methods: {
    ...mapActions("auth", ["register"]),

    async onSubmit() {
      if (this.$refs.form.validate()) {
        const data = {
          username: this.form.username,
          password: this.form.password,
          role: this.form.role,
          fullname: this.form.fullname,
        };
        const returnData = await this.register(data);
        this.alert.message = returnData.data.message;
        this.alert.show = true;

        this.reset();
        return;
      }
    },

    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style scoped>
.label {
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 10px;
}

.alert {
  text-align: center;
}
</style>