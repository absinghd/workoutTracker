import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/layout/Home'
import Login from '@/components/auth/Login'
import AddNewExercise from '@/components/views/AddNewExercise'
import TrackExercise from '@/components/views/TrackExercise'
import ExerciseHistory from '@/components/views/ExerciseHistory'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
