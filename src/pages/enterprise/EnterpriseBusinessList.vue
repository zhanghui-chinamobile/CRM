<template>
    <section>
      <OrderList :consumerType="1" :isAdmin="userInfo.userType==1" :userId="userId"></OrderList>
    </section>
</template>

<script>
    import OrderList from  "../order/OrderList";

    export default {
      name: "EnterpriseBusinessList",
      components: {
        OrderList,
      },
      data() {
        return {
          userId: 0,
        }
      },
      methods: {
      },
      computed: {
        userInfo() {
          return this.$store.getters.userInfo;
        }
      },
      created() {
        if (this.userInfo.userType == 2){
          this.userId = this.userInfo.id;
        }
      }
    }
</script>

<style scoped>

</style>
