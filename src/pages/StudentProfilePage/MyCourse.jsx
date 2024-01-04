import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { PATHS } from "@/constant/path";
import { formatCurrency } from "@/utils/format";
import Button from "@/components/Button";
import { ROLES } from "@/constant/roles";
import { Empty } from "antd";

const MyCourse = () => {
  const { courseInfo } = useAuthContext();

  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      <div className="courses__list">
        {/* Case: Empty data */}
        {courseInfo?.length === 0 && (
          <Empty
            description="Không có khóa học nào"
            style={{ margin: "0 auto" }}
          />
        )}

        {/* Case: Has course */}
        {courseInfo?.length > 0 &&
          courseInfo.map((item, index) => {
            const { id, image, tags, title, price, teams, slug } =
              item.course || {};
            const teacherInfo =
              teams?.find((team) => team?.tags?.includes(ROLES.teacher)) || {};

            const detailPath = PATHS.COURSE.INDEX + `/${slug}`;

            return (
              <div key={id || index} className="courses__list-item">
                <div className="img">
                  <Link to={detailPath}>
                    <img
                      src={image || ""}
                      alt="Khóa học CFD"
                      className="course__thumbnail"
                    />
                    <span className="course__img-badge badge">
                      {tags?.join(" | ")}
                    </span>
                  </Link>
                </div>
                <div className="content">
                  <p className="label">Front-End</p>
                  <h3 className="title --t3">
                    <Link to={detailPath}>{title || ""}</Link>
                  </h3>
                  <div className="content__info">
                    <div className="user">
                      <div className="user__img">
                        <img
                          src={teacherInfo?.image || ""}
                          alt="Avatar teacher"
                        />
                      </div>
                      <p className="user__name">{teacherInfo?.name || ""}</p>
                    </div>
                    <div className="price">
                      <strong>{formatCurrency(price) || 0}đ</strong>
                    </div>
                  </div>
                  <div className="content__action">
                    <Button link={detailPath}>Đăng ký ngay</Button>
                    <Button link={detailPath} variant="default">
                      <img src="/img/icon-paper.svg" alt="icon paper" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MyCourse;
