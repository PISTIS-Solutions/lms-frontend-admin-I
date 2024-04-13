import Cookies from "js-cookie";

export const baseURL = "https://pistis-lms-backend.onrender.com/api/v1/auth";

const courseID = Cookies.get("courseId");

export const urls = {
  signin: `${baseURL}/jwt/create/`,
  adminDashboard: `${baseURL}/users/admin/dashboard/`,
  adminRefreshToken: `${baseURL}/jwt/refresh/`,
  changePassword: `${baseURL}/users/student/reset_password_confirm/`,
  getCourses: `${baseURL}/courses/`,
  uploadCourses: `${baseURL}/courses/`,
  uploadModules: `${baseURL}/courses/${courseID}/modules/`,
  uploadProjects: `${baseURL}/courses/${courseID}/projects/`,
  forgotPassword: `${baseURL}/users/student/reset_password/`,
  deleteCourse: `${baseURL}/courses`,
  getStudents: `${baseURL}/users/student/`,
  // studentRead: `${baseURL}/users/student/{id}/`,
  updateStudentProfile: `${baseURL}/users/student/me/`,
  setStudentPassword: `${baseURL}/users/student/set_password/`,
  projectOverview: `${baseURL}/users/student/project_overview/`,
};