import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { MODAL_TYPES } from "../../constant/general";
import useForm from "../../hooks/useForm";
import Input from "../Input";
import { regexRule, requiredRule } from "../../utils/validate";
import { PATHS } from "../../constant/path";
import Button from "../Button";
import { Link } from "react-router-dom";
import ComponentLoading from "../ComponentLoading";

const RegisterForm = () => {
  const { handleShowModal, handleCloseModal, handleRegister } =
    useAuthContext();
  const [loading, setLoading] = useState(false);

  const rules = {
    name: [requiredRule()],
    email: [
      requiredRule(),
      regexRule("email", "Vui lòng điền đúng dịnh dạng email"),
    ],
    password: [requiredRule()],
    confirmPassword: [
      requiredRule(),
      (value, values) => {
        if (values.password && value !== values.password) {
          return "Mật khẩu xác nhận không đúng";
        }
        return false;
      },
    ],
  };

  const { form, validate, register } = useForm(
    {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    rules
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorObject = validate();
    if (Object.keys(errorObject).length > 0) {
      console.log("errorObject", errorObject);
    } else {
      // Handle submit register
      setLoading(true);
      handleRegister?.({ ...form }, () => {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      });
    }
  };

  return (
    <div
      className="modal__wrapper-content mdregister active"
      style={{ position: "relative" }}
    >
      {loading && <ComponentLoading />}
      <div className="form__bottom">
        <p>Bạn đã có tài khoản?</p>
        <div
          className="color--primary btnmodal"
          data-modal="mdlogin"
          onClick={() => handleShowModal(MODAL_TYPES.login)}
        >
          <strong>Đăng nhập</strong>
        </div>
      </div>
      <span className="line">Hoặc</span>
      <form className="form" onSubmit={handleSubmit}>
        <Input
          label={"Họ và tên"}
          required
          placeholder="Họ và tên"
          {...register("name")}
        />
        <Input
          label={"Email"}
          required
          placeholder="Email"
          {...register("email")}
        />
        <Input
          label={"Mật khẩu"}
          required
          placeholder="Mật khẩu"
          type="password"
          {...register("password")}
        />
        <Input
          label={"Xác nhận mật khẩu"}
          required
          placeholder="Xác nhận mật khẩu"
          type="password"
          {...register("confirmPassword")}
        />
        <p className="form__argee">
          Với việc đăng ký, bạn đã đồng ý{" "}
          <Link
            className="color--primary"
            to={PATHS.PRIVACY}
            onClick={handleCloseModal}
          >
            Chính Sách Điều Khoản
          </Link>{" "}
          của CFD
        </p>
        <Button className="form__btn-register" type="submit">
          Đăng ký tài khoản
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
