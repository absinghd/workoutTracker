<template>
  <div>
    <div class="container">

            <div class="exerciseOptions">
      <van-row>
  <van-col @click="goToTracking" span="8">Track</van-col>
  <van-col class="optionSelected" span="8">History</van-col>
  <van-col @click="goToGraph" span="8">Graph</van-col>
</van-row>
    </div>
        
      <div class="exerciseName">
        <p>{{ this.exerciseName }}</p>
      </div>

              
              <div class="history" v-for="(day, i) in setWorkoutDays" :key="i">
                <p class="date">{{ day }}</p>
                
                
               
                <div v-for="(rep, index) in allWorkouts" :key="index">
        
                  <van-grid class="historyData">
                  <a class="weight" v-if="rep.time == day"> 
                  Weight: {{ rep.tracker[0] }} lbs 
                  </a>
                  <a class="reps" v-if="rep.time == day">Reps: {{ rep.tracker[1] }}</a>
                  </van-grid>
            
                </div>
                <br>
              </div>


    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
    name: 'ExerciseHistory',
  data() {
    return {
      user: null,
      exerciseName: this.$route.params.exerciseName,
      exerciseCount:[],
      workoutDays:[],
      historyDate: [],
      name: 'bicky',
      workout: null,
      allWorkouts: [],
      setWorkoutDays:[],
      time: this.$route.params.time,

    };
  },
  created() {
    this.user = firebase.auth().currentUser;
    const db = firebase.firestore();
    const de = db.collection("dailyExercise").where("user_id", "==", this.user.uid);
    de.where("name", "==", this.exerciseName)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.allWorkouts.unshift(doc.data());
          this.workout = doc.data();
          this.exerciseCount.unshift(this.workout.tracker);
          this.workoutDays.unshift(this.workout.time)
        });
        this.setWorkoutDays =new Set(this.workoutDays)
      });
  },
  methods:{
    goToTracking(){
        this.$router.push({ name: "TrackExercise", params:{exerciseName:this.exerciseName, time:this.time} });
    },
    goToGraph(){
        this.$router.push({ name: "Graph", params:{exerciseName:this.exerciseName, time:this.time } });
    },  
  }
};
</script>

<style scoped>

.exerciseName {
  font-size: 20px;
  padding: 20px;
  text-align: center;
}
.container{
    margin-left: 10px;
    margin-right: 10px;
}
.date{
    font-size: 18px;
}
.historyData{
    margin-left: 15%;
}
.reps{
    margin-left: 10%;
    margin-top: 8px;
}
.weight{
    margin-top:8px;
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
</style>