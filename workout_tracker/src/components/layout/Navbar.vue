<template>
  <div  v-if="user" class="navbar">
    <nav class="deep-purple">
      <div class="container">

<!-- (Home Button Icon) -->    
    <a v-if="user" class="homeIcon" @click="goHome">Home</a>
       <a v-if="user" @click="goLogout" class="logoutText">Logout</a>

<!-- (Login Icon) 
        <van-icon
          v-if="!user"
          class="loginIcon"
          @click="goLogin"
          name="user-o"
        />
-->

      </div>
    </nav>
  </div>
</template>

<script>
import Vue from "vue";
import { Icon } from "vant";
import firebase from "firebase";
import Login from "@/components/auth/Login";

Vue.use(Icon);

export default {
  name: "Navbar",
  data() {
    return {
      user: Login.user,
    };
  },
  methods: {
    goHome() {
      this.$router.push({ name: "Home" });
    },
    goLogin() {
      this.$router.push({ name: "Login" });
    },
    goLogout() {
      firebase
        .auth()
        .signOut()
        .then(function() {
        });
        this.$router.push({ name: "Login" });
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = firebase.auth().currentUser;
      } else {
        this.user = null;
      }
    });
  },
};
</script>

<style scoped>
.navbar {
  padding: 20px;
  margin-top: 2%px;
background-color: #82bffc;
}
.homeIcon {
  position: absolute;
  float: left;
  margin-left: 40px;
  top: 2%;
  color: white;
}
.logoutText{
  display: block;
  position: absolute;
  float: right;
  margin-left: 60%;
  top: 2%;
  color: white;
}
</style>
