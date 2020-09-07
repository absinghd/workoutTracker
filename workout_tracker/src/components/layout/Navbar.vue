<template>
  <div class="navbar">
    <nav class="deep-purple" darken-1>
      <div class="container">

<!-- (Home Button Icon)     
    <van-icon v-if="user" class="homeIcon" @click="goHome" name="home-o" />
-->
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
  padding: 12px;
  margin-top: 10px;
}
.homeIcon {
  display: block;
  position: relative;
  float: left;
  margin-left: 40px;
  top: 8%;
}
.loginIcon {
  display: block;
  position: relative;
  float: right;
  margin-right: 40px;
  top: 8%;
}
.logoutText{
  display: block;
  position: relative;
  float: right;
  margin-right: 40px;
  top: 8%;
}
</style>
