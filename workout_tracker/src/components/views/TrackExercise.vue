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
<van-button plain type="primary" color="blue" class="save" @click="saveExercise">Save</van-button>
<van-button plain type="primary" color="grey" class="cancel">Cancel</van-button>
    </div>

<div class="todayHistory">
    
    <div class="showReps">
        <a>{{ exerciseCount }}</a>
    </div>

</div>

  </div>
</template>

<script>
import firebase from 'firebase'
import Vue from "vue";
import { Stepper, Button } from "vant";

Vue.use(Stepper);
Vue.use(Button);

export default {
  name: "TrackExercise",
  data() {
    return {
      repValue: [],
      weightValue: null,
      exerciseName: this.$route.params.exercise,
      time: this.$route.params.time,
      exerciseCount:[],
      exercises:[]
    };
  },
  methods: {
      
      saveExercise(){
          this.exerciseCount = [this.weightValue ,this.repValue]
          console.log(this.exerciseCount)
          console.log(this.exerciseName);
          console.log(this.time);
          const db = firebase.firestore();
          db.collection('dailyExercise').add({
                    name: this.exerciseName,
                    tracker: this.exerciseCount,
                    time: this.time   
          })

                 
        //   db.collection('dailyExercise').add({
        //             name: this.exerciseName,
        //             weight: this.weightValue,
        //             rep: this.repValue,
        //             time: this.time
          
                    .then(() => {
                    this.repValue = null
                    this.weightValue =null
                })
                
      },
  },
  created(){
      const db = firebase.firestore();
    db.collection("dailyExercise")
      .where("time", "==", this.time)
      //.where("name", "==", this.name)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let workout = doc.data();
          this.exercises.unshift(workout);
          this.exerciseCount = workout.tracker
      //console.log(this.exerciseCount);
  })
})
},
updated(){
    const db = firebase.firestore();
    db.collection("dailyExercise")
      .where("time", "==", this.time)
      //.where("name", "==", this.name)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let workout = doc.data();
          this.exercises.unshift(workout);
          this.exerciseCount = workout.tracker
          if(workout.name == this.exerciseName){
            //   console.log(workout.name);
          }
      //console.log(this.exerciseCount);
  })
})
}
  }
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
.buttons{
    text-align: center;
    padding: 20px;
}
.save{
    padding: 20px;
    margin-right: 20px;
}
.cancel{
    padding: 20px;
    margin-left: 20px;
}
</style>
