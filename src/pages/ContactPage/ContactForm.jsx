import React from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Select from "../../components/Select";
import TextArea from "../../components/TextArea";
import useForm from "../../hooks/useForm";
import { regexRule, requiredRule } from "../../utils/validate";

const rules = {
  name: [requiredRule("Vui lòng điền họ và tên")],
  email: [
    requiredRule("Vui lòng điền email"),
    regexRule("email", "Vui lòng điền đúng định dạng email"),
  ],
  phone: [
    requiredRule("Vui lòng điền số điện thoại"),
    regexRule("phone", "Vui lòng điền đúng định dạng của số điện thoại"),
  ],
  topic: [requiredRule("Vui lòng chọn chủ đề")],
  content: [requiredRule("Vui lòng điền nội dung")],
};

const ContactForm = ({ handleFormSubmit }) => {
  const { form, validate, register } = useForm(
    {
      name: "",
      email: "",
      phone: "",
      topic: "",
      content: "",
    },
    rules
  );

  const _onSubmit = (e) => {
    e.preventDefault();

    const errorObject = validate();

    // Handle submit
    if (Object.keys(errorObject).length > 0) {
      // Error
      console.log("errorObject", errorObject);
    } else {
      // Success
      handleFormSubmit?.(form);
    }
  };

  return (
    <div className="form">
      <h3 className="title --t3">Gửi yêu cầu hỗ trợ</h3>
      <Input
        label="Họ và tên"
        required
        placeholder="Họ và tên"
        {...register("name")}
      />

      <Input
        label="Email"
        required
        placeholder="Email"
        {...register("email")}
      />

      <Input
        label="Số điện thoại"
        required
        placeholder="Số điện thoại"
        {...register("phone")}
      />

      <Input
        label="Chủ đề cần hỗ trợ"
        required
        {...register("topic")}
        renderInput={(inputProps) => {
          return (
            <Select
              options={[
                { value: "", label: "--" },
                { value: "react", label: "ReactJS" },
                { value: "responsive", label: "Web Responsive" },
              ]}
              {...inputProps}
            />
          );
        }}
      />

      <Input
        label="Nội dung"
        required
        placeholder="Nội dung"
        {...register("content")}
        renderInput={(inputProps) => {
          return <TextArea {...inputProps} />;
        }}
      />

      <div className="btncontrol">
        <Button onClick={_onSubmit}>Gửi</Button>
      </div>
    </div>
  );
};

export default ContactForm;
