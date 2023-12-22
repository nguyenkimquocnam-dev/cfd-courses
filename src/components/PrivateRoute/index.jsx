import React from "react";
import tokenMethod from "../../utils/token";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { MODAL_TYPES } from "../../constant/general";

const PrivateRoute = ({ redirectPath = "" }) => {
  const { handleShowModal } = useAuthContext();
  const navigate = useNavigate();
  const isLogin = !!tokenMethod.get();

  if (!isLogin) {
    handleShowModal?.(MODAL_TYPES.login);
    if (!!redirectPath) {
      return <Navigate to={redirectPath} />;
    } else {
      navigate(-1);
    }
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
