<template>
  <div class="bg-image">
    <div class="login-container">
      <v-form class="form-container" @submit.prevent="onSubmit">
        <v-row>
          <v-col>
            <v-icon size="150" dark class="icon"
              >mdi-account-circle-outline</v-icon
            >
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="form.username"
              dark
              filled
              rounded
              outlined
              label="Korisničko ime"
            />
            <v-text-field
              v-model="form.password"
              dark
              filled
              rounded
              label="Lozinka"
              outlined
              type="password"
            />
          </v-col>

          <v-col cols="12">
            <v-btn class="btn" dark rounded block x-large type="submit">
              Prijavi se
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
    <v-snackbar top v-model="alert.show" :timeout="alert.timeout">
      <div class="alert">{{ alert.message }}</div>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  middleware: ["no-auth"],
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      alert: {
        show: false,
        message: "",
        timeout: 4000,
      },
    };
  },

  methods: {
    ...mapActions("auth", ["doLogin", "fetchUserInfo"]),

    async onSubmit() {
      const data = {
        username: this.form.username,
        password: this.form.password,
      };

      const { message, token } = await this.doLogin(data);

      if (!token) {
        this.alert.message = message;
        this.alert.show = true;
        return;
      }

      const user = await this.fetchUserInfo();
      if (user.role == "user") {
        await this.$router.push("/test");
      } else if (user.role == "expert") {
        await this.$router.push("/results");
      }
    },
  },

  head() {
    return {
      title: "Prijava",
    };
  },
};
</script>

<style scoped>
.bg-image {
  background-image: url("~/assets/images/login-bg.jpg");
  background-size: cover;
  background-position: center;
  width: 100vw;
  height: 100vh;
}

.login-container {
  width: 30%;
  height: 70%;
  top: 15%;
  margin: 0 auto;
  position: relative;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  overflow: auto;
}

.form-container {
  margin: auto;
  text-align: center;
  width: 80%;
}

.btn {
  background-image: linear-gradient(
    to right,
    #dda0dd 0%,
    #5c258d 51%,
    #4389a2 100%
  );
}

.icon {
  opacity: 0.8;
}

.alert {
  text-align: center;
}
</style>
         

      

