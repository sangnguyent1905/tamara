<template>
  <div>
    <nuxt-link to="/customers">Customer Management</nuxt-link>
  </div>
</template>
<script>
export default {
  created() {
    this.$router.push("/customers");
  },
};
</script>
