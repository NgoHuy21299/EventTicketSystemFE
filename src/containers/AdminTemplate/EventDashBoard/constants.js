const headCells = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "Mã sự kiện",
    sortFunction: true,
  },
  {
    id: "image",
    numeric: false,
    disablePadding: false,
    label: "Hình ảnh",
    sortFunction: false,
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Tên sự kiện",
    sortFunction: true,
  },
  {
    id: "startEndDate",
    numeric: false,
    disablePadding: false,
    label: "Ngày bắt đầu - kết thúc",
    sortFunction: true,
  },
  {
    id: " address",
    numeric: false,
    disablePadding: false,
    label: "Địa chỉ",
    sortFunction: true,
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Hành động",
    sortFunction: false,
  },
];

export { headCells };
