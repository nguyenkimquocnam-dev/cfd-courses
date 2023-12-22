import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import CoursePage from "./pages/CoursePage";
import CourseOrderPage from "./pages/CourseOrderPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import PrivacyPage from "./pages/PrivacyPage";
import StudentProfilePage from "./pages/StudentProfilePage";
import PaymentMethodPage from "./pages/PaymentMethodPage";
import MyInfo from "./pages/StudentProfilePage/MyInfo";
import MyCourse from "./pages/StudentProfilePage/MyCourse";
import MyPayment from "./pages/StudentProfilePage/MyPayment";
import { PATHS } from "./constant/path";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.HOME} element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path={PATHS.ABOUT} element={<AboutPage />} />
          <Route path={PATHS.CONTACT} element={<ContactPage />} />
          <Route path={PATHS.PAYMENT_METHOD} element={<PaymentMethodPage />} />
          <Route path={PATHS.PRIVACY} element={<PrivacyPage />} />

          <Route path={PATHS.PROFILE.INDEX} element={<StudentProfilePage />}>
            <Route index element={<MyInfo />} />
            <Route path={PATHS.PROFILE.MY_COURSE} element={<MyCourse />} />
            <Route path={PATHS.PROFILE.MY_PAYMENT} element={<MyPayment />} />
          </Route>

          <Route path={PATHS.BLOG.INDEX} element={<BlogPage />} />
          <Route path={PATHS.BLOG.DETAIL} element={<BlogDetailPage />} />

          <Route path={PATHS.COURSE.INDEX} element={<CoursePage />} />
          <Route path={PATHS.COURSE.DETAIL} element={<CourseDetailPage />} />
          <Route
            path={PATHS.COURSE.ORDER_DETAIL}
            element={<CourseOrderPage />}
          />

          <Route path={PATHS.NOT_FOUND} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
