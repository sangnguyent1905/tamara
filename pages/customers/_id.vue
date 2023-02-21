<template>
  <div v-if="!!form" class="update-customer">
    <h1>Update Customer</h1>
    <customer-form :data="form" @valueChange="onValueChange($event)" />
  </div>
</template>

<script>
import CustomerForm from "~/components/CustomerForm.vue";

export default {
  components: {
    CustomerForm,
  },

  created() {
    this.customer_id = this.$route.params["id"];
    this.customers = [];
  },

  mounted() {
    this.loadData();
  },

  data() {
    return {
      customer_id: 0,
      customers: [],
      form: null,
    };
  },

  methods: {
    loadData() {
      const data = localStorage.getItem("customers");
      if (data && this.customer_id) {
        this.customers = JSON.parse(data) || [];
        this.form = this.customers.find(
          (item) => item.customer_id.toString() === this.customer_id
        );
      }
    },

    save() {
      (this.customers || []).forEach((item) => {
        if (item.customer_id === this.customer_id) {
          item = { ...this.form };
        }
      });
      localStorage.setItem("customers", JSON.stringify(this.customers));

      this.$router.push("/customers");
    },

    onValueChange(value) {
      this.form = value;

      this.save();
    },
  },
};
</script>

<style>
.update-customer {
  max-width: 1024px;
  margin: auto;
}
</style>
