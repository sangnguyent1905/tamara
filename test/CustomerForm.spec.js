import { mount } from "@vue/test-utils";
import CustomerForm from "@/components/CustomerForm.vue";

describe("CustomerForm", () => {
  test("is a Vue instance", () => {
    const wrapper = mount(CustomerForm);
    expect(wrapper.vm).toBeTruthy();
  });

  test("has fields", async () => {
    const wrapper = mount(CustomerForm);
    await wrapper.setData({ form: {address: {}}});

    const first_name = await wrapper.find("#first_name");

    await first_name.setValue('Unit');
 
    expect(
      first_name.element.value == 'Unit'
    ).toBe(true);
  });

  // test("sets the value", async () => {
  //   const data = {
  //     first_name: "Unit",
  //     last_name: "Test",
  //     national_id: "12345678",
  //     email: "unit-test@test.com",
  //     phone_number: "0901234567",
  //     birth_date: "2002-03-29T00:00:00+00:00",
  //     gender: "FEMALE",
  //     country_code: "VN",
  //     status: "ACTIVE",
  //     address: {
  //       street: `Cong Hoa`,
  //       city: "HCM",
  //       postal_code: 12345,
  //     },
  //     is_email_verified: false,
  //     is_id_verified: true,
  //   };
  //   const wrapper = mount(CustomerForm);
  //   await wrapper.setData({ form: data});

  //   // const first_name = await wrapper.find("#first_name");
  //   // const last_name = wrapper.find("input[name=last_name]");
  //   // const national_id = wrapper.find("input[name=national_id]");
  //   // const email = wrapper.find("input[name=email]");
  //   // const phone_number = wrapper.find("input[name=phone_number]");
  //   // const birth_date = wrapper.find("input[name=birth_date]");
  //   // const gender = wrapper.find("input[type=radio][value=FEMALE]");
  //   // const country_code = wrapper.find("select");
  //   // const active = wrapper.find('input[type=checkbox]');

  //   await wrapper.find("input#first_name").setValue('Unit');
  //   // await last_name.setValue(data.last_name);
  //   // await national_id.setValue(data.national_id);
  //   // await email.setValue(data.email);
  //   // await phone_number.setValue(data.phone_number);
  //   // await birth_date.setValue(data.birth_date);
  //   // await gender.setValue();
  //   // await country_code.setValue(data.country_code);
  //   // await active.setValue();

  //   expect(
  //     first_name.element.value == data.first_name
  //       // last_name.element.value == data.last_name &&
  //       // national_id.element.value == data.national_id &&
  //       // email.element.value == data.email &&
  //       // phone_number.element.value == data.phone_number &&
  //       // birth_date.element.value == data.birth_date &&
  //       // gender.element.value &&
  //       // birth_date.element.country_code == data.country_code &&
  //       // active.element.value
  //   ).toBe(true);
  // });

  // test("submit", async () => {
  //   const wrapper = mount(CustomerForm);

  //   // trigger the element
  //   await wrapper.find("button[name=submit]").trigger("click");

  //   // assert some action has been performed, like an emitted event.
  //   expect(wrapper.emitted()).toHaveProperty("submit");
  // });
});
