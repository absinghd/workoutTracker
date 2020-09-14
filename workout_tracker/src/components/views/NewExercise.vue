<template>
  <div class="container, mainContainer">
    <div v-if="categorySelected" class="exercises">
      <p class="title">Create a New Exercise</p>
<van-form>
  <van-field
    v-model="title"
    name="title"
    label="Name"
    placeholder="exercise name"
    :rules="[{ required: true, message: 'exercise name is required' }]"
  />
  <van-field
    v-model="category"
    type="category"
    name="category"
    label="Category"
    placeholder="category"
    :rules="[{ required: true, message: 'category is required' }]"
  />

    <div class="input">
      <!--The Cancel Button-->
      <div class="cancel">
        <van-button
          @click="$router.go(-2)"
          plain
          hairline
          type="primary"
          color="grey"
        >
          Cancel
        </van-button>
      </div>
     
      <!--The Save Button-->
      <van-button
        plain
        type="primary"
        color="#1DB3FD"
        class="save"
        @click="saveNewExercise"
      >
        Save
      </van-button>
    </div>
</van-form>

    </div>

  </div>
</template>

<script>
import firebase from "firebase";
import Vue from "vue";
import { Button, Form, Field, Search, Toast} from "vant";

Vue.use(Button);
Vue.use(Form);
Vue.use(Field);
Vue.use(Search);
Vue.use(Toast);


export default {
  name: "NewExercise",
  data() {
    return {
      categorySelected: this.$route.params.categorySelected,
      time: this.$route.params.time,
      title: null,
      category: this.$route.params.categorySelected,
      feedback:null,
    };
  },
  methods: {
    saveNewExercise() {
        const db = firebase.firestore();
      console.log(this.title);
                if(this.title){
              this.feedback = null
              db.collection('exercises').add({
                  name: this.title,
                  category: this.category
              }).then(() => {
              this.$router.push({
        name: "TrackExercise",
        params: { exercise:this.title, time: this.time },
      })
              }).catch(err =>{
                  console.log(err)
              })
          } else {
              this.feedback = 'You must enter a exercise title'
          }
    //
    const cats = db.collection('categories').where('name', '==', 'this.category')
    if(!cats){
        Toast('newCatecory')
    }
     
    },
  },
};
</script>

<style scoped>
.container {
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
.mainContainer {
  margin: 1rem;
}
.cancel {
  position: absolute;
  margin-left: 25%;
  margin-top: 10%;
}
.save {
  position: absolute;
  margin-left: 50%;
  margin-top: 10%;
}
.name {
  margin: 5px;
}
</style>
