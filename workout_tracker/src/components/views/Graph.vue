<template>
    <div>
        
            <div class="exerciseOptions">
      <van-row>
  <van-col @click="goToTracking" span="8">Track</van-col>
  <van-col @click="goToHistory" span="8">History</van-col>
  <van-col class="optionSelected" span="8">Graph</van-col>
</van-row>
    </div>

    </div>
</template>


<script>
export default {
    name: 'Graph',
    data(){
        return{
      exerciseName: this.$route.params.exercise,
      time: this.$route.params.time,


        }
    },
    methods:{
    goToTracking(){
        this.$router.push({ name: "TrackExercise", params:{exerciseName:this.exerciseName, time:this.time } });
    },
    goToHistory(){
        this.$router.push({ name: "ExerciseHistory", params:{exerciseName:this.exerciseName,time:this.time } });
    },  
    }
}
</script>

<style scoped>
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