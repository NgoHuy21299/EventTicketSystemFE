import axiosClient from "./config/axiosClient";

const resourceName = "user/";

const userApi = {
  login: (user) => {
    const url = resourceName + "login";
    return axiosClient.post(url, user);
  },
  register: (user) => {
    const url = resourceName + "DangKy";
    return axiosClient.post(url, user);
  },
  getUser: (request) => {
    const url = resourceName + "profile";
    return axiosClient.get(url);
  },
  updateUserProfile: (user) => {
    const url = resourceName + "update-profile";
    return axiosClient.put(url, user);
  },
  getUserList: (params, keyword) => {
    if (keyword !== "") {
      const url = resourceName + `LayDanhSachNguoiDung?MaNhom=${params.maNhom}&tuKhoa=${keyword}`;
      return axiosClient.get(url);
    } else {
      const url = resourceName + "LayDanhSachNguoiDung";
      return axiosClient.get(url, { params });
    }
  },
  getUserDetails: (params, keyword) => {
    const url = resourceName + `LayDanhSachNguoiDung?MaNhom=${params.maNhom}&tuKhoa=${keyword}`;
    return axiosClient.get(url);
  },
  deleteUser: (userAccount) => {
    const url = resourceName + `XoaNguoiDung?TaiKhoan=${userAccount}`;
    return axiosClient.delete(url);
  },
  addUser: (formData) => {
    const url = resourceName + "ThemNguoiDung";
    return axiosClient.post(url, formData);
  },
  editUser: (userAccount) => {
    const url = resourceName + "CapNhatThongTinNguoiDung";
    return axiosClient.post(url, userAccount);
  },
};

export default userApi;
