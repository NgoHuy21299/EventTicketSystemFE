import axiosClient from "./config/axiosClient";

const resourceName = "event";

const eventApi = {
  getBannerList: () => {
    const url = resourceName + "/LayDanhSachBanner";
    return axiosClient.get(url);
  },
  getEventList: (params, eventName) => {
    let url;
    url = resourceName + "/event-list";
    return axiosClient.get(url);
    // if (eventName !== "") {
    //   url = resourceName + `LayDanhSachPhim?maNhom=${params.maNhom}&tenPhim=${eventName}`;
    //   return axiosClient.get(url);
    // } else {
    //   url = resourceName + "LayDanhSachPhim";
    //   return axiosClient.get(url, { params });
    // }
  },
  getPaginatedEventList: (params) => {
    const url = resourceName + "/LayDanhSachPhimPhanTrang";
    return axiosClient.get(url, { params });
  },
  getEventListByDate: (params) => {
    const url = resourceName + "/LayDanhSachPhimTheoNgay";
    return axiosClient.get(url, { params });
  },
  getEventDetails: (params) => {
    const url = resourceName + `/event-detail/${params}`;
    return axiosClient.get(url);
  },
  deleteEvent: (params) => {
    const url = resourceName + `/XoaPhim?MaPhim=${params}`;
    return axiosClient.delete(url);
  },
  addEvent: (formData) => {
    const url = resourceName;
    return axiosClient.post(url, formData);
  },
  editEvent: (formData) => {
    const url = resourceName + "/CapNhatPhimUpload";
    return axiosClient.post(url, formData);
  },
};

export default eventApi;
