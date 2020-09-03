<template>
  <div>
    <div class="categorySelector" v-if="!categorySelected">
    <p class="title">Please Select a Category</p>
   
    <!--(list of categories) -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text=""
      >
        <van-cell
          @click="categoryClicked(category)" v-for="(category, i) in categories"
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

    <div v-if="categorySelected" class="exercises">
      <p class="title">Please Select an Exercise</p>
      <!--   
    <div v-for="(exercise, i) in exercises" :key=i>
        <p>{{exercise}}</p>
    </div>
-->

    <!--(scrollinf through exercises)
      <van-picker
        title="Select Exercise"
        :columns="this.exercises"
        @confirm="onConfirm"
        @Cancel="onCancel"
        @change="onChangeExercise"
      />
-->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text=""
      >
        <van-cell
          @click="exerciseClicked(exercise)" v-for="(exercise, i) in exercises"
          :key="i"
          :title="exercise"
        ></van-cell>
      </van-list>

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
    // onConfirm(value) {
    //   Toast(`Value: ${value}`);
    // },
    // // **this is the method for the scrolling**
    // // onChange(picker, value, index) {
    // //   this.categorySelected = value;
    // //   // console.log(this.categorySelected);

    // //   //exercise list
    // //   const db = firebase.firestore();
    // //   db.collection("exercises")
    // //     .where("category", "==", this.categorySelected)
    // //     .get()
    // //     .then((snapshot) => {
    // //       snapshot.forEach((doc) => {
    // //         let exercise2 = doc.data();
    // //         this.exercises.push(exercise2.name);
    // //         //console.log(this.exercises)
    // //       });
    // //     });
    // //   // console.log(this.exercises);

    // //   Toast(`Value: ${value}, Index: ${index}`);
    // // },
    // onCancel() {
    //   Toast("Cancel");
    // },
    onChangeExercise(picker, value) {
      let thisExercise = value;
      // console.log(thisExercise)
      // console.log(this.time);
      this.$router.push({
        name: "TrackExercise",
        params: { exercise: thisExercise, time: this.time },
      });
    },
    categoryClicked(i){
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
    exerciseClicked(i){
      let thisExercise = i;
      this.$router.push({
        name: "TrackExercise",
        params: { exercise: thisExercise, time: this.time },
      });
    },

  },
};
</script>

<style scoped>
.add {
  padding: 15px;
  text-align: center;
}
.categorySelector {
  margin-top: 10px;
}
.title{
  text-align: center;
}
</style>
