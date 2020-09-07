<template>
  <div class="home">
    <div class="daySelector">
      <van-nav-bar class="datePicker"
        
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <template #title>
          <a v-if="timePass == today">Today</a>
          <a v-if="timePass == yesterday">Yesterday</a>
          <a v-if="timePass == tomorrow">Tomorrow</a>
          <a v-if="timePass != today && timePass !=yesterday && timePass!= tomorrow">{{timePass}}</a>
        </template>
          
        <template #right>
          <van-icon name="arrow" />
        </template>

      </van-nav-bar>
      <br>

        <div @click="goAddNewExercise" class="add">
          <img src="@/assets/add_wCircle.png" /><br>
          <a>add new workout</a>
        </div><br>
      <!--
      <van-nav-bar
        title= Today
        left-text="<"
        right-text=">"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      ></van-nav-bar>
-->
    </div>

<van-swipe @change="onClickRight" indicator-color="white">
   <van-swipe-item>
    <div>
      <div class="container">
        <div class="workout">

          <div v-if="workoutTime">

            <!--(this is where I try showing each exercise seperately)-->
            <div class="theWork">
              <div v-for="(exerciseName, i) in allExercises" :key="i">

                <router-link :to="{ name: 'TrackExercise', params: {exercise: exerciseName, time:timePass}}">
                <p class="name">{{ exerciseName }}</p>
                </router-link>
                
                
               
                <div v-for="(exercise, index) in exercises" :key="index">
                  
                  <van-grid >
                    <!--
                  <p class="reps" v-if="exercise.name == exerciseName">
                    Weight: {{ exercise.tracker[0] }} lbs &nbsp;|&nbsp; Reps:{{
                      exercise.tracker[1]
                    }}
                  </p>
-->
                  <a class="reps" v-if="exercise.name == exerciseName"> 
                  {{ exercise.tracker[0] }} lbs
                  </a>
                  <a class="reps" v-if="exercise.name == exerciseName">
                  {{ exercise.tracker[1] }} reps
                  </a>
                  </van-grid>
            
                </div>
                <br>
              </div>
            </div>
            <br />
          </div>

        </div>
<!-- THIS IS WHERE I CAN TEST MY SHIT -->



<!--the LOGO
        <div class="logo">
          <img src="@/assets/dumbellLogo.png" />
        </div>
-->
      </div>
    </div>
    </van-swipe-item>
      <van-swipe-item>

           <div>
      <div class="container">
        <div class="workout">

          <div v-if="workoutTime">

            <!--(this is where I try showing each exercise seperately)-->
            <div class="theWork">
              <div v-for="(exerciseName, i) in allExercises" :key="i">
                <p class="name">{{ exerciseName }}</p>
                
                
               
                <div v-for="(exercise, index) in exercises" :key="index">
                  
                  <van-grid >
                    <!--
                  <p class="reps" v-if="exercise.name == exerciseName">
                    Weight: {{ exercise.tracker[0] }} lbs &nbsp;|&nbsp; Reps:{{
                      exercise.tracker[1]
                    }}
                  </p>
-->
                  <a class="reps" v-if="exercise.name == exerciseName"> 
                  {{ exercise.tracker[0] }} lbs
                  </a>
                  <a class="reps" v-if="exercise.name == exerciseName">
                  {{ exercise.tracker[1] }} reps
                  </a>
                  </van-grid>
            
                </div>
                <br>
              </div>
            </div>
            <br />
          </div>

        </div>
<!-- THIS IS WHERE I CAN TEST MY SHIT -->


      </div>
    </div> 
      </van-swipe-item>

    </van-swipe>
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
import { NavBar, Grid, GridItem, Swipe, SwipeItem} from "vant";
import { addDays, format } from "date-fns";
import firebase from "firebase";

Vue.use(NavBar);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Swipe);
Vue.use(SwipeItem);




export default {
  name: "Home",
  components: {},
  data() {
    return {
      time: new Date(),
      timePass: new Date(),
      today: new Date(),
      workoutTime: null,
      user:null,
      exercises: [],
      exerciseName: null,
      allExercises: [],
      list:[0,1,2,3,4,5,6],
      container:null,
      yesterday: null,
      tomorrow: null,
    };
  },
  methods: {
    onSwipe() {
      this.allExercises = [];
      this.exercises = [];
      this.time = addDays(this.time, 1);
      this.timePass = format(this.time, "PPPP");
      //console.log(this.time)
      // *use this to pass in child's methods* this.$refs.form.printTime()

      //update
      const db = firebase.firestore();
      db.collection("dailyExercise")
        .where("time", "==", this.timePass)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            let workout = doc.data();
            this.exercises.unshift(workout);
            // console.log(workout.time);
            // console.log(this.exercises);
            this.workoutTime = workout.time;
          });
        });
      //**reorganize the data */
      db.collection("dailyExercise")
        .where("time", "==", this.timePass)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            let exercises = doc.data();
            // console.log(exercises);
            // console.log('space');
            if (this.allExercises.includes(exercises.name)) {
              //console.log(exercises.name);
            } else {
              this.allExercises.push(exercises.name);
              //console.log(this.allExercises);
              // console.log('hello');
            }
          });
        });
    },
    onClickLeft() {
      this.allExercises = [];
      this.exercises = [];
      this.time = addDays(this.time, -1);
      this.timePass = format(this.time, "PPPP");
      //console.log(this.time)

      //update
      const db = firebase.firestore();
      db.collection("dailyExercise")
        .where("time", "==", this.timePass)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            let workout = doc.data();
            this.exercises.unshift(workout);
            // console.log(workout.time);
            // console.log(this.exercises);
            this.workoutTime = workout.time;
          });
        });

      //**reorganize the data */
      db.collection("dailyExercise")
        .where("time", "==", this.timePass)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            let exercises = doc.data();
            // console.log(exercises);
            // console.log('space');
            if (this.allExercises.includes(exercises.name)) {
              //console.log(exercises.name);
            } else {
              this.allExercises.push(exercises.name);
              //console.log(this.allExercises);
              // console.log('hello');
            }
          });
          //console.log(this.allExercises);
        });
    },
    onClickRight() {
      this.allExercises = [];
      this.exercises = [];
      this.time = addDays(this.time, 1);
      this.timePass = format(this.time, "PPPP");
      //console.log(this.time)
      // *use this to pass in child's methods* this.$refs.form.printTime()

      //update
      const db = firebase.firestore();
      db.collection("dailyExercise")
        .where("time", "==", this.timePass)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            let workout = doc.data();
            this.exercises.unshift(workout);
            // console.log(workout.time);
            // console.log(this.exercises);
            this.workoutTime = workout.time;
          });
        });
      //**reorganize the data */
      db.collection("dailyExercise")
        .where("time", "==", this.timePass)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            let exercises = doc.data();
            // console.log(exercises);
            // console.log('space');
            if (this.allExercises.includes(exercises.name)) {
              //console.log(exercises.name);
            } else {
              this.allExercises.push(exercises.name);
              //console.log(this.allExercises);
              // console.log('hello');
            }
          });
          //console.log(this.allExercises);
        });
    },
    printTime() {
      console.log(this.timePass);
    },
    update() {
      console.log("updated");
    },
    goAddNewExercise() {
      this.$router.push({
        name: "AddNewExercise",
        params: { time: this.timePass },
      });
      // console.log(this.timePass);
    },
    // goToExerciseTracker(name){
    //   this.$router.push({ 
    //     name: "TrackExercise/:id",
    //     params:{user: this.user} });
    // }
  },
  created() {
    this.timePass = format(this.timePass, "PPPP");
    this.today = format(this.today, "PPPP");
    this.user = firebase.auth().currentUser
    this.yesterday = addDays(new Date(), -1)
    this.yesterday = format(this.yesterday, "PPPP");
    this.tomorrow = addDays(new Date(), 1);
    this.tomorrow = format(this.tomorrow, "PPPP");
    //this.timePass = "Monday, August 31st, 2020"
    const db = firebase.firestore();
    db.collection("dailyExercise")
      .where("time", "==", this.timePass)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let workout = doc.data();
          this.exercises.unshift(workout);
          // console.log(workout.time);
          // console.log(this.exercises);
          this.workoutTime = workout.time;
          this.exerciseName = workout.name;
          //this.exercises.push(workout.exercises);

          // print out the date from unix
          //   var a = this.timePass
          //   var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          //   var year = a.getFullYear();
          //   var month = months[a.getMonth()];
          //   var date = a.getDate();
          //   var timestamp = date + ' ' + month + ' ' + year
          //   console.log(timestamp);
        });
      });
    //**reorganize the data */
    db.collection("dailyExercise")
      .where("time", "==", this.timePass)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let exercises = doc.data();
          // console.log(exercises);
          // console.log('space');
          if (this.allExercises.includes(exercises.name)) {
            //console.log(exercises.name);
          } else {
            this.allExercises.push(exercises.name);
            //console.log(this.allExercises);
            // console.log('hello');
          }
        });
        //console.log(this.allExercises);
      });
  },
    mounted() {
    this.container = this.$refs.container;
  },
};
</script>

<style scoped>
.home {
  align-items: center;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
}
.logo {
  margin-top: 10px;
  margin-left: 170px;
  top: 75%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  left: 50%;
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
}
.name {
  font-size: 20px;
  margin: 0px;
}
.add {
  padding: 15px;
  text-align: center;
}
.theWork {
  margin-left: 10px;
  margin-right: 10px;

}
.reps {
  margin:0px;
  margin-left: 20%;
  padding: 8px;
  text-align: center;
}
.datePicker{
  background-color: #f7f8f7;
}
</style>
