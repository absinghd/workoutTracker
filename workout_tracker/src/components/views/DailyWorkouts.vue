<template>
<div class="container">
    <div class="workout">
        <p>{{this.time}}</p> <br> <br>
          <p>{{this.today}} <br> {{this.workoutTime}}</p>
        <p v-if="exercises">Curls: <br> {{this.exercises[0].curls}}</p>
        <p v-if="exercises">Chest Flyes: <br> {{this.exercises[0].chest_flyes}}</p>
        <p v-if="exercises">Bench Press: <br> {{this.exercises[0].bench_press}}</p>
        <button @click="printTime">print time</button>
    </div>
    <div class="logo">
      <img src="@/assets/dumbellLogo.png">
    </div>
</div>
    
</template>

<script>
import firebase from 'firebase'
import { fromUnixTime } from 'date-fns'

export default {
    name:'DailyWorkout',
    data(){
        return{
            today: new Date(),
            workoutTime: null,
            user: null,
            exercises:[]
        }
    },
    props:[
        'time'
    ],
    created(){
        const db = firebase.firestore()
            db.collection("dailyWorkouts")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
        let workout = doc.data()
        this.exercises.push(workout.exercises)
        this.workoutTime = workout.time.seconds
        this.workoutTime = fromUnixTime(this.workoutTime)
        });
      });
    },
    mounted(){

    },
    methods: {
        printTime(){
            console.log(this.time)
        }
    }
}
</script>

<style scoped>
.logo{
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