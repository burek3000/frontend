<template>
  <div class="bg-image">
    <div class="login-container">
      <v-form class="form-container">
        <v-row>
          <v-col>
            <v-icon size="150" dark class="icon"
              >mdi-account-circle-outline</v-icon
            >
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-text-field dark filled rounded outlined label="Korisničko ime" />
            <v-text-field
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
  </div>
</template>



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
  align-items: center;
  overflow: auto;
}

.form-container {
  margin: auto;
  text-align: center;
  width: 80%;
  font-family: "Open Sans", sans-serif;
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
</style>
         

      

