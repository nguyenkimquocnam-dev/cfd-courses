import React from "react";

const HeaderTop = () => {
  return (
    <div className="headtop">
      <div className="container-fluid">
        <div className="headtop__left">
          <div className="headtop__left-avatar">
            <img
              src="https://cfdcircle.vn/files/thumbnails/480x480/JUVoVxn36lQtCl20hHoEPMo8JJENBX5qXfI1U13k.jpg"
              alt
            />
          </div>
          <div className="headtop__left-title">
            <h2>
              <strong>Frontend Master</strong>
            </h2>
            <p>Trần Nghĩa</p>
          </div>
        </div>
        <div className="headtop__right">
          <div className="headtop__right-price">
            <strong>14.700.000 VND</strong>
          </div>
          <a
            href="course-order.html"
            className="btn btn--primary btn-regcourse"
          >
            đăng ký học
          </a>
        </div>
      </div>
      <div className="headtop__progress" />
    </div>
  );
};

export default HeaderTop;
