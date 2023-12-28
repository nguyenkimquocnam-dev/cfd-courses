import React from "react";
import useQuery from "../../hooks/useQuery";
import { courseService } from "../../services/courseService";
import CourseItem from "../../components/CourseItem";
import { Empty, Skeleton } from "antd";
import useDebounce from "../../hooks/useDebounce";

const CoursePage = () => {
  // Call API get courses
  const { data, loading: apiLoading } = useQuery(courseService.getCourses);
  const loading = useDebounce(apiLoading, 300);

  // Get courses list from response API
  const courses = data?.courses || [];

  return (
    <main className="mainwrapper courses --ptop">
      <div className="container">
        <div className="textbox">
          <div className="container">
            <h2 className="title --t2">Tất cả khoá học</h2>
          </div>
        </div>
        <div className="courses__list">
          {/* Case: Calling API */}
          {loading &&
            Array(4)
              .fill("")
              .map((_, index) => {
                return (
                  <div
                    key={index}
                    className="courses__list-item"
                    style={{ height: "50vh" }}
                  >
                    <Skeleton active />
                    <br />
                    <Skeleton active />
                  </div>
                );
              })}

          {/* Case: Success */}
          {!loading &&
            courses?.length > 0 &&
            courses.map((course, index) => {
              return <CourseItem key={course?.id || index} {...course} />;
            })}

          {/* Case: No data */}
          {!loading && courses?.length === 0 && (
            <Empty
              description="Không tìm thấy dữ liệu nào"
              style={{ margin: "0 auto" }}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default CoursePage;
