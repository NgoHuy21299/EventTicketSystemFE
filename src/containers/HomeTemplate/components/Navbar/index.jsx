import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROLE } from "@/constants";
import SignalRNotification from "../Notification";

//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn, faUser } from "@fortawesome/free-solid-svg-icons";

// Material UI
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// Components
import Image from "@/components/Image";
import images from "@/assets/images";

import "./style.scss";

const Navbar = () => {
  const { t } = useTranslation();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (e) => {
    if (e.target.innerHTML === "Đăng xuất") {
      localStorage.removeItem("user");
      navigate("/");
    }

    setAnchorElUser(null);
  };

  //Check if user is signed in
  const user = localStorage.getItem("user");
  let isAdmin = false;
  let userRoles = {};

  if (user) {
    userRoles = JSON.parse(user)?.roles;
    isAdmin = userRoles.some((role) => [ROLE.ADMIN].includes(role));
  }

  const settings = isAdmin
    ? [
        { label: "Hồ sơ cá nhân", to: "/profile" },
        { label: "Quản lý", to: "/admin" },
        { label: "Đăng xuất", to: "/" },
      ]
    : [
        { label: "Hồ sơ cá nhân", to: "/profile" },
        { label: "Đăng xuất", to: "/" },
      ];

  const renderProfile = () => {
    return (
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Tài khoản cá nhân">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting, index) => (
            <MenuItem key={index} component={Link} to={setting.to} onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{setting.label}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    );
  };

  return (
    <AppBar id="main-header" position="static">
      <Container className="main-header__wrapper" maxWidth="xl">
        <Toolbar className="main-header__toolbar" disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Image className="main-header__logo" src={images.logo} />
          </Typography>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon className="main-header__sidebar-icon" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu} className="main-header__navbar-item">
                <Link to="/">
                  <Typography className="main-header__navbar-item-name" textAlign="center">
                    Trang chủ
                  </Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Image className="main-header__logo" src={images.logo} />
          </Typography>
          <Box
            className="main-header__navbar-list"
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            <Link to="/">
              <Button
                className="main-header__navbar-item"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Trang chủ
              </Button>
            </Link>
          </Box>

          {/* Render action buttons if not sign in */}
          {user ? (
            renderProfile()
          ) : (
            <>
              <Link to="/auth/login" className="main-header__navbar-btn-wrapper">
                <Button className="main-header__navbar-btn">
                  <span className="hide-on-mobile">{t("login")}</span>
                  <FontAwesomeIcon className="btn__right-icon" icon={faSignIn} />
                </Button>
              </Link>
              <Link to="/auth/register" className="main-header__navbar-btn-wrapper">
                <Button className="main-header__navbar-btn">
                  <span className="hide-on-mobile">Đăng ký</span>
                  <FontAwesomeIcon className="btn__right-icon" icon={faUser} />
                </Button>
              </Link>
            </>
          )}
        </Toolbar>
      </Container>
      <SignalRNotification />
    </AppBar>
  );
};

export default Navbar;
