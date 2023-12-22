import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { MODAL_TYPES } from "../../constant/general";
import Input from "../Input";
import useForm from "../../hooks/useForm";
import { regexRule, requiredRule } from "../../utils/validate";
import ComponentLoading from "../ComponentLoading";

const LoginForm = () => {
  const { handleShowModal, handleLogin } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const rules = {
    email: [
      requiredRule(),
      regexRule("email", "Vui lòng nhập đúng định dạng email"),
    ],
    password: [requiredRule()],
  };
  const { form, validate, register } = useForm(
    {
      email: "",
      password: "",
    },
    rules
  );

  const _onSubmit = (e) => {
    e.preventDefault();
    const errorObject = validate();
    if (Object.keys(errorObject).length > 0) {
      // Error
      console.log("errorObject", errorObject);
    } else {
      // Handle submit
      setLoading(true);
      handleLogin?.({ ...form }, () => {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      });
    }
  };

  return (
    <div
      className="modal__wrapper-content mdlogin active"
      style={{ position: "relative" }}
    >
      {loading && <ComponentLoading />}
      <div className="form__bottom">
        <p>Bạn chưa có tài khoản?</p>
        <div
          className="color--primary btnmodal"
          data-modal="mdregister"
          onClick={() => handleShowModal(MODAL_TYPES.register)}
        >
          <strong>Đăng ký</strong>
        </div>
      </div>
      <span className="line">Hoặc</span>
      <form className="form" onSubmit={_onSubmit}>
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
        <div className="form__bottom">
          <a className="color--primary" href="#">
            Quên mật khẩu?
          </a>
        </div>
        <button className="btn btn--primary form__btn-register" type="submit">
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
