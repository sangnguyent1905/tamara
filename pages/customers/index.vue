<template>
  <div class="customers">
    <div
      class="customers__header flex xs-flex-wrap align-items-center justify-content-between"
    >
      <h1 class="customers__title">Customer Management</h1>
      <div class="btn-create">
        <nuxt-link to="/customers/create">
          <el-button size="medium" type="success"> Create Customer </el-button>
        </nuxt-link>
      </div>
    </div>

    <div class="customers__body">
      <el-table :data="pagedTableData" class="w-100">
        <el-table-column prop="first_name" label="First Name">
        </el-table-column>
        <el-table-column prop="last_name" label="Last Name"> </el-table-column>
        <el-table-column prop="birth_date" label="Birth date">
          <template slot-scope="scope">
            <span>
              {{ scope.row.birth_date | formatDate("YYYY MMM DD") }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="Email"> </el-table-column>
        <el-table-column prop="phone_number" label="Phone"> </el-table-column>
        <el-table-column prop="gender" label="Gender"> </el-table-column>
        <el-table-column prop="email" label="Address">
          <template slot-scope="scope">
            <span v-if="scope.row.address.street">
              {{ scope.row.address.street }}
            </span>
            <span v-if="scope.row.address.city">
              , {{ scope.row.address.city }}
            </span>
            <span v-if="scope.row.address.postal_code">
              , {{ scope.row.address.postal_code }}
            </span>
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
            <div class="flex align-items flex-wrap gap-10">
              <el-button size="mini" @click="editCustomer(scope.row)">
                Edit
              </el-button>
              <el-button
                class="ml-0"
                size="mini"
                type="danger"
                @click="deleteCustomer(scope.row)"
              >
                Delete
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="customers__pagging"
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
    this.$initData();

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

    editCustomer(row) {
      this.$router.push(`/customers/${row.customer_id}`);
    },

    deleteCustomer(row) {
      this.$confirm("Do you want to delete this customer?", "Warning", {
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        type: "warning",
      }).then(async () => {
        const data = await this.$deleteCustomer(row);

        if (data) {
          this.$message({
            type: "success",
            message: "The customer have been successfully deleted!",
          });

          this.loadData();
        }
      });
    },

    async loadData() {
      const data = await this.$getCustomers();
      this.tableData = data;
    },
  },
};
</script>

<style lang="scss">
.customers {
  &__title {
    margin-bottom: 0;
  }

  &__header {
    padding: 25px;
  }

  &__body {
    padding: 25px;
    overflow: auto;
  }

  &__pagging {
    padding: 15px 0;
    float: right;
  }
}
</style>
