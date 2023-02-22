<template>
  <div class="customer-form">
    <el-form v-if="form" :model="form" :rules="rules" ref="form">
      <div class="flex align-items-center xs-flex-wrap column-gap-20">
        <div class="w-50 xs-w-100">
          <el-form-item label="First Name" prop="first_name">
            <el-input v-model="form.first_name" id="first_name"></el-input>
          </el-form-item>
        </div>
        <div class="w-50 xs-w-100">
          <el-form-item label="Last Name" prop="last_name">
            <el-input v-model="form.last_name" id="last_name"></el-input>
          </el-form-item>
        </div>
      </div>

      <div class="flex align-items-center xs-flex-wrap column-gap-20">
        <div class="w-50 xs-w-100">
          <el-form-item label="National ID" prop="national_id">
            <el-input v-model="form.national_id" id="national_id"></el-input>
          </el-form-item>
        </div>
        <div class="w-50 xs-w-100">
          <el-form-item label="Email" prop="email">
            <el-input v-model="form.email" id="email"></el-input>
          </el-form-item>
        </div>
      </div>

      <div class="flex align-items-center xs-flex-wrap column-gap-20">
        <div class="w-50 xs-w-100">
          <el-form-item label="Phone" prop="phone_number">
            <el-input v-model="form.phone_number" autocomplete="off" id="phone_number"></el-input>
          </el-form-item>
        </div>
        <div class="w-50 xs-w-100">
          <el-form-item label="Birth Date" prop="birth_date">
            <el-date-picker
              type="date"
              id="birth_date"
              placeholder="Pick a date"
              v-model="form.birth_date"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </div>
      </div>

      <el-form-item label="Gender">
        <el-radio-group id="gender" class="w-100" v-model="form.gender">
          <el-radio label="MALE" value="MALE"></el-radio>
          <el-radio label="FEMALE" value="FEMALE"></el-radio>
        </el-radio-group>
      </el-form-item>

      <div class="flex align-items-center xs-flex-wrap column-gap-20">
        <div class="w-25 xs-w-100">
          <el-form-item label="Country">
            <el-select class="w-100" v-model="form.country_code" id="country_code">
              <el-option label="South Africa" value="SA"></el-option>
              <el-option label="Viet Nam" value="VN"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="w-25 xs-w-100">
          <el-form-item label="City">
            <el-input v-model="form.address.city" id="city"></el-input>
          </el-form-item>
        </div>
        <div class="w-25 xs-w-100">
          <el-form-item label="Street">
            <el-input v-model="form.address.street" id="street"></el-input>
          </el-form-item>
        </div>
        <div class="w-25 xs-w-100">
          <el-form-item label="Postal Code">
            <el-input v-model="form.address.postal_code" id="postal_code"></el-input>
          </el-form-item>
        </div>
      </div>

      <el-form-item label="ACTIVE">
        <el-switch
          v-model="form.status"
          active-value="ACTIVE"
          inactive-value="DEACTIVE"
        ></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit" id="btn_submit">
          {{ data && data.customer_id ? "Update" : "Create" }}
        </el-button>
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
      if (!numberRegex.test(value)) {
        callback(new Error("Please input valid phone number"));
      }
      callback();
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
        birth_date: [
          {
            required: true,
            message: "Please input birthday",
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
          return;
        }
        return false;
      });
    },
  },
};
</script>
