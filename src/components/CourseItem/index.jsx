import React from "react";
import { PATHS } from "../../constant/path";
import { Link } from "react-router-dom";
import { COURSE_TYPES } from "../../constant/general";
import { ROLES } from "../../constant/roles";
import Button from "../Button";
import { formatCurrency, formatDate } from "../../utils/format";

const CourseItem = ({
  type = COURSE_TYPES.normal,
  slug,
  image,
  name,
  teams,
  startDate,
  tags,
  price,
}) => {
  const detailPath = PATHS.COURSE.INDEX + `/${slug}`;
  const orderPath = PATHS.COURSE.ORDER + `/${slug}`;

  const teacherInfo = teams?.find((team) => team?.tags.includes(ROLES.teacher));

  if (type === COURSE_TYPES.coming) {
    return (
      <div className="coursecoming__item">
        <div className="coursecoming__item-img">
          <Link to={detailPath}>
            <img src={image || ""} alt="Khóa học sắp ra mắt CFD" />
          </Link>
        </div>
        <div className="coursecoming__item-content">
          <p className="category label">Front-end</p>
          <h2 className="title --t2">
            <Link to={detailPath}>{name || ""}</Link>
          </h2>
          {!!teacherInfo && (
            <div className="user">
              <div className="user__img">
                <img src={teacherInfo.image || ""} alt="Avatar teacher" />
              </div>
              <p className="user__name">{teacherInfo.name || ""}</p>
            </div>
          )}
          <div className="info">
            {!!startDate && (
              <div className="labeltext">
                <span className="label --blue">Ngày khai giảng</span>
                <p className="title --t2">{formatDate(startDate)}</p>
              </div>
            )}
            {tags?.length > 0 && (
              <div className="labeltext">
                <span className="label --blue">Hình thức học</span>
                <p className="title --t2">{tags.join(" | ")}</p>
              </div>
            )}
          </div>
          <div className="btnwrap">
            <Button link={orderPath}>Đăng Ký Học</Button>
            <Button link={detailPath} variant="border">
              Xem chi tiết
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (type === COURSE_TYPES.normal) {
    return (
      <div className="courses__list-item">
        <div className="img">
          <Link to={detailPath}>
            <img
              src={image || ""}
              alt="Khóa học CFD"
              className="course__thumbnail"
            />
            {tags?.length > 0 && (
              <span className="course__img-badge badge">
                {tags.join(" | ")}
              </span>
            )}
          </Link>
        </div>
        <div className="content">
          <p className="label">Front-End</p>
          <h3 className="title --t3">
            <Link to={detailPath}>{name || ""}</Link>
          </h3>
          <div className="content__info">
            {!!teacherInfo && (
              <div className="user">
                <div className="user__img">
                  <img src={teacherInfo.image} alt="Avatar teacher" />
                </div>
                <p className="user__name">{teacherInfo.name}</p>
              </div>
            )}
            <div className="price">
              <strong>{formatCurrency(price || 0)}đ</strong>
            </div>
          </div>
          {/* <div className="content__action">
            <Button link={orderPath}>Đăng ký ngay</Button>
            <Button link={detailPath} variant="border">
              <img src="img/icon-paper.svg" alt="icon paper" />
              Xem chi tiết
            </Button>
          </div> */}
        </div>
      </div>
    );
  }
};

export default CourseItem;
