<template>
  <div>
    <p>add new</p>
    <div>
      <van-picker
        title="Select Category"
        :columns="this.categories"
        @confirm="onConfirm"
        @Cancel="onCancel"
        @change="onChange"
      />
    </div>

    <div class="add">
      <img src="@/assets/add_wCircle.png" />
      <p>add new exercise</p>
    </div>

  </div>
</template>

<script>
import firebase from "firebase";
import Vue from "vue";
import { Picker, Toast } from "vant";

Vue.use(Picker);

export default {
  name: "AddNewExercise",
  data() {
    return {
      exercises: null,
      columns: ["Chest", "Biceps", "Triceps", "Back", "Legs"],
      categories: []
    };
  },
  created() {
    const db = firebase.firestore();
    db.collection("categories").get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            this.categories.push(doc.data().name)
        })
    })


    //console.log(this.categories);
  },
  methods: {
    onConfirm(value, index) {
      Toast(`Value: ${value}, Index: ${index}`);
    },
    onChange(picker, value, index) {
      Toast(`Value: ${value}, Index: ${index}`);
    },
    onCancel() {
      Toast("Cancel");
    },
  },
};
</script>

<style scoped>
.add{
    padding: 15px;
    text-align: center;
}
</style>
