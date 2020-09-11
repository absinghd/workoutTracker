import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/layout/Home'
import Login from '@/components/auth/Login'
import AddNewExercise from '@/components/views/AddNewExercise'
import TrackExercise from '@/components/views/TrackExercise'
import ExerciseHistory from '@/components/views/ExerciseHistory'
import NewExercise from '@/components/views/NewExercise'
import firebase from 'firebase'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // meta: {
    //   requiresAuth:true
    // }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/addNewExercise',
    name: 'AddNewExercise',
    component: AddNewExercise
  },
  {
    path: '/track/:exercise',
    name: 'TrackExercise',
    component: TrackExercise
  },
  {
    path: '/history/:exercise',
    name: 'ExerciseHistory',
    component: ExerciseHistory
  },
  {
    path: '/newExercise',
    name: 'NewExercise',
    component: NewExercise
  },
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  //check to see route requires auth
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    //check auth state of user
    let user = firebase.auth().currentUser;
    if (user) {
      //user signed in, proceed to route
      next();
    } else {
      //no user signed in, redirect to login
      console.log('no user');
      next({ name: "Login" });
    }
  } else {
    next();
  }
});

export default router
