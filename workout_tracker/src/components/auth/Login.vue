<template>
<div class="container">
    <van-button class="login-btn" type="primary" @click="login">Login with Google</van-button>
    <p v-if="feedback">{{feedback}}</p>
</div>
</template>

<script>
//import firebase from '@/firebase/init'
import firebase from'firebase'
import Vue from 'vue';
import { Button } from 'vant';

Vue.use(Button);

 console.log(firebase);
export default {
    name: 'Login',
    data(){
        return{
            token: null,
            user: null,
            feedback: null
        }
    },
    methods: {
        login(){
            //create a google provider object
            const provider = new firebase.auth.GoogleAuthProvider();
            //login with popup window
            firebase.auth().signInWithPopup(provider).then(result => {
                this.token = result.credential.accessToken
                this.user = result.user
                console.log(this.user)
                this.$router.push({ name: "Home" });
            }).catch(err => {
                this.feedback = err.message
            })
        }
      }

     }
</script>

<style scoped>
.login-btn{
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