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
      <DailyWorkout></DailyWorkout>
 </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue';
import { NavBar } from 'vant';
import DailyWorkout from '@/components/views/DailyWorkouts'


Vue.use(NavBar);
import { Toast } from 'vant';

export default {
  name: 'Home',
  components: {
   DailyWorkout
  },
  methods: {
        onClickLeft() {
      Toast('Here is the day before');
    },
    onClickRight() {
      Toast('Next day');
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
