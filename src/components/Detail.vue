<template>
  <div class="hello">
    <h1 class="text-lead m-5 text-center">Detail Page</h1>
    <div class="container">
      <div class="row">
        <div class="col-md-10 mx-auto">
            <div class="card card-body m-5">
              <h4 class="card-title">{{title}}</h4>
              <p>{{longdesc}}</p>
              <span>{{startdate}} - {{enddate}}</span>
              <span class="text-lead mb-5">{{available}} Sits available</span>
              <button @click="updateEvent" class="btn btn-block btn-success" v-once>Apply now</button>
              <div class="row mt-5">
                <div class="col">
                   <button v-if="isLoggedIn" @click="deleteEvent" class="btn btn-block btn-danger">Delete Event</button>
                </div>
                <div class="col">
                   <router-link v-if="isLoggedIn" :to="{name:'Edit',params:{event_id:event_id}}" class="btn btn-block btn-primary">Edit Event</router-link>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "./fbInit.js";
import firebase from "firebase";
export default {
  name: "Detail",
  data() {
    return {
      event_id: null,
      title: null,
      shortdesc: null,
      longdesc: null,
      image: null,
      available: null,
      startdate: null,
      enddate: null,
      isLoggedIn: false
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
    }
  },
  beforeRouteEnter(to, from, next) {
    db
      .collection("events")
      .where("event_id", "==", to.params.event_id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            (vm.event_id = doc.data().event_id),
              (vm.title = doc.data().title),
              (vm.longdesc = doc.data().longdesc),
              (vm.startdate = doc.data().startdate),
              (vm.enddate = doc.data().enddate),
              (vm.available = doc.data().available),
              (vm.image = doc.data().image);
          });
        });
      });
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      db
        .collection("events")
        .where("event_id", "==", this.$route.params.event_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            (this.event_id = doc.data().event_id),
              (this.title = doc.data().title),
              (this.shortdesc = doc.data().shortdesc),
              (this.longdesc = doc.data().longdesc),
              (this.available = doc.data().available),
              (this.image = doc.data().image),
              (this.startdate = doc.data().startdate),
              (this.enddate = doc.data().enddate);
          });
        });
    },
    deleteEvent() {
      if (confirm("Are you sure")) {
        db
          .collection("events")
          .where("event_id", "==", this.$route.params.event_id)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.delete();
              this.$router.push("/");
            });
          });
      }
    },
    updateEvent() {
      db
        .collection("events")
        .where("event_id", "==", this.$route.params.event_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref
              .update({
                available: this.available - "1"
              })
              .then(() => {
                this.$router.push("/");
              });
          });
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
