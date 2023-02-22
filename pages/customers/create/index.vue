<template>
  <div v-if="!!form" class="create-customer">
    <h1>Create Customer</h1>
    <customer-form :data="form" @valueChange="onValueChange($event)" />
  </div>
</template>

<script>
import CustomerForm from "~/components/CustomerForm.vue";

export default {
  components: {
    CustomerForm,
  },

  data() {
    return {
      form: {
        email: null,
        first_name: null,
        last_name: null,
        phone_number: null,
        gender: "MALE",
        birth_date: null,
        country_code: null,
        address: {
          street: null,
          city: null,
          postal_code: null,
        },
        is_email_verified: false,
        is_id_verified: false,
        national_id: null,
        status: "DEACTIVE",
      },
    };
  },

  mounted() {
    this.loadData();
  },

  methods: {
    async  loadData() {
      const data = localStorage.getItem("customers");
      this.customers = data ? JSON.parse(data) : [];
    },

    async save() {
      const data = await this.$create(this.form);

      if (data) {
        this.$message({
          message: 'New customer have been successfully saved!',
          type: 'success'
        });
        this.$router.push("/customers");
      }
    },

    onValueChange(value) {
      this.form = value;
      this.save();
    },
  },
};
</script>

<style>
.create-customer {
  max-width: 1024px;
  margin: auto;
  padding: 25px;
}
</style>
