import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import HistoryIcon from "@mui/icons-material/History";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LayersRoundedIcon from "@mui/icons-material/LayersRounded";
import LoginIcon from "@mui/icons-material/Login";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
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

  const isHome = location.pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      const trigger = 10; // turn white as soon as user scrolls a bit
      setIsScrolled(window.scrollY > trigger);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const navLinks = [
    { name: "Home", link: "/", icon: <HomeRoundedIcon /> },
    { name: "Shop", link: "/sales", icon: <StorefrontRoundedIcon /> },
    { name: "History", link: "/sales-history", icon: <HistoryIcon /> },
    { name: "Featured", link: "/package", icon: <StarRoundedIcon /> },
    { name: "Faq", link: "/faq", icon: <LayersRoundedIcon /> },
    { name: "Blogs", link: "/blog", icon: <ArticleRoundedIcon /> },
  ];

  const isWhite = !isHome || isScrolled;
  const bgColor = isWhite ? "#fff" : "transparent";
  const textColor = isWhite ? "#000" : theme.palette.light.main;

  const handleLogoClick = () => navigate("/");
  const handleLoginOrProfile = () =>
    user ? navigate("/member/profile") : navigate("/login");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={isWhite ? 2 : 0}
        sx={{
          backgroundColor: isWhite ? "rgba(255,255,255,0.86)" : bgColor,
          color: textColor,
          transition: "background-color 0.3s ease, box-shadow 0.3s ease",
          boxShadow: isWhite ? "0 2px 6px rgba(0,0,0,0.06)" : "none",
          borderBottom: isWhite ? `1px solid ${theme.palette.divider}` : "none",
          padding: 0,
          borderRadius: 0,
          backdropFilter: isWhite ? "saturate(180%) blur(8px)" : "none",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: { xs: 2, md: 6 },
            py: 1.5,
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={handleLogoClick}
          >
            <img src="/logo.png" alt="Logo" style={{ height: 40 }} />
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 2,
              alignItems: "center",
            }}
          >
            {navLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.link}
                style={{ textDecoration: "none" }}
              >
                {({ isActive }) => (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      px: 1,
                      py: 0.5,
                      borderRadius: 2,
                      color: isActive ? theme.palette.primary.main : textColor,
                      transition: "background-color .2s ease",
                      "&:hover": {
                        backgroundColor: isWhite
                          ? "rgba(0,0,0,0.04)"
                          : "rgba(255,255,255,0.08)",
                      },
                    }}
                  >
                    <Box sx={{ display: "grid", placeItems: "center" }}>
                      {item.icon}
                    </Box>
                    <Box
                      component="span"
                      sx={{ fontWeight: 600, fontSize: "0.95rem" }}
                    >
                      {item.name}
                    </Box>
                  </Box>
                )}
              </NavLink>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={toggleDrawer(true)}
              sx={{
                display: { xs: "flex", md: "none" },
                color: textColor,
              }}
            >
              <MenuRoundedIcon />
            </IconButton>

            <IconButton
              onClick={handleLoginOrProfile}
              sx={{
                color: textColor,

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

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: "70%",
            background:
              theme.palette.mode === "dark"
                ? theme.palette.background.paper
                : "#ffffff",
            color: theme.palette.text.primary,
            pt: 2,
            borderRadius: 0,
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
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
          <IconButton
            onClick={toggleDrawer(false)}
            sx={{
              backgroundColor: "#fff",
              border: (t) => `1px solid ${t.palette.divider}`,
              boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
              "&:hover": { backgroundColor: "#fff" },
              borderRadius: 2,
              width: 36,
              height: 36,
            }}
            aria-label="Close menu"
          >
            <CloseRoundedIcon sx={{ color: "#111" }} />
          </IconButton>
        </Box>

        <List>
          {navLinks.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.link}
                onClick={() => setDrawerOpen(false)}
                sx={{ py: 1.25, px: 2.5 }}
              >
                {(() => {
                  const isActive = location.pathname === item.link;
                  return (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.25,
                        width: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 34,
                          height: 34,
                          borderRadius: 2,
                          display: "grid",
                          placeItems: "center",
                          background: isActive
                            ? "transparent"
                            : "linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.06))",
                          border: (t) =>
                            isActive
                              ? `1px solid transparent`
                              : `1px solid ${t.palette.divider}`,
                          "& svg": {
                            color: isActive
                              ? theme.palette.primary.main
                              : theme.palette.text.primary,
                          },
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Box
                        sx={{
                          flexGrow: 1,
                          px: 1.25,
                          py: 0.9,
                          borderRadius: 0,
                          background: isActive ? "#FFFFFF" : "transparent",
                          boxShadow: isActive
                            ? "0 10px 30px rgba(0,0,0,0.12)"
                            : "none",
                        }}
                      >
                        <ListItemText
                          primary={item.name}
                          primaryTypographyProps={{
                            fontWeight: 800,
                            color: isActive ? "primary.main" : "text.primary",
                          }}
                        />
                      </Box>
                    </Box>
                  );
                })()}
              </ListItemButton>
            </ListItem>
          ))}

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleLoginOrProfile();
                setDrawerOpen(false);
              }}
              sx={{ py: 1.25, px: 2.5 }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: 2,
                    display: "grid",
                    placeItems: "center",
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.06))",
                    border: (t) => `1px solid ${t.palette.divider}`,
                  }}
                >
                  {user ? <AccountCircleRoundedIcon /> : <LoginIcon />}
                </Box>
                <ListItemText
                  primary={user ? "Profile" : "Sign in"}
                  primaryTypographyProps={{ fontWeight: 700 }}
                />
              </Box>
            </ListItemButton>
          </ListItem>

          {user && (
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleLogout();
                  setDrawerOpen(false);
                }}
                sx={{ py: 1.25, px: 2.5 }}
              >
                <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{ fontWeight: 600 }}
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
