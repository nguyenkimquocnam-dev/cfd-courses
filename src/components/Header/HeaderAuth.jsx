import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { MODAL_TYPES } from "../../constant/general";
import tokenMethod from "../../utils/token";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "../../constant/path";

const HeaderAuth = () => {
  const { handleShowModal, handleLogout, profile } = useAuthContext();
  const [isShowDropdown, setIsDropdown] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    document.addEventListener("click", _onCloseDropdown);

    return () => {
      document.removeEventListener("click", _onCloseDropdown);
    };
  }, []);

  const { profileImage, firstName } = profile;
  const isLogin = tokenMethod.get();

  const _onLoginClick = (e) => {
    e.stopPropagation();
    handleShowModal(MODAL_TYPES.login);
  };

  const _onRegisterClick = (e) => {
    e.stopPropagation();
    handleShowModal(MODAL_TYPES.register);
  };

  const _onToggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdown(!isShowDropdown);
  };

  const _onCloseDropdown = (e) => {
    e.stopPropagation();
    setIsDropdown(false);
  };

  const _onLogoutClick = (e) => {
    e.preventDefault();
    handleLogout?.();
    navigate(PATHS.HOME);
  };

  if (!!!isLogin) {
    return (
      <div class="header__auth">
        <a
          // href="javascript:void(0)"
          className="btn btn--transparent btnmodal"
          data-modal="mdlogin"
        >
          <span onClick={_onRegisterClick}>Đăng ký /&nbsp;</span>
          <span onClick={_onLoginClick}>Đăng nhập</span>
        </a>
      </div>
    );
  } else {
    return (
      <div className="header__logged">
        <div className="userlogged">
          <div
            className="userlogged__avatar user"
            data-dropdown="userlogged__dropdown"
            onClick={_onToggleDropdown}
          >
            <div className="userlogged__avatar-img user__img">
              <img
                src={profileImage || "/img/cfd-share-thumbnail-facebook.png"}
                alt="Avatar teacher"
              />
            </div>
            <i className="userlogged__avatar-icon">
              <svg
                width={14}
                height={14}
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 3.5L7.00003 10.5L14 3.5H0Z" fill="white" />
              </svg>
            </i>
          </div>
          <div
            className={`userlogged__dropdown dropdown ${
              isShowDropdown ? "active" : ""
            }`}
          >
            <div className="userlogged__dropdown-info">
              <div className="user__img">
                <img
                  src={profileImage || "/img/cfd-share-thumbnail-facebook.png"}
                  alt="Avatar teacher"
                />
              </div>
              <Link to={PATHS.PROFILE.INDEX} className="user__info">
                <p className="title --t4">
                  <strong>{firstName}</strong>
                </p>
                <span className="email">Thông tin tài khoản</span>
              </Link>
            </div>
            <div className="userlogged__dropdown-list">
              <Link to={PATHS.PROFILE.MY_COURSE}>Khóa học của tôi</Link>
              <Link to={PATHS.PROFILE.MY_PAYMENT}>Lịch sử thanh toán</Link>
              <Link to={PATHS.CONTACT}>Hỗ trợ</Link>
              <a href="#" onClick={_onLogoutClick}>
                Đăng xuất{" "}
                <i>
                  <img src="/img/iconlogout.svg" alt="Icon logout" />
                </i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default HeaderAuth;
