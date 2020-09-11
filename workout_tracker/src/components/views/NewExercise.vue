<template>
    <div class="container, mainContainer">

            <div v-if="categorySelected" class="exercises">
      <p class="title">Create a New Exercise</p>





    </div>
        

<!--The Cancel Button-->
    <div class="cancel">
      <van-button @click="$router.go(-2)" plain hairline type="primary" color="grey">
        Cancel
      </van-button>
    </div>

    </div>
</template>

<script>
export default {
    name: 'NewExercise',
    data(){
        return{
            categorySelected: this.$route.params.categorySelected,
            time: this.$route.params.time,

        }
    }
}
</script>

<style scoped>
.container{
  margin-left: 10px;
  margin-right: 10px;
}
.add {
  padding: 15px;
  text-align: center;
}
.title {
  text-align: center;
}
.cancel {
  margin-bottom: 20px;
  text-align: center;
  padding: 10px;
}
.mainContainer{
  margin: 1rem;
}
</style>