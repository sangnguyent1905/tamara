import customerService from "./customer-service";

export default (inject) => {
  const allMethods = {
    ...customerService()
  };
  const methods = Object.keys(allMethods);
  methods.forEach((method) => {
    inject(method, allMethods[method]);
  });
};
