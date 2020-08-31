import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/layout/Home'
import Login from '@/components/auth/Login'
import AddNewExercise from '@/components/views/AddNewExercise'
import TrackExercise from '@/components/views/TrackExercise'

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
    path: '/trackExercise',
    name: 'TrackExercise',
    component: TrackExercise
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
