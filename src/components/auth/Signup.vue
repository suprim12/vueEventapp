<template>
<div>
    <div class="container">
        <div class="row">
            <div class="col-md-6 mx-auto">
                <div class="card card-body mt-5 mb-5">
                    <h2 class="card-title">Register</h2>
                    <form>
                       <div class="form-group">
                           <label for="email">Email</label>
                           <input type="email" class="form-control" v-model="email"/>
                       </div>
                       <div class="form-group">
                           <label for="password" >Password</label>
                           <input type="password" class="form-control" v-model="password"/>
                       </div>
                       <button @click="register" type="submit" class="btn btn-success">Register</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import firebase from "firebase";
export default {
  name: "Signup",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    register: function(e) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert(`Account Created for ${this.email}`);
            this.$router.push("/");
          },
          err => console.log(err.message)
        );
      e.preventDefault();
    }
  }
};
</script>
<style scoped>
</style>
