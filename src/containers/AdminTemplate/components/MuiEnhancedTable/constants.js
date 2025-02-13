//Others
import { eventApi, userApi } from "@/api";

const headCells = [
  {
    id: "maPhim",
    numeric: true,
    disablePadding: true,
    label: "Mã event",
    sortFunction: true,
  },
  {
    id: "hinhAnh",
    numeric: false,
    disablePadding: false,
    label: "Hình ảnh",
    sortFunction: false,
  },
  {
    id: "tenPhim",
    numeric: false,
    disablePadding: false,
    label: "Tên sự kiện",
    sortFunction: true,
  },
  {
    id: "moTa",
    numeric: false,
    disablePadding: false,
    label: "Mô tả",
    sortFunction: true,
  },
  {
    id: "hanhDong",
    numeric: false,
    disablePadding: false,
    label: "Hành động",
    sortFunction: false,
  },
];

const fetchUserDelete = async (userAccount) => {
  try {
    await userApi.deleteUser(userAccount);
  } catch (error) {
    alert(error);
  }
};

const fetchEventDelete = async (eventId) => {
  try {
    await eventApi.deleteEvent(eventId);
  } catch (error) {
    alert(error);
  }
};

export { headCells, fetchUserDelete, fetchEventDelete };
