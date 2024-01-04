import Button from "@/components/Button";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import { useAuthContext } from "@/context/AuthContext";
import useForm from "@/hooks/useForm";
import { regexRule, requiredRule } from "@/utils/validate";
import React, { useEffect } from "react";

const MyInfo = () => {
  const { profile, handleUpdateProfile } = useAuthContext();

  const rules = {
    firstName: [requiredRule("Vui lòng nhập họ và tên")],
    email: [
      requiredRule("Vui lòng nhập email"),
      regexRule("email", "Vui lòng nhập đúng định dạng email"),
    ],
    phone: [
      requiredRule("Vui lòng nhập số điện thoại"),
      regexRule("phone", "Vui lòng nhập đúng định dạng phone"),
    ],
    password: [requiredRule("Vui lòng nhập mật khẩu")],
  };

  const { form, setForm, validate, register } = useForm(
    {
      firstName: "",
      email: "",
      phone: "",
      password: "******",
      facebookURL: "",
      website: "",
      introduce: "",
    },
    rules
  );

  // Handle submit
  const _onSubmit = (e) => {
    e.preventDefault();
    console.log("form", form);
    const errorObject = validate();
    if (Object.keys(errorObject).length > 0) {
      console.log("🚀errorObject---->", errorObject);
    } else {
      handleUpdateProfile?.(form);
    }
  };

  // console.log("form", form);

  // Set lại giá trị cho form khi vào trang
  useEffect(() => {
    if (profile) {
      setForm({ ...form, ...profile });
    }
  }, [profile]);

  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      <form className="form">
        <div className="form-container">
          {/* Firstname field */}
          <Input
            required
            label="Họ và tên"
            placeholder="Họ và tên"
            {...register("firstName")}
          />

          {/* Phone field */}
          <Input
            required
            label="Số điện thoại"
            placeholder="Số điện thoại"
            {...register("phone")}
          />
        </div>
        <div className="form-container">
          {/* Email field */}
          <Input
            required
            label="Email"
            placeholder="Email"
            {...register("email")}
            disabled
          />

          {/* Password field */}
          <Input
            required
            label="Mật khẩu"
            placeholder="Mật khẩu"
            {...register("password")}
            disabled
          />
        </div>

        {/* FacebookURL field */}
        <Input
          label="Facebook URL"
          placeholder="https://cfdcircle.vn"
          {...register("facebookURL")}
        />

        {/* Website filed */}
        <Input
          label="Website"
          placeholder="https://cfdcircle.vn"
          {...register("website")}
        />

        {/* Introduce field */}
        <Input
          label="Giới thiệu bản thân"
          placeholder="Nội dung giới thiệu"
          {...register("introduce")}
          renderInput={(inpuProps) => {
            return <TextArea {...inpuProps} />;
          }}
        />

        <div className="form-group">
          <div className="btnsubmit">
            <Button onClick={_onSubmit}>Lưu lại</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MyInfo;
