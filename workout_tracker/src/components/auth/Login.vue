<template>
<div class="container">
    <button @click="login">Login with Google</button>
    <p v-if="feedback">{{feedback}}</p>
</div>
</template>

<script>
import firebase from '@/firebase/init'
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
    // methods: {
    //     login(){
    //         const provider = new firebase.auth.GoogleAuthProvider();
    //         firebase.auth().signInWithPopup(provider).then(function(result) {
    //             console.log(result);
    //         // This gives you a Google Access Token. You can use it to access the Google API.
    //         this.token = result.credential.accessToken;
    //         // The signed-in user info.
    //         this.user = result.user;
    //     }).catch(error => {
    //         // Handle Errors here.
    //         this.feedback = error.message
    //         })
    //     }
    //     }
     }
</script>