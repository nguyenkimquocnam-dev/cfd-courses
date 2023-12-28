import React from "react";
import useQuery from "../../hooks/useQuery";
import { courseService } from "../../services/courseService";
import { galleryService } from "../../services/galleryService";
import { questionService } from "../../services/questionService";
import { teamService } from "../../services/teamService";
import CallRegisterSection from "./CallRegisterSection";
import CourseComingSection from "./CourseComingSection";
import CoursesSection from "./CoursesSection";
import FAQSection from "./FAQSection";
import FeaturedSection from "./FeaturedSection";
import GallerySection from "./GallerySection";
import HeroSection from "./HeroSection";
import TeacherSection from "./TeacherSection";
import TestimonialSection from "./TestimonialSection";

const HomePage = () => {
  // Courses Service
  const {
    data: coursesData,
    error: coursesError,
    loading: coursesLoading,
  } = useQuery(courseService.getCourses);

  // Get Courses
  const courses = coursesData?.courses || [];

  // Get Coming Courses
  const comingCourses =
    courses.filter((course) => {
      return course.startDate && new Date(course.startDate) > new Date();
    }) || [];

  // Teams Service
  const {
    data: teamsData,
    loading: teamsLoading,
    error: teamsError,
  } = useQuery(teamService.getTeams);

  // Get teams
  const teams = teamsData?.teams || [];

  // Questions Service
  const {
    data: questionsData,
    loading: questionsLoading,
    error: questionsError,
  } = useQuery(questionService.getQuestions);

  const questions = questionsData?.questions || [];

  // Gallery Service
  const {
    data: galleriesData,
    loading: galleriesLoading,
    error: galleriesError,
  } = useQuery(galleryService.getGalleries);

  // Get galleries image
  const galleries = galleriesData?.galleries?.[0]?.images || [];

  return (
    <main className="mainwrapper">
      <HeroSection />
      <CourseComingSection courses={comingCourses} loading={coursesLoading} />
      <CoursesSection courses={courses} loading={coursesLoading} />
      <TeacherSection teachers={teams} loading={teamsLoading} />
      <FeaturedSection />
      <TestimonialSection />
      <FAQSection questions={questions} loading={questionsLoading} />
      <GallerySection galleries={galleries} loading={galleriesLoading} />
      <CallRegisterSection />
    </main>
  );
};

export default HomePage;
