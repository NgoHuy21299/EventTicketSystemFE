import { CalendarMonth, LocalMovies, PeopleAlt } from "@mui/icons-material";
// Material UI
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const items = [
  {
    Icon: PeopleAlt,
    label: "Quản lý người dùng",
    path: "user-management",
  },
  {
    Icon: LocalMovies,
    label: "Quản lý phim",
    path: "event-management",
  },
];

const DrawerItems = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = (path) => navigate(path);

  const active = items.findIndex((item) => {
    const subpath = pathname.split("/");
    return item.path === subpath[2];
  });

  return items.map((Item, idx) => (
    <ListItemButton
      key={idx}
      className={`admin-drawer-list__item ${idx === active ? "active" : ""}`}
      onClick={() => handleClick(Item.path)}
    >
      <ListItemIcon sx={{ minWidth: "40px" }}>
        <Item.Icon sx={{ color: "#fff" }} />
      </ListItemIcon>
      <ListItemText primary={Item.label} sx={{ "> span": { fontSize: "16px" } }} />
    </ListItemButton>
  ));
};
export default DrawerItems;
