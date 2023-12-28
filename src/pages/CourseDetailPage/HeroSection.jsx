import React from "react";
import Button from "../../components/Button";
import { message } from "antd";

const HeroSection = ({
  title,
  startDate,
  duration,
  tags,
  orderLink,
  teacherInfo = {},
  price,
  image,
}) => {
  const _onCopyLink = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.href);
    message.success("Đã copy đường dẫn khóa học này");
  };
  return (
    <section className="hero herodetail">
      <div className="hero__content">
        <div className="container">
          <h3 className="category label --white">frontend</h3>
          <h2 className="title --white">{title || ""}</h2>
          <div className="infor">
            <div className="infor__item">
              <label className="label --white">Khai giảng</label>
              <p className="title --t3 --white">{startDate || ""}</p>
            </div>
            <div className="infor__item">
              <label className="label --white">Thời lượng</label>
              <p className="title --t3 --white">{duration || ""} buổi</p>
            </div>
            <div className="infor__item">
              <label className="label --white">Hình thức</label>
              <p className="title --t3 --white">{tags?.join(" | ")}</p>
            </div>
          </div>
          {/* Chưa đăng ký */}
          <Button link={orderLink} className="btn-regcourse">
            Đăng ký
          </Button>
          {/* Đã đăng ký */}
          {/* <div class="btn btn--primary btn-regcourse --disable">Đã đăng ký</div> */}
        </div>
      </div>
      <div className="hero__bottom">
        <div className="container-fluid">
          <a href className="user">
            <div className="user__img">
              <img
                src={teacherInfo.image}
                alt={teacherInfo.name || "Avatar teacher"}
              />
            </div>
            <p className="user__name --white">{teacherInfo.name || ""}</p>
          </a>
          <div className="pricebox">
            <p className="title --t3 --white">{price || 0} VND</p>
          </div>
          <a href="#" onClick={_onCopyLink} className="sharebox s--white">
            Chia sẻ
            <i>
              <img
                src="https://cfdcircle.vn/img/iconshare.svg"
                alt="CFD Circle"
              />
            </i>
          </a>
        </div>
      </div>
      <div className="hero__background">
        <img
          className="hero__background-img"
          src={image || ""}
          alt="CFD Circle"
        />
      </div>
    </section>
  );
};

export default HeroSection;
