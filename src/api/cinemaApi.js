import axiosClient from "./config/axiosClient";

const resourceName = "QuanLyRap/";

const cinemaApi = {
  getCinemaSystemSchedule: (params) => {
    const url = resourceName + "LayThongTinLichChieuHeThongRap";
    return axiosClient.get(url, { params });
  },
  getEventSchedule: (params) => {
    const url = resourceName + "LayThongTinLichChieuPhim";
    return axiosClient.get(url, { params });
  },

  getCinemaGroupBySystem: (params) => {
    const url = resourceName + `LayThongTinCumRapTheoHeThong?maHeThongRap=${params}`;
    return axiosClient.get(url);
  },
};

export default cinemaApi;
