<template>
  <div class="mainContainer">

    <div class="exerciseOptions">
      <van-row>
  <van-col class="optionSelected" span="12">Track</van-col>
  <van-col @click="goToHistory" span="12">History</van-col>
</van-row>
    </div>



    <div class="counters">
      <div class="exerciseName">
        <p>{{ this.exerciseName }}</p>
      </div>
      <div class="weight">
        <a>weight</a>
        <van-stepper
          min="0"
          default-value="0"
          v-model="weightValue"
          step="5"
          input-width="55px"
          button-size="42px"
        />
      </div>
      <div class="reps">
        <a>rep count</a>
        <van-stepper v-model="repValue" input-width="55px" button-size="42px" />
      </div>
    </div>

    <div class="buttons">
            <van-button plain type="primary" color="grey" class="cancel" @click="$router.go(-2)">
        Cancel
      </van-button>
      
      <van-button
        plain
        type="primary"
        color="blue"
        class="save"
        @click="saveExercise"
      >
        Save
      </van-button>

    </div>


    <div class="todayHistory">
      <van-divider   :style="{ color: '#2a2a2a', borderColor: '#2a2a2a', padding: '0 16px' }">Today's History</van-divider>
      <div v-if="exerciseCount">
        <div v-for="(exercise, i) in exerciseCount" :key="i" class="showReps">
          <a>weight:{{ exercise[0] }}, &nbsp; reps:{{ exercise[1] }}</a>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Vue from "vue";
import { Stepper, Button, Divider,Col, Row } from "vant";

Vue.use(Stepper);
Vue.use(Button);
Vue.use(Divider);
Vue.use(Col);
Vue.use(Row);

export default {
  name: "TrackExercise",
  data() {
    return {
      repValue: [],
      weightValue: [],
      exerciseName: this.$route.params.exercise,
      time: this.$route.params.time,
      exerciseCount: [],
      exerciseAmount: [],
      user:null
    };
  },
  methods: {
    saveExercise() {
      this.exerciseCount = [];
      this.exerciseAmount = [this.weightValue, this.repValue];
      // console.log(this.exerciseCount);
      // console.log(this.exerciseName);
      // console.log(this.time);
      const db = firebase.firestore();
      db.collection("dailyExercise")
        .add({
          name: this.exerciseName,
          tracker: this.exerciseAmount,
          time: this.time,
          user_id:this.user.uid
        })
        .then(() => {
          this.repValue = [];
          this.weightValue = [];
          this.exerciseAmount = [];

          const de = db.collection("dailyExercise").where("time", "==", this.time);
          de.where("name", "==", this.exerciseName)
            .get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                let workout = doc.data();
                this.exerciseCount.unshift(workout.tracker);
              });
            });
        });
        
        console.log(this.exerciseCount);
    },
    goToHistory(){
        this.$router.push({ name: "ExerciseHistory", params:{exerciseName:this.exerciseName, time:this.time } });
    },
  },
  created() {
    const db = firebase.firestore();
    this.user = firebase.auth().currentUser;
    const de = db.collection("dailyExercise").where("time", "==", this.time);
    de.where("name", "==", this.exerciseName)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let workout = doc.data();
          this.exerciseCount.unshift(workout.tracker);
          // console.log(workout.tracker);
          //console.log(this.exerciseCount);
        });
      });
  },
};
</script>

<style scoped>
.exerciseName {
  font-size: 20px;
}
.counters {
  text-align: center;
}
.weight {
  padding: 5px;
}
.reps {
  padding-top: 10px;
}
.buttons {
  text-align: center;
  padding: 20px;
}
.save {
  padding: 20px;
  margin-left: 20px;
  margin-top:10%;
}
.cancel {
  padding: 20px;
  margin-right: 20px;
  margin-top:10%;

}
.todayHistory {
  text-align: center;
}
.showReps {
  padding: 8px;
}
.historyTitle{
  padding: 5px;
}
.exerciseOptions{
  margin-top: 15px;
  text-align: center;
  margin-left: 10px;
  margin-right: 10px;
  background-color: #f7f8f7;
  font-size: 25px;
}
.optionSelected{
  background-color: #d3d3d3;
}
.mainContainer{
  margin-top: 5%;
}
</style>
