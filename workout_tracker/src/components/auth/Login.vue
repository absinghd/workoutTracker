<template>
<div class="container">
    <button @click="login">Login with Google</button>
    <p v-if="feedback">{{feedback}}</p>
</div>
</template>

<script>
//import firebase from '@/firebase/init'
import firebase from'firebase'

 console.log(firebase);
export default {
    name: 'Login',
    data(){
        return{
            token: null,
            user: null,
            feedback: null
        }
    },
    methods: {
        login(){
            //create a google provider object
            const provider = new firebase.auth.GoogleAuthProvider();
            //login with popup window
            firebase.auth().signInWithPopup(provider).then(result => {
                this.token = result.credential.accessToken
                this.user = result.user
                console.log(this.user)
            }).catch(err => {
                this.feedback = err.message
            })
        }
      }

     }
</script>