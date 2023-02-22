import { mount } from "@vue/test-utils";
import CustomerForm from "@/components/CustomerForm.vue";
import ElementUI from "element-ui";
import Vue from 'vue'

Vue.use(ElementUI);

describe("CustomerForm", () => {
  const wrapper = mount(CustomerForm);

  beforeAll(async () => {
    await wrapper.setData({ form: { address: {} } });
  })

  test("is a Vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });

  test("should exists fields", async () => {
    const first_name = wrapper.find("#first_name");
    const last_name = wrapper.find("#last_name");
    const national_id = wrapper.find("#national_id");
    const email = wrapper.find("#email");
    const phone_number = wrapper.find("#phone_number");
    const birth_date = wrapper.find("#birth_date");
    const gender = wrapper.find("#gender");
    const country_code = wrapper.find("#country_code");
    const city = wrapper.find("#city");
    const street = wrapper.find("#street");
    const postal_code = wrapper.find("#postal_code");
    const active = wrapper.find('input[type=checkbox]');

    expect(first_name.exists()).toBe(true);
    expect(last_name.exists()).toBe(true);
    expect(national_id.exists()).toBe(true);
    expect(email.exists()).toBe(true);
    expect(phone_number.exists()).toBe(true);
    expect(birth_date.exists()).toBe(true);
    expect(gender.exists()).toBe(true);
    expect(country_code.exists()).toBe(true);
    expect(city.exists()).toBe(true);
    expect(street.exists()).toBe(true);
    expect(postal_code.exists()).toBe(true);
    expect(active.exists()).toBe(true);
  });

  test("should show error message", async () => {
    const btn_submit = wrapper.find("#btn_submit");

    await btn_submit.trigger("click");

    const error_message = wrapper.find(".el-form-item__error");

    expect(error_message.text()).toEqual('Please input first name')
  });
});
