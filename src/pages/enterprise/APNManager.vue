<template>
  <SimApnManager :isEnterprise="true"></SimApnManager>
</template>

<script>
  import SimApnManager from "../sim/APNManage";
  export default {
    name: "APNManager",
    components: {
      SimApnManager
    }
  }
</script>

<style scoped>

</style>