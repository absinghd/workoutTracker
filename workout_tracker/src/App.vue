<template>
  <div id="app">
    <div id="nav">
      <Navbar></Navbar>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar'

export default {
  name: 'App',
  components: {
    Navbar,
  },
  computed:{
    userA() {
      return this.$store.getters.getUserA;
    },
}
} 
</script>

<style>

</style>
