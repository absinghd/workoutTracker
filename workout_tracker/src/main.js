import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import firebase from 'firebase'
import 'firebase/firestore'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  // Your web app's Firebase configuration
  created() {var firebaseConfig = {
    apiKey: "AIzaSyDQvrWgKkw4S2cyLFPmNORCLq6ihk2msrw",
    authDomain: "workouttracker0-0.firebaseapp.com",
    databaseURL: "https://workouttracker0-0.firebaseio.com",
    projectId: "workouttracker0-0",
    storageBucket: "workouttracker0-0.appspot.com",
    messagingSenderId: "154031917708",
    appId: "1:154031917708:web:ec181815bea97c58cf49a9"
  };
  firebase.initializeApp(firebaseConfig)
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

}
  

}).$mount('#app')
const db = firebase.firestore()

//collection refrences
const dailyWorkoutCollection = db.collection('dailyWorkouts')

export default{
  db,
  dailyWorkoutCollection
}
