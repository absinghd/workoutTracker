<template>
  <div class="navbar">
    <nav class="deep-purple" darken-1>
      <div class="container">
          <van-icon class="homeIcon" @click="goHome" name="home-o" />
          <van-icon class="loginIcon" @click="goLogin" name="user-circle-o" />
      </div>
    </nav>
  </div>
</template>

<script>
import Vue from 'vue';
import { Icon } from 'vant';

Vue.use(Icon);

export default {
    name: 'Navbar',
    data(){
        return{

        }
    },
    methods:{
        goHome(){
             this.$router.push({ name: "Home" })
        },
        goLogin(){
            this.$router.push({name: "Login"})
        }
    }
}
</script>
<style scoped>
.homeIcon{
    display: block;
    position: relative;
    float: left;
    margin-left: 40px;
    top: 8%;
}
.loginIcon{
    display: block;
    position: relative;
    float: right;
    margin-right: 40px;
    top: 8%;

}
</style>