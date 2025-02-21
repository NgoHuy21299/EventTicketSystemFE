const headCells = [
  {
    id: "ID",
    numeric: false,
    disablePadding: true,
    label: "Mã người dùng",
    sortFunction: true,
  },
  {
    id: "taiKhoan",
    numeric: false,
    disablePadding: false,
    label: "Tên",
    sortFunction: false,
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
    sortFunction: true,
  },
  {
    id: "soDienThoai",
    numeric: false,
    disablePadding: false,
    label: "Số điện thoại",
    sortFunction: true,
  },
  {
    id: "isActive",
    numeric: false,
    disablePadding: false,
    label: "Đang hoạt động",
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

export default headCells;
