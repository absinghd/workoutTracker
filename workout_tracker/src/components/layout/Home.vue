<template>
  <div class="home">
    <div class="navbar">
          <van-nav-bar title="Today"
  left-text="<"
  right-text=">"
  @click-left="onClickLeft"
  @click-right="onClickRight">
      </van-nav-bar>
    </div>
 <div>
      <DailyWorkout :timePass="timePass" ref="form"></DailyWorkout>
 </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue';
import { NavBar } from 'vant';
import { addDays, format } from 'date-fns'
import DailyWorkout from '@/components/views/DailyWorkouts'


Vue.use(NavBar);

export default {
  name: 'Home',
  components: {
   DailyWorkout
  },
  data(){
    return{
      time: new Date (),
      timePass: new Date()
    }
  },
  methods: {
        onClickLeft() {
        this.time = addDays((this.time), -1)
        this.timePass = format((this.time), 'PPPP')
        //console.log(this.time)
    },
    onClickRight() {
        this.time = addDays((this.time), 1)
        this.timePass = format((this.time), 'PPPP')
        //console.log(this.time)  
        // *use this to pass in child's methods* this.$refs.form.printTime()
        }
}
}
</script>

<style scoped>
.home{
  align-items: center;
  margin-top: 10px;
}
</style>
