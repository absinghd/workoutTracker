<template>
<div class="container">
    <div class="logo">
      <img src="@/assets/dumbellLogo.png">
    </div>
</div>
    
</template>

<script>
export default {
    name:'DailyWorkout',
    data(){
        return{

        }
    }
}
</script>

<style scoped>
.logo{
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