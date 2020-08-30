<template>
  <div class="container">
    <div class="workout">
      <p>selectedTime: {{ this.timePass }}</p>
      <br />
      <br />
      <p>
        todayTime: {{ this.today }}
        <br />
        <br />
        workoutTime:{{ this.workoutTime }}
      </p>
      <!--
        <p v-if="exercises">Curls: <br> {{this.exercises[0].curls}}</p>
        <p v-if="exercises">Chest Flyes: <br> {{this.exercises[0].chest_flyes}}</p>
        <p v-if="exercises">Bench Press: <br> {{this.exercises[0].bench_press}}</p>
        -->
      <button @click="printTime">print time</button>
    </div>
    <div class="logo">
      <img src="@/assets/dumbellLogo.png" />
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { format } from "date-fns";

export default {
  name: "DailyWorkout",
  data() {
    return {
      today: new Date(),
      workoutTime: null,
      user: null,
      exercises: [],
    };
  },
  props: ["timePass"],
  created() {
    this.timePass = format(this.timePass, "PPPP");
    const db = firebase.firestore();
    db.collection("dailyWorkouts")
      .where("time", "==", this.timePass)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let workout = doc.data();
          console.log(workout.time);
          this.workoutTime = workout.time;
          this.exercises.push(workout.exercises);

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
  },
  mounted() {},
  methods: {
    printTime() {
      console.log(this.timePass);
    },
  },
};
</script>

<style scoped>
.logo {
  margin: 0;
  position: absolute;
  top: 75%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  left: 50%;
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
}
</style>
