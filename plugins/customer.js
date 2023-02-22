import CustomerService from '~/services/customer-service'

export default ({ app },inject) => {
  inject('initData', async () => await CustomerService.initData());
  inject('getCustomers', async () => await CustomerService.getCustomers());
  inject('getCustomer', async (query) => await CustomerService.getCustomer(query));
  inject('createCustomer', async (payload) => await CustomerService.createCustomer(payload));
  inject('updateCustomer', async (payload) => await CustomerService.updateCustomer(payload));
  inject('deleteCustomer', async (payload) => await CustomerService.deleteCustomer(payload));
 
}