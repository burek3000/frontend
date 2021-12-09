<template >
  <div class="test-container">
    <v-img class="image" v-show="showImage" :src="images[imageId].url"></v-img>

    <div v-show="showAnswers">
      <div v-for="answer in answers" :key="answer.name">
        <v-btn @click="nextImage()">{{ answer.name }}</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        { url: require("~/assets/images/02F_CA_C.JPG") },
        { url: require("~/assets/images/07F_AN_C.JPG") },
        { url: require("~/assets/images/09F_SA_O.JPG") },
        { url: require("~/assets/images/11F_HA_X.JPG") },
        { url: require("~/assets/images/21M_HA_C.JPG") },
      ],
      imageId: 0,
      showImage: true,
      showAnswers: false,
      answers: [
        { name: "tuga" },
        { name: "sreća" },
        { name: "strah" },
        { name: "bijes" },
        { name: "gađenje" },
        { name: "iznenađenje" },
      ],
    };
  },
  mounted() {
    //setTimeout(this.removeImage, 200);
  },
  methods: {
    removeImage() {
      this.showImage = false;
      this.imageId++;
      this.showAnswers = true;
    },

    nextImage() {
      this.showAnswers = false;
      this.showImage = true;
      setTimeout(this.removeImage, 200);
    },
  },
};
</script>


<style scoped>
.test-container {
  position:fixed;
  width: 50%;
  top: 2rem;
  bottom: 2rem;
  border: 1px solid black;
}

.image {
  background-size: cover;
}
</style>