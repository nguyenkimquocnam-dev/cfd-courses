import { PATHS } from "@/constant/path";
import { NavLink, Outlet } from "react-router-dom";
import SidebarProfile from "./SidebarProfile";

const StudentProfilePage = () => {
  return (
    <main className="mainwrapper profilepage">
      <div className="container">
        <div className="wrapper">
          <SidebarProfile />
          <div className="tabwrap">
            <div className="tab">
              <div className="tab__title">
                <NavLink to={PATHS.PROFILE.INDEX} end>
                  Thông tin cá nhân
                </NavLink>
                <NavLink to={PATHS.PROFILE.MY_COURSE}>Khóa học của tôi</NavLink>
                <NavLink to={PATHS.PROFILE.MY_PAYMENT}>
                  Lịch sử thanh toán
                </NavLink>
              </div>
              <div className="tab__content">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default StudentProfilePage;
