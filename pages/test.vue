<template >
  <div class="app-container">
    <div class="start-container" v-show="showStart">
      <p class="text-start">
        Test se sastoji od 10 različitih fotografija stvarnih osoba od kojih
        svaka prikazuje određenu emociju. Fotografije će se prikazati jedna po
        jedna. Svako lice prikazuje se 0.2 sekunde i zatim se prekriva. Od 6
        ponuđenih odgovora odaberite emociju koju je osoba pokazala. Da biste
        započeli test kliknite na gumb ispod.
      </p>

      <v-btn class="btn-start" dark rounded x-large @click="nextImage('start')">
        započni test
      </v-btn>
    </div>

    <div class="end-container" v-show="showEnd">
      <p class="text-end">Test je završen !</p>
      <v-img class="smailey-image" :src="smailey.image"></v-img>
    </div>

    <div class="image-container" v-show="showFace">
      <v-img :src="images[imageId]"></v-img>
    </div>

    <div class="image-container" v-show="showPlus">
      <v-icon size="80" dark> mdi-hospital </v-icon>
    </div>

    <div class="answers" v-show="showAnswers">
      <v-row>
        <v-btn
          class="btn-answer"
          @click="nextImage('SA')"
          dark
          rounded
          x-large
          outlined
          >{{ "tuga" }}</v-btn
        >
        <v-btn
          class="btn-answer"
          @click="nextImage('HA')"
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
          @click="nextImage('FE')"
          dark
          rounded
          x-large
          outlined
          >{{ "strah" }}</v-btn
        ><v-btn
          class="btn-answer"
          @click="nextImage('AN')"
          dark
          rounded
          x-large
          outlined
          >{{ "srdžba" }}</v-btn
        >
      </v-row>
      <v-row>
        <v-btn
          class="btn-answer"
          @click="nextImage('DI')"
          dark
          rounded
          x-large
          outlined
          >{{ "gađenje" }}</v-btn
        ><v-btn
          class="btn-answer"
          @click="nextImage('SP')"
          dark
          rounded
          x-large
          outlined
          >{{ "iznenađenje" }}</v-btn
        >
      </v-row>

      <v-row justify="center">
        <div class="counter" v-text="counter()"></div>
      </v-row>
    </div>

    <v-snackbar top v-model="alert.show" :timeout="alert.timeout">
      <div class="alert">{{ alert.message }}</div>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  middleware: ["require-auth-user"],
  data() {
    return {
      imageId: 0,
      showFace: false,
      showAnswers: false,
      showStart: true,
      showPlus: false,
      showEnd: false,
      end: false,
      answers: [],
      startTime: "",
      endTime: "",
      alert: {
        show: false,
        message: "",
        timeout: 4000,
      },
      beginAnswering: "",
      finishAnswering: "",
      smailey: {
        image: require("/home/mia/code/Završni/frontend/assets/images/smailey.png"),
      },
    };
  },

  async fetch({ store }) {
    await Promise.all([await store.dispatch("test/fetchImages")]);
  },

  methods: {
    ...mapActions("test", ["submitResults"]),

    currentTime() {
      const timeNow = new Date();
      return (
        timeNow.getFullYear().toString() +
        "-" +
        (timeNow.getMonth() + 1).toString() +
        "-" +
        timeNow.getDate().toString() +
        " " +
        timeNow.getHours().toString() +
        ":" +
        timeNow.getMinutes().toString() +
        ":" +
        timeNow.getSeconds().toString()
      );
    },
    removePlus() {
      this.showPlus = false;
      this.showFace = true;
      setTimeout(this.removeImage, 200);
    },
    removeImage() {
      this.showFace = false;
      this.showAnswers = true;
      this.beginAnswering = new Date();
      if (this.imageId < 9) {
        this.imageId++;
      } else {
        this.end = true;
      }
    },
    async nextImage(answer) {
      if (answer == "start") {
        this.startTime = this.currentTime();
      } else {
        this.finishAnswering = new Date();
        this.answers.push({
          emotion: answer,
          duration: this.finishAnswering - this.beginAnswering,
        });
      }
      this.showAnswers = false;
      if (this.end) {
        this.showEnd = true;
        this.endTime = this.currentTime();
        await this.handleSubmit();
        return;
      }
      this.showStart = false;
      this.showPlus = true;
      setTimeout(this.removePlus, 1000);
    },
    counter() {
      if (this.end) {
        return "10/10";
      }
      return this.imageId + "/10";
    },

    async handleSubmit() {
      const data = {
        startTime: this.startTime,
        endTime: this.endTime,
        answers: this.answers,
        questions: this.imageNames,
      };
      const returnData = await this.submitResults(data);
      console.log(returnData);
      this.alert.message = returnData.data.message;
      this.alert.show = true;
      return;
    },
  },
  head() {
    return {
      title: "Test",
    };
  },
  computed: {
    ...mapGetters({ images: "test/getImageUrls" }),
    ...mapGetters({ imageNames: "test/getImageNames" }),
  },
};
</script>


<style scoped>
.app-container {
  display: flex;
  background-color: black;
  height: 100%;
  overflow: auto;
}

.image-container {
  margin: auto;
}

.start-container {
  height: 90%;
  width: 45%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.end-container {
  background-color: black;
  height: 100%;
  width: 100%;
}

.text-start {
  padding-top: 6rem;
  color: white;
  font-size: x-large;
  text-align: center;
  padding-bottom: 2rem;
}

.text-end {
  padding-top: 6rem;
  color: white;
  font-size: x-large;
  text-align: center;
}

.smailey-image {
  height: 150px;
  width: 150px;
  margin: auto;
}

.counter {
  color: gray;
  font-size: x-large;
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

.alert {
  text-align: center;
  color: white;
}
</style>