<template>
  <div class="container">
      <h2 class="text-center m-5">List of Events</h2>
      <div v-for="event in events" v-bind:key="event.id">
       <div class="card card-body m-5">
         <h4 class="card-title">{{event.title}}</h4>
         <p>
           {{event.shortdesc}}
         </p>
         <span></span>
         <small>Available Sits {{event.available}}</small>
         <router-link class="btn-block btn btn-success btn-sm mt-3" :to="{name:'Detail',params:{event_id:event.event_id}}">View</router-link>
       </div>
    </div>
  </div>
</template>

<script>
import db from "./fbInit.js";
export default {
  name: "Home",
  data() {
    return {
      events: []
    };
  },
  created() {
    db
      .collection("events")
      .orderBy("startdate", "desc")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.data());
          const data = {
            id: doc.id,
            event_id: doc.data().event_id,
            title: doc.data().title,
            shortdesc: doc.data().shortdesc,
            longdesc: doc.data().longdesc,
            startdate: doc.data().startdate,
            enddate: doc.data().longdate,
            available: doc.data().available,
            image: doc.data().image
          };
          this.events.push(data);
        });
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
