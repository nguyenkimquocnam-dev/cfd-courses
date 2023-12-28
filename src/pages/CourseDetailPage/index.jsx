import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ROLES } from "../../constant/roles";
import useMutation from "../../hooks/useMutation";
import useQuery from "../../hooks/useQuery";
import { courseService } from "../../services/courseService";
import { questionService } from "../../services/questionService";
import { formatCurrency, formatDate } from "../../utils/format";
import FAQSection from "../HomePage/FAQSection";
import ContentDetailSection from "./ContentDetailSection";
import CoursesSection from "./CoursesSection";
import FeaturedSection from "./FeaturedSection";
import HeaderTop from "./HeaderTop";
import HeroSection from "./HeroSection";

const CourseDetailPage = () => {
  const { courseSlug } = useParams();

  // Get course detail
  const {
    data: courseDetailData,
    loading: courseDetailLoading,
    execute,
  } = useMutation(courseService.getCourseBySlug);
  useEffect(() => {
    if (!!courseSlug) {
      execute(courseSlug || "", {});
    }
  }, [courseSlug]);

  const orderLink = `/course-order/${courseSlug}`;
  const { teams, startDate, price } = courseDetailData || {};

  const modifiedProps = {
    ...courseDetailData,
    teacherInfo: teams?.find((item) => item.tags.includes(ROLES.teacher)),
    startDate: formatDate(startDate || ""),
    price: formatCurrency(price),
    orderLink,
  };

  // Get questions
  const { data: questionsData, loading: questionsLoading } = useQuery(
    questionService.getQuestions
  );
  const questions = questionsData?.questions || [];

  // Get courses
  const { data: coursesData, loading: coursesLoading } = useQuery(
    courseService.getCourses
  );
  const courses = coursesData?.courses || [];

  return (
    <>
      <HeaderTop />
      <main className="mainwrapper coursedetailpage">
        <HeroSection {...modifiedProps} />
        <ContentDetailSection {...modifiedProps} />
        <FeaturedSection />
        <FAQSection questions={questions} loading={questionsLoading} />
        <CoursesSection courses={courses} loading={coursesLoading} />
      </main>
    </>
  );
};

export default CourseDetailPage;
