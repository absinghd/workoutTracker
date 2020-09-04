<template>
  <div>
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
          input-width="40px"
          button-size="32px"
        />
      </div>
      <div class="reps">
        <a>rep count</a>
        <van-stepper v-model="repValue" input-width="40px" button-size="32px" />
      </div>
    </div>

    <div class="buttons">
      <van-button
        plain
        type="primary"
        color="blue"
        class="save"
        @click="saveExercise"
      >
        Save
      </van-button>
      <van-button plain type="primary" color="grey" class="cancel" @click="$router.go(-2)">
        Cancel
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
import { Stepper, Button, Divider } from "vant";

Vue.use(Stepper);
Vue.use(Button);
Vue.use(Divider);


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
  },
  created() {
    const db = firebase.firestore();
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
  margin-right: 20px;
}
.cancel {
  padding: 20px;
  margin-left: 20px;
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
</style>
