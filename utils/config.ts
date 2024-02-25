export const baseURL = "https://pistis-lms-backend.onrender.com/api/v1/auth";

export const urls = {
  signin: `${baseURL}/jwt/create/`,
  adminDashboard: `${baseURL}/users/admin/dashboard/`,
  adminRefreshToken: `${baseURL}/jwt/refresh/`,
  uploadCourses: `${baseURL}/users/courses/`,
  changePassword: `${baseURL}/users/student/reset_password_confirm/`,
};
