import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EventIcon from "@mui/icons-material/Event";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HistoryIcon from "@mui/icons-material/History";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LoginIcon from "@mui/icons-material/Login";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
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
    { name: "Date Plans", link: "/sales", icon: <EventIcon /> },
    { name: "Events", link: "/events", icon: <EventAvailableIcon /> },
    { name: "My History", link: "/sales-history", icon: <HistoryIcon /> },
    { name: "Plans & Pricing", link: "/package", icon: <MonetizationOnIcon /> },
    { name: "FAQ", link: "/faq", icon: <HelpOutlineIcon /> },
    { name: "Blog", link: "/blog", icon: <ArticleRoundedIcon /> },
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
        position={location.pathname === "/" ? "absolute" : "sticky"}
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
              gap: 1,
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
                      gap: 0.8,
                      px: 2,
                      py: 1,
                      borderRadius: 3,
                      color: isActive ? theme.palette.primary.main : textColor,
                      backgroundColor: isActive
                        ? isWhite
                          ? "rgba(25, 118, 210, 0.08)"
                          : "rgba(255,255,255,0.1)"
                        : "transparent",
                      transition: "all 0.2s ease",
                      fontWeight: isActive ? 600 : 500,
                      "&:hover": {
                        backgroundColor: isActive
                          ? isWhite
                            ? "rgba(25, 118, 210, 0.12)"
                            : "rgba(255,255,255,0.15)"
                          : isWhite
                          ? "rgba(0,0,0,0.06)"
                          : "rgba(255,255,255,0.08)",
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "grid",
                        placeItems: "center",
                        fontSize: "1.1rem",
                        opacity: isActive ? 1 : 0.8,
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Box
                      component="span"
                      sx={{
                        fontSize: "0.9rem",
                        letterSpacing: "0.02em",
                      }}
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

        <List sx={{ px: 1 }}>
          {navLinks.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.link}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  py: 1.5,
                  px: 2,
                  borderRadius: 2,
                  mx: 1,
                  mb: 0.5,
                }}
              >
                {(() => {
                  const isActive = location.pathname === item.link;
                  return (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        width: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: 2.5,
                          display: "grid",
                          placeItems: "center",
                          backgroundColor: isActive
                            ? theme.palette.primary.main
                            : theme.palette.action.hover,
                          "& svg": {
                            color: isActive
                              ? "#fff"
                              : theme.palette.text.primary,
                            fontSize: "1.2rem",
                          },
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Box
                        sx={{
                          flexGrow: 1,
                        }}
                      >
                        <ListItemText
                          primary={item.name}
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontWeight: isActive ? 600 : 500,
                              color: isActive
                                ? theme.palette.primary.main
                                : theme.palette.text.primary,
                              fontSize: "1rem",
                              letterSpacing: "0.01em",
                            },
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
