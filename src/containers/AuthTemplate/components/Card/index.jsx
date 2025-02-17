import { useLocation } from "react-router-dom";

// Material UI
import { Stack, Avatar, Typography } from "@mui/material";

import FinnkinoLogo from "@/assets/images/header-logo.png";

const Card = ({ children }) => {
  const { pathname } = useLocation();

  const getCardTitle = () => {
    switch (pathname) {
      case "/auth/login":
        return "Đăng Nhập";
      case "/auth/register":
        return "Đăng Ký";
      case "/auth/forgot-password":
        return "Quên Mật Khẩu";
      default:
        return "Đăng Nhập";
    }
  };

  return (
    <Stack direction="column" alignItems="center" spacing={1} p={3} bgcolor="#fff">
      <Avatar alt="Finnkino logo" src={FinnkinoLogo} sx={{ width: 60, height: 60 }} />
      <Typography component="h1" variant="h5" fontSize={25} fontWeight={700} color="#FFC800">
        {getCardTitle()}
      </Typography>
      {children}
    </Stack>
  );
};

export default Card;
