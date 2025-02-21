import axiosClient from "./config/axiosClient";

const resourceName = "user";

const userApi = {
  login: (user) => {
    const url = resourceName + "/login";
    return axiosClient.post(url, user);
  },
  register: (user) => {
    const url = resourceName + "/register";
    return axiosClient.post(url, user);
  },
  forgotPassword: (email) => {
    const url = resourceName + "/forgot-password";
    return axiosClient.post(url, email);
  },
  getUser: (request) => {
    const url = resourceName + "/profile";
    return axiosClient.get(url);
  },
  updateUserProfile: (user) => {
    const url = resourceName + "/update-profile";
    return axiosClient.put(url, user);
  },
  getUserList: (keyword) => {
    const url = resourceName + `/filter`;
    if (keyword && keyword !== "") {
      return axiosClient.get(url, { params: {search: keyword }});
    } else  {
      return axiosClient.get(resourceName + "/filter");
    }
  },
  getUserDetails: (id) => {
    const url = resourceName + `/${id}`;
    return axiosClient.get(url);
  },
  deleteUser: (userAccount) => {
    const url = resourceName + `/${userAccount}`;
    return axiosClient.delete(url);
  },
  addUser: (formData) => {
    const url = resourceName;
    return axiosClient.post(url, formData);
  },
  editUser: (userID, formData) => {
    const url = resourceName + `/${userID}`;
    return axiosClient.put(url, formData);
  },
};

export default userApi;
