import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LoginIcon from "@mui/icons-material/Login";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isHome = location.pathname === "/";

  // Detect scroll for home page
  useEffect(() => {
    const handleScroll = () => {
      const vh30 = window.innerHeight * 0.3;
      setIsScrolled(window.scrollY > vh30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation links
  const navLinks = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/shop" },
    { name: "Featured", link: "/featured" },
    { name: "Pages", link: "/pages" },
    { name: "Blogs", link: "/blogs" },
  ];

  const bgColor =
    isHome && !isScrolled
      ? "transparent"
      : theme.palette.mode === "dark"
      ? theme.palette.dark.main
      : "#fff";

  const textColor =
    isHome && !isScrolled
      ? theme.palette.light.main
      : theme.palette.text.primary;

  const handleLogoClick = () => navigate("/");

  const handleLoginOrProfile = () => {
    if (user) navigate("/member/profile");
    else navigate("/login");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Drawer (mobile)
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={isHome && !isScrolled ? 0 : 2}
        sx={{
          backgroundColor: bgColor,
          transition: "background-color 0.3s ease, box-shadow 0.3s ease",
          color: textColor,
          boxShadow:
            isHome && !isScrolled ? "none" : "0 2px 6px rgba(0,0,0,0.1)",
          borderRadius: "0 0 20px 20px",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 2, md: 6 },
            py: 1.5,
          }}
        >
          {/* ====== Logo ====== */}
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <img
              src="/logo.png"
              alt="Logo"
              style={{ height: 40 }}
              onClick={handleLogoClick}
            />
          </Box>

          {/* ====== Center Nav (Desktop) ====== */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 4,
              alignItems: "center",
            }}
          >
            {navLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.link}
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: isActive ? theme.palette.primary.main : textColor,
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  transition: "color 0.2s ease",
                })}
              >
                {item.name}
              </NavLink>
            ))}
          </Box>

          {/* ====== Right Icons ====== */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Mobile menu button */}
            <IconButton
              onClick={toggleDrawer(true)}
              sx={{
                display: { xs: "flex", md: "none" },
                color:
                  isHome && !isScrolled
                    ? theme.palette.light.main
                    : theme.palette.primary.main,
              }}
            >
              <MenuRoundedIcon />
            </IconButton>

            {/* Login/Profile button (always visible) */}
            <IconButton
              onClick={handleLoginOrProfile}
              sx={{
                color:
                  isHome && !isScrolled
                    ? theme.palette.light.main
                    : theme.palette.primary.main,
                border: "1.5px solid",
                borderColor:
                  isHome && !isScrolled
                    ? theme.palette.light.main
                    : theme.palette.primary.main,
                borderRadius: "12px",
                "&:hover": {
                  backgroundColor:
                    isHome && !isScrolled
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.05)",
                },
              }}
            >
              {user ? <AccountCircleRoundedIcon /> : <LoginIcon />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ====== Drawer (Mobile Navigation) ====== */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: "70%",
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            pt: 2,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            mb: 1,
          }}
        >
          <img
            src="/logo.png"
            alt="Logo"
            style={{ height: 35, cursor: "pointer" }}
            onClick={() => {
              handleLogoClick();
              setDrawerOpen(false);
            }}
          />
          <IconButton onClick={toggleDrawer(false)}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        <List>
          {navLinks.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.link}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  py: 1.5,
                  px: 3,
                  "&.active": {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    fontWeight: 500,
                    fontSize: "1rem",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          {user && (
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleLogout();
                  setDrawerOpen(false);
                }}
                sx={{ py: 1.5, px: 3 }}
              >
                <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{
                    fontWeight: 500,
                    fontSize: "1rem",
                  }}
                />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
