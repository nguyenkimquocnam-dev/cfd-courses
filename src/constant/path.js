const COURSE_PATH = "/course";
const COURSE_ORDER_PATH = "/course-order";
const PROFILE_PATH = "/profile";
const BLOG_PATH = "/blog";

export const PATHS = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  PAYMENT_METHOD: "/payment-method",
  PRIVACY: "/privacy",
  PROFILE: {
    INDEX: PROFILE_PATH,
    MY_COURSE: PROFILE_PATH + "/my-course",
    MY_PAYMENT: PROFILE_PATH + "/my-payment",
  },
  BLOG: {
    INDEX: BLOG_PATH,
    DETAIL: BLOG_PATH + "/:blogSlug",
  },
  COURSE: {
    INDEX: COURSE_PATH,
    DETAIL: COURSE_PATH + "/:courseSlug",
    ORDER: COURSE_ORDER_PATH,
    ORDER_DETAIL: COURSE_ORDER_PATH + "/:courseSlug",
  },
  NOT_FOUND: "*",
};
