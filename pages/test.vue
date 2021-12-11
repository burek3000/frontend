<template >
  <div class="app-container">
    <div class="startEnd-container" v-show="showStart">
      <p class="text">
        Test se sastoji od 10 različitih fotografija stvarnih osoba od kojih
        svaka prikazuje određenu emociju. Fotografije će se prikazati jedna po
        jedna. Svako lice prikazuje se 0.2 sekunde i zatim se prekriva. Od 6
        ponuđenih odgovora odaberite emociju koju je osoba pokazala. Da biste
        započeli test kliknite na gumb ispod.
      </p>

      <v-btn class="btn-start" dark rounded x-large @click="nextImage()">
        započni test
      </v-btn>
    </div>

    <div class="startEnd-container" v-show="showEnd">
      <p class="text">Test je završen !</p>
    </div>

    <div class="image-container" v-show="showFace">
      <v-img :src="images[imageId].url"></v-img>
    </div>

    <div class="image-container" v-show="showPlus">
      <v-icon size="80" dark> mdi-hospital </v-icon>
    </div>

    <div class="answers" v-show="showAnswers">
      <v-row>
        <v-btn
          class="btn-answer"
          @click="nextImage()"
          dark
          rounded
          x-large
          outlined
          >{{ "tuga" }}</v-btn
        >
        <v-btn
          class="btn-answer"
          @click="nextImage()"
          dark
          rounded
          x-large
          outlined
          >{{ "sreća" }}</v-btn
        >
      </v-row>
      <v-row>
        <v-btn
          class="btn-answer"
          @click="nextImage()"
          dark
          rounded
          x-large
          outlined
          >{{ "strah" }}</v-btn
        ><v-btn
          class="btn-answer"
          @click="nextImage()"
          dark
          rounded
          x-large
          outlined
          >{{ "bijes" }}</v-btn
        >
      </v-row>
      <v-row>
        <v-btn
          class="btn-answer"
          @click="nextImage()"
          dark
          rounded
          x-large
          outlined
          >{{ "gađenje" }}</v-btn
        ><v-btn
          class="btn-answer"
          @click="nextImage()"
          dark
          rounded
          x-large
          outlined
          >{{ "iznenađenje" }}</v-btn
        >
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        { url: require("~/assets/images/07F_AN_C.JPG") },
        { url: require("~/assets/images/09F_SA_O.JPG") },
        { url: require("~/assets/images/11F_HA_X.JPG") },
        { url: require("~/assets/images/21M_HA_C.JPG") },
        { url: require("~/assets/images/28M_DI_C.JPG") },
        { url: require("~/assets/images/07F_AN_C.JPG") },
        { url: require("~/assets/images/09F_SA_O.JPG") },
        { url: require("~/assets/images/11F_HA_X.JPG") },
        { url: require("~/assets/images/21M_HA_C.JPG") },
        { url: require("~/assets/images/28M_DI_C.JPG") },
      ],
      imageId: 0,
      showFace: false,
      showAnswers: false,
      showStart: true,
      showPlus: false,
      showEnd: false,
      end: false,
    };
  },

  methods: {
    removePlus() {
      this.showPlus = false;
      this.showFace = true;
      setTimeout(this.removeImage, 300);
    },
    removeImage() {
      this.showFace = false;
      this.showAnswers = true;
      if (this.imageId < 9) {
        this.imageId++;
      } else {
        this.end = true;
      }
    },

    nextImage() {
      this.showAnswers = false;
      if (this.end) {
        this.showEnd = true;
        return;
      }
      this.showStart = false;
      this.showPlus = true;
      setTimeout(this.removePlus, 1000);
    },
  },
    head() {
    return {
      title: "Test",
    };
  },
};
</script>


<style scoped>
.app-container {
  display: flex;
  background: black;
  height: 100vh;
  overflow: auto;
}

.image-container {
  margin: auto;
}

.startEnd-container {
  height: 90%;
  width: 45%;
  bottom: 0;
  top: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.text {
  padding-top: 6rem;
  color: white;
  font-size: x-large;
  text-align: center;
  padding-bottom: 2rem;
}

.btn-start {
  background-image: linear-gradient(
    to right,
    #dda0dd 0%,
    #5c258d 51%,
    #4389a2 100%
  );
  width: 20rem;
}

.btn-answer {
  width: 15rem;
  margin: 3rem;
}

.answers {
  margin: auto;
}
</style>