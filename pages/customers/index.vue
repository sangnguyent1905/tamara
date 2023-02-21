<template>
  <div>
    <div class="header">
      <h1 class="title">Customer Management</h1>
      <div class="btn-create">
        <nuxt-link to="/customers/create">
          <el-button size="medium" type="success"> Create Customer </el-button>
        </nuxt-link>
      </div>
    </div>

    <div class="body">
      <el-table :data="pagedTableData" style="width: 100%">
        <el-table-column prop="first_name" label="First Name">
        </el-table-column>
        <el-table-column prop="last_name" label="Last Name"> </el-table-column>
        <el-table-column prop="birth_date" label="Birthday"> </el-table-column>
        <el-table-column prop="email" label="Email"> </el-table-column>
        <el-table-column prop="phone_number" label="Phone"> </el-table-column>
        <el-table-column prop="gender" label="Gender"> </el-table-column>
        <el-table-column prop="email" label="Address">
          <template slot-scope="scope">
            <span>{{ scope.row.address.street }}</span
            >, <span>{{ scope.row.address.city }}</span
            >,
            <span>{{ scope.row.address.postal_code }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="Status">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 'ACTIVE'" type="success">{{
              scope.row.status
            }}</el-tag>
            <el-tag v-if="scope.row.status === 'DEACTIVE'" type="danger">{{
              scope.row.status
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Operations">
          <template slot-scope="scope">
            <el-button size="mini" @click="editCustomer(scope.row)">
              Edit
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteCustomer(scope.$index, scope.row)"
            >
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagging"
        :page-size="pageSize"
        :total="tableData.length"
        layout="prev, pager, next"
        @current-change="setPage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.loadData();
  },

  computed: {
    pagedTableData() {
      return this.tableData.slice(
        this.pageSize * this.page - this.pageSize,
        this.pageSize * this.page
      );
    },
  },

  data() {
    return {
      tableData: [],
      page: 1,
      pageSize: 5,
    };
  },

  methods: {
    setPage(page) {
      this.page = page;
    },

    randomNum(index) {
      let str = "" + index;
      let pad = "000";
      return pad.substring(0, pad.length - str.length) + str;
    },

    editCustomer(row) {
      this.$router.push(`/customers/${row.customer_id}`);
    },

    deleteCustomer(index, row) {
      this.tableData.splice(index, 1);

      localStorage.setItem("customers", JSON.stringify(this.tableData));
    },

    loadData() {
      const data = localStorage.getItem("customers");
      if (data) {
        this.tableData = JSON.parse(data);
        return;
      }

      this.initData();
    },

    initData() {
      const customers = [];
      for (let i = 1; i <= 500; i++) {
        customers.push({
          customer_id: `${i}`,
          email: `customer${i}@tamara.co`,
          first_name: "customer",
          last_name: `#${i}`,
          phone_number: `966501234${this.randomNum(i)}`,
          gender: i % 2 === 0 ? "MALE" : "FEMALE",
          birth_date: "2002-03-29T00:00:00+00:00",
          country_code: i % 2 === 0 ? "SA" : "VN",
          address: {
            street: `${this.randomNum(i)} Al Urubah Rd`,
            city: "Riyadh",
            postal_code: this.randomNum(i),
          },
          is_email_verified: false,
          is_id_verified: true,
          national_id: "123456789",
          status: "ACTIVE",
        });
      }
      localStorage.setItem("customers", JSON.stringify(customers));

      this.tableData = customers;
    },
  },
};
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
}

.body {
  padding: 25px;
  text-align: center;
}

.pagging {
  padding: 15px 0;
  float: right;
}

.title {
  margin-bottom: 0;
}
</style>
