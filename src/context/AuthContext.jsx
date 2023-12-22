import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/authService";
import { message } from "antd";
import tokenMethod from "../utils/token";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../constant/path";

export const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [showedModal, setShowedModal] = useState("");
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = !!tokenMethod.get()?.accessToken;
    if (accessToken) {
      handleGetProfile();
    }
  }, []);

  // Handle show auth modal
  const handleShowModal = (modalType) => {
    setShowedModal(modalType || "");
  };

  // Handle close auth modal
  const handleCloseModal = (e) => {
    e?.stopPropagation();
    setShowedModal("");
  };

  // Handle login
  const handleLogin = async (loginData, callback) => {
    // Handle payload
    const payload = { ...loginData };
    // Call api
    try {
      const res = await authService.login(payload);
      if (res?.data?.data) {
        // Lưu token
        const { token: accessToken, refreshToken } = res.data.data;
        tokenMethod.set({ accessToken, refreshToken });

        // Get profile
        handleGetProfile();

        // Notify success and close modal
        message.success("Đăng nhập thành công");
        handleCloseModal();
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      callback?.();
    }
  };

  // Handle register
  const handleRegister = async (registerData, callback) => {
    const { name, email, password } = registerData || {};
    // Handle payload
    const payload = {
      firstName: name,
      lastName: "",
      email,
      password,
    };

    // Call api register
    try {
      // Success
      const res = await authService.register(payload);
      if (res?.data?.data?.id) {
        // Notify Success
        message.success("Đăng ký thành công");
        // Handle login
        handleLogin({ email, password });
      }
    } catch (error) {
      // Error
      if (error?.response?.status === 403) {
        message.error("Email đăng ký đã tồn tại");
      } else {
        message.error("Đăng ký thất bại");
      }
    } finally {
      callback?.();
    }
  };

  // Handle logout
  const handleLogout = () => {
    // Clear token
    tokenMethod.remove();
    // Redirect to home
    navigate(PATHS.HOME);
    // Notify
    message.success("Tài khoản đã đăng xuất");
  };

  // Handle get profile
  const handleGetProfile = async () => {
    // Call api get profile
    try {
      const res = await authService.getProfile();
      if (res?.data?.data) {
        setProfile(res.data.data);
      }
    } catch (error) {
      console.log("error", error);
      handleLogout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        showedModal,
        handleShowModal,
        handleCloseModal,
        handleLogin,
        handleRegister,
        handleLogout,
        profile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
