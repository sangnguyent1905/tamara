import { LOCAL_STORAGE_KEY } from "~/constants";

export default {
  initData: async () => {
    const jsonData = localStorage.getItem(LOCAL_STORAGE_KEY.CUSTOMERS);
    const data = jsonData ? JSON.parse(jsonData) : [];

    if (data.length === 0) {
      const customers = [];
      const randomNum = (index) => {
        let str = "" + index;
        let pad = "000";
        return pad.substring(0, pad.length - str.length) + str;
      };

      for (let i = 1; i <= 500; i++) {
        customers.push({
          customer_id: `${i}`,
          email: `customer${i}@tamara.co`,
          first_name: "customer",
          last_name: `#${i}`,
          phone_number: `966501234${randomNum(i)}`,
          gender: i % 2 === 0 ? "MALE" : "FEMALE",
          birth_date: "2002-03-29T00:00:00+00:00",
          country_code: i % 2 === 0 ? "SA" : "VN",
          address: {
            street: `${randomNum(i)} Al Urubah Rd`,
            city: "Riyadh",
            postal_code: randomNum(i),
          },
          is_email_verified: false,
          is_id_verified: true,
          national_id: "123456789",
          status: "ACTIVE",
        });
      }
      localStorage.setItem(LOCAL_STORAGE_KEY.CUSTOMERS, JSON.stringify(customers));
      return await customers;
    }

    return await data;
  },

  getCustomers: async () => {
    const jsonData = localStorage.getItem(LOCAL_STORAGE_KEY.CUSTOMERS);
    const data = jsonData ? JSON.parse(jsonData) : [];

    return await data;
  },

  getCustomer: async (query) => {
    const jsonData = localStorage.getItem(LOCAL_STORAGE_KEY.CUSTOMERS);
    const data = jsonData ? JSON.parse(jsonData) : [];

    return await data.find((item) => item.customer_id === query.customer_id);
  },

  // create: async  (data) => {
  //   return await client(baseUrl).post('endpoint_url', data)
  // }

  // update: async  (data) => {
  //   return await client(baseUrl).post('endpoint_url', data)
  // }
};
