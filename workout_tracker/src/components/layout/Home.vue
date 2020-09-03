<template>
  <div class="home">
    <div class="daySelector">
      <van-nav-bar
        title="Today"
        left-text="<"
        right-text=">"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      ></van-nav-bar>
    </div>

    <div>
      <div class="container">
        <div class="workout">
          <p>selectedTime: {{ this.timePass }}</p>
          <br />

          <div v-for="(exerciseName, i) in allExercises" :key="i">
            <div v-for="(exercise, index) in exercises" :key="index">
              <a v-if="exerciseName = exercise.name" > {{exerciseName}}{{exercise.tracker[0]}}</a>
            </div>
          </div>

          <br />


          <div v-if="workoutTime">
            workoutTime:{{ this.workoutTime }}

            <div
              class="theWork"
              v-for="(exercise, index) in exercises"
              :key="index"
            >
              <p class="name">{{ exercise.name }}</p>
              <a>Weight: {{ exercise.tracker[0] }} lbs</a>
              &nbsp;|&nbsp;
              <a>Reps: {{ exercise.tracker[1] }}</a>
              <br />
            </div>
          </div>

          <button @click="printTime">print time</button>
        </div>

        <div class="add">
          <img @click="goAddNewExercise" src="@/assets/add_wCircle.png" />
          <p>add new workout</p>
        </div>

        <div class="logo">
          <img src="@/assets/dumbellLogo.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
import { NavBar } from "vant";
import { addDays, format } from "date-fns";
import firebase from "firebase";

Vue.use(NavBar);

export default {
  name: "Home",
  components: {},
  data() {
    return {
      time: new Date(),
      timePass: new Date(),
      today: new Date(),
      workoutTime: null,
      user: null,
      exercises: [],
      exerciseName: null,
      allExercises: [],
    };
  },
  methods: {
    onClickLeft() {
      this.exercises = [];
      this.time = addDays(this.time, -1);
      this.timePass = format(this.time, "PPPP");
      //console.log(this.time)

      //update
      const db = firebase.firestore();
      db.collection("dailyExercise")
        .where("time", "==", this.timePass)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            let workout = doc.data();
            this.exercises.unshift(workout);
            // console.log(workout.time);
            // console.log(this.exercises);
            this.workoutTime = workout.time;
          });
        });
    },
    onClickRight() {
      this.exercises = [];
      this.time = addDays(this.time, 1);
      this.timePass = format(this.time, "PPPP");
      //console.log(this.time)
      // *use this to pass in child's methods* this.$refs.form.printTime()

      //update
      const db = firebase.firestore();
      db.collection("dailyExercise")
        .where("time", "==", this.timePass)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            let workout = doc.data();
            this.exercises.unshift(workout);
            // console.log(workout.time);
            // console.log(this.exercises);
            this.workoutTime = workout.time;
          });
        });
    },
    printTime() {
      console.log(this.timePass);
    },
    update() {
      console.log("updated");
    },
    goAddNewExercise() {
      this.$router.push({
        name: "AddNewExercise",
        params: { time: this.timePass },
      });
      // console.log(this.timePass);
    },
  },
  created() {
    this.timePass = format(this.timePass, "PPPP");
    //this.timePass = "Monday, August 31st, 2020"
    const db = firebase.firestore();
    db.collection("dailyExercise")
      .where("time", "==", this.timePass)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let workout = doc.data();
          this.exercises.unshift(workout);
          // console.log(workout.time);
          // console.log(this.exercises);
          this.workoutTime = workout.time;
          this.exerciseName = workout.name;
          //this.exercises.push(workout.exercises);

          // print out the date from unix
          //   var a = this.timePass
          //   var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          //   var year = a.getFullYear();
          //   var month = months[a.getMonth()];
          //   var date = a.getDate();
          //   var timestamp = date + ' ' + month + ' ' + year
          //   console.log(timestamp);
        });
      });
    db.collection("exercises")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let exercises = doc.data();
          this.allExercises.push(exercises.name);
          // console.log(this.allExercises);
        });
      });
  },
};
</script>

<style scoped>
.home {
  align-items: center;
  margin-top: 10px;
}
.logo {
  margin-top: 10px;
  margin-left: 170px;
  top: 75%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  left: 50%;
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
}
.name {
  font-size: 20px;
  margin: 0px;
  text-align: center;
}
.add {
  padding: 15px;
  text-align: center;
}
.theWork {
  margin-left: 10px;
}
</style>
