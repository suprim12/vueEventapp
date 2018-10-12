<template>
    <div >
        <appNavbar  :key="$route.fullPath"/>
    </div>
</template>
<script>
import appNavbar from "./Navbar";
export default {
  name: "Header",
  data() {
    return {
      msg: "Whater"
    };
  },
  components: {
    appNavbar
  }
};
</script>
<style scoped>
</style>
