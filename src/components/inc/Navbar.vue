<template>
    <div>
       <nav class="navbar navbar-expand-sm bg-light navbar-light">
           <div class="container">
            <router-link  to="/" class="navbar-brand">EventApp</router-link>
            <ul class="navbar-nav">
                <li v-if="isLoggedIn"  class="nav-item"> <router-link :to="{name: 'Create'}" tag="a" class="nav-link">Add event</router-link></li>
                <li v-if="!isLoggedIn" class="nav-item"><router-link :to="{name: 'Signup'}" tag="a" class="nav-link">Signup</router-link></li>
                <li v-if="!isLoggedIn" class="nav-item"><router-link :to="{name: 'Signin'}" tag="a" class="nav-link">Signin</router-link></li>
                <button v-if="isLoggedIn" v-on:click="logout" class="btn btn-info">Logout</button>
            </ul>
           </div>
       </nav>
    </div>
</template>
<script>
import firebase from "firebase";
export default {
  name: "Navbar",
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({
            name: "Signin"
          });
        });
    }
  }
};
</script>
<style scoped>
</style>
