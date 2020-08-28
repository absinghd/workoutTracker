<template>
<div class="container">
    <div class="workout">
        <p v-if="exercises">{{this.exercises}}</p>
    </div>
    <div class="logo">
      <img src="@/assets/dumbellLogo.png">
    </div>
</div>
    
</template>

<script>
//import firebase from 'firebase'
import dailyWorkoutCollection from '@/main.js'

export default {
    name:'DailyWorkout',
    data(){
        return{
            time: null,
            user: null,
            exercises:null
        }
    },
    created(){
            db.collection("dailyWorkouts")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
        // let workout = doc.exercises.data()
        // this.exercises.push(workout)
        console.log(doc)
        });
      });
    }
}
</script>

<style scoped>
.logo{
  margin: 0;
  position: absolute;
  top: 30%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
    left: 50%;
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
}
</style>