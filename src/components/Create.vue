<template>
<div>
    <div class="container">
        <div class="row">
            <div class="col-md-6 mx-auto m-5">
                <div class="card card-body">
                    <h3 class="card-title">Create Event</h3>
                    <form @submit.prevent = "saveEvent">
                        <div class="form-group">
                            <label for="title">Slug</label>
                            <input class="form-control" v-model="event_id" required/>
                        </div>
                        <div class="form-group">
                            <label for="title">Event Title</label>
                            <input class="form-control" v-model="title" required/>
                        </div>
                        <div class="form-group">
                            <div class="custom-file">
                               <input type="file" class="custom-file-input" id="customFile">
                               <label class="custom-file-label" for="customFile">Choose Image</label>
                            </div>
                        </div>
                       <div class="form-group">
                            <label for="shortdesc">Short Description</label>
                            <textarea class="form-control" v-model="shortdesc" required/>
                        </div>
                         <div class="form-group">
                            <label for="longdesc">Long Description</label>
                            <textarea class="form-control" v-model="longdesc" required/>
                        </div>
                         <div class="form-group">
                            <label for="available">Number of People</label>
                            <input type="number" v-model="available" class="form-control">
                        </div>
                        <div  class="form-row">
                             <div class="col">
                                <!-- <div class="form-group"> -->
                                    <label for="startdate">Start Date</label>
                                    <input type="datetime-local" class="form-control" v-model="startdate">
                                <!-- </div> -->
                             </div>
                             <div class="col">
                                    <!-- <div class="form-group"> -->
                                        <label for="enddate">End Date</label>
                                        <input type="datetime-local" class="form-control" v-model="enddate">
                                    <!-- </div> -->
                             </div>
                        </div>
                        <button type="submit" class="btn btn-block mt-5 btn-success">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import db from "./fbInit.js";
export default {
  name: "Create",
  data() {
    return {
      event_id: null,
      title: null,
      shortdesc: null,
      longdesc: null,
      image: null,
      available: null,
      startdate: null,
      enddate: null
    };
  },
  methods: {
    saveEvent() {
      db
        .collection("events")
        .add({
          event_id: this.event_id,
          title: this.title,
          available: this.available,
          startdate: this.startdate,
          enddate: this.enddate,
          shortdesc: this.shortdesc,
          longdesc: this.longdesc
        })
        .then(docRef => {
          this.$router.push("/");
        })
        .catch(error => console.log(error));
    }
  }
};
</script>
<style scoped>
</style>
