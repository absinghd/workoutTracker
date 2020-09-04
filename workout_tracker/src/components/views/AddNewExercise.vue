<template>
  <div class="container">
    <div class="categorySelector" v-if="!categorySelected">
      <p class="title">Select a Category</p>

      <!-- (list of categories) -->
      <van-list v-model="loading" :finished="finished" finished-text="">
        <van-cell
          @click="categoryClicked(category)"
          v-for="(category, i) in categories"
          :key="i"
          :title="category"
        ></van-cell>
      </van-list>

      <!--(scrolling through each category)
      <van-picker
        title="Select Category"
        :columns="this.categories"
        @confirm="onConfirm"
        @Cancel="onCancel"
        @change="onChange"
      />
-->
    </div>

<!-- (list of exercises) -->
    <div v-if="categorySelected" class="exercises">
      <p class="title">Select an Exercise</p>

      <van-list v-model="loading" :finished="finished" finished-text="">
        <van-icon name="arrow-left" @click="goBackToCategories" />
        <van-cell
          @click="exerciseClicked(exercise)"
          v-for="(exercise, i) in exercises"
          :key="i"
          :title="exercise"
        ></van-cell>
      </van-list>
    </div>

<!--The Cancel Button-->
    <div class="cancel">
      <van-button @click="$router.go(-1)" plain hairline type="primary" color="grey">
        Cancel
      </van-button>
    </div>

<!--(icon for adding)
    <div class="add">
      <img src="@/assets/add_wCircle.png" />
      <p>add new exercise</p>
    </div>
-->
  </div>
</template>

<script>
import firebase from "firebase";
import Vue from "vue";
import { Picker, List, Cell } from "vant";

Vue.use(Picker);
Vue.use(List);
Vue.use(Cell);

export default {
  name: "AddNewExercise",
  data() {
    return {
      exercises: [],
      categories: [],
      categorySelected: null,
      categorydb: null,
      time: this.$route.params.time,
      loading: false,
      finished: true,
    };
  },
  created() {
    // console.log(this.time);
    const db = firebase.firestore();
    db.collection("categories")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.categories.push(doc.data().name);
        });
      });

    //console.log(this.categories);
  },
  methods: {
    onChangeExercise(picker, value) {
      let thisExercise = value;
      // console.log(thisExercise)
      // console.log(this.time);
      this.$router.push({
        name: "TrackExercise",
        params: { exercise: thisExercise, time: this.time },
      });
    },
    categoryClicked(i) {
      this.categorySelected = i;
      const db = firebase.firestore();
      db.collection("exercises")
        .where("category", "==", this.categorySelected)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            let exercise2 = doc.data();
            this.exercises.push(exercise2.name);
          });
        });
    },
    exerciseClicked(i) {
      let thisExercise = i;
      this.$router.push({
        name: "TrackExercise",
        params: { exercise: thisExercise, time: this.time },
      });
    },
    goBackToCategories() {
      this.categorySelected = null;
    },
  },
};
</script>

<style scoped>
.container{
  margin-left: 10px;
  margin-right: 10px;
}
.add {
  padding: 15px;
  text-align: center;
}
.categorySelector {
  margin-top: 10px;
}
.title {
  text-align: center;
}
.cancel {
  margin-bottom: 20px;
  text-align: center;
  padding: 10px;
}
</style>
