import Cookies from "js-cookie";

// export const baseURL = process.env.NEXT_PUBLIC_API_URL;
// export const baseURL = "https://backend.dev.pististechub.io/api/v2/auth";
//export const baseURL = "https://lms-backend-1-9kcc.onrender.com/api/v2/auth";
// export const baseURL = "https://lms-backend-1-9kcc.onrender.com/api/v2/auth";
export const baseURL = "https://backend.pististechub.io/api/v2/auth";
const courseID = Cookies.get("courseId");

export const urls = {
  signin: `${baseURL}/jwt/create/`,
  adminDashboard: `${baseURL}/mentors/dashboard/`,
  adminRefresh: `${baseURL}/jwt/refresh/`,
  changePassword: `${baseURL}/users/reset_password_confirm/`,
  getCourses: `${baseURL}/courses/`,
  uploadCourses: `${baseURL}/courses/`,
  uploadModules: `${baseURL}/courses/${courseID}/modules/`,
  uploadProjects: `${baseURL}/courses/${courseID}/projects/`,
  forgotPassword: `${baseURL}/users/reset_password/`,
  deleteCourse: `${baseURL}/courses`,
  getStudents: `${baseURL}/users/`,
  updateStudentProfile: `${baseURL}/users/me/`,
  setStudentPassword: `${baseURL}/users/set_password/`,
  projectOverview: `${baseURL}/pending-grading/`,
  deleteStudent: `${baseURL}/users/deactivate_me/`,
  projectReview: `${baseURL}/project-review/`,
  manageStudentStatus: `${baseURL}/users/admin/manage-subscriptions/`,
  UpdateCourses: `${baseURL}/courses/update-order/`,
  mentorList: `${baseURL}/mentors/`,
  manageRole: `${baseURL}/mentors/manage_role/`,
  inviteMentor: `${baseURL}/mentors/invite/`,
  exportMentor: `${baseURL}/mentors/export_pdf/`,
  uploadMentor: `${baseURL}/mentors/activate/`,
  exportStudents: `${baseURL}/students/export_to_excel/`,
  cohorts: `${baseURL}/cohorts/`,
  coupon: `${baseURL}/coupon-codes/`,

  blog: `${baseURL}/blogs/`,
  booking: `${baseURL}/booking-sessions/`,
};
