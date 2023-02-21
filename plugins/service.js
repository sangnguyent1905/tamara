import CustomerService from '~/services/customer-service'

export default ({ app },inject) => {
  inject('initData', async () => await CustomerService.initData());
  inject('getCustomers', async () => await CustomerService.getCustomers());
  inject('getCustomer', async (query) => await CustomerService.getCustomer(query));
 
}