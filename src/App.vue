<template>
  <div>
    <appHeader/>
      <router-view/>
    <appFooter/>
  </div>
</template>

<script>
import appHeader from "@/components/inc/Header";
import appFooter from "@/components/inc/AppFooter";
export default {
  name: "App",
  components: {
    appHeader,
    appFooter
  }
};
</script>

<style>
</style>
