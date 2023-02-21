<template>
  <div v-if="!!form" class="customer-form">
    <el-form :model="form" :rules="rules" ref="form">
      <div class="flex align-items-center column-gap-20">
        <div class="w-50">
          <el-form-item label="First Name" prop="first_name">
            <el-input v-model="form.first_name"></el-input>
          </el-form-item>
        </div>
        <div class="w-50">
          <el-form-item label="Last Name" prop="last_name">
            <el-input v-model="form.last_name"></el-input>
          </el-form-item>
        </div>
      </div>
      <el-form-item label="National ID" prop="national_id">
        <el-input v-model="form.national_id"></el-input>
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="Phone" prop="phone_number">
        <el-input v-model="form.phone_number" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Resources">
        <el-radio-group v-model="form.gender">
          <el-radio label="MALE" value="MALE"></el-radio>
          <el-radio label="FEMALE" value="FEMALE"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="Birth Date">
        <el-date-picker
          type="date"
          placeholder="Pick a date"
          v-model="form.birth_date"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="Country">
        <el-select
          class="w-100"
          v-model="form.country_code"
          placeholder="please select your country"
        >
          <el-option label="South Africa" value="SA"></el-option>
          <el-option label="Viet Nam" value="VN"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Street">
        <el-input v-model="form.address.street"></el-input>
      </el-form-item>
      <el-form-item label="City">
        <el-input v-model="form.address.city"></el-input>
      </el-form-item>
      <el-form-item label="Postal Code">
        <el-input v-model="form.address.postal_code"></el-input>
      </el-form-item>
      <el-form-item label="ACTIVE">
        <el-switch
          v-model="form.status"
          active-value="ACTIVE"
          inactive-value="DEACTIVE"
        ></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit()">Update</el-button>
        <nuxt-link to="/customers">
          <el-button> Cancel</el-button>
        </nuxt-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CustomerForm",
  props: ["data"],

  mounted() {
    this.form = this.data;
  },

  data() {
    const checkPhone = (rule, value, callback) => {
      const numberRegex = /^-?\d+$/;
      debugger
      if (!numberRegex.test(value)) {
        return callback(new Error("Please input valid phone number"));
      }
    };

    return {
      form: null,

      rules: {
        first_name: [
          {
            required: true,
            message: "Please input first name",
            trigger: "blur",
          },
        ],
        last_name: [
          {
            required: true,
            message: "Please input last name",
            trigger: "blur",
          },
        ],
        national_id: [
          {
            required: true,
            message: "Please input national id",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "Please input email address",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Please input correct email address",
            trigger: ["blur", "change"],
          },
        ],
        phone_number: [
          ,
          {
            required: true,
            message: "Please input phone number",
            trigger: "blur",
          },
          {
            validator: checkPhone,
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.$emit("valueChange", this.form);
          return true;
        }
        return false;
      });
    },
  },
};
</script>

<style>
.el-form-item__label {
  font-weight: 600;
}
</style>
