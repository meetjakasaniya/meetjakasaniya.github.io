import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Typography,
  Box,
  Container,
  Stack,
  Button,
  Slide,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import { keyframes } from "@mui/system";

const menuItems = [
  { text: "About", href: "#about" },
  { text: "Projects", href: "#projects" },
  { text: "Education", href: "#education" },
  { text: "Skills", href: "#skills" },
  { text: "Contact", href: "#contact" },
];

const Header = ({ darkMode, toggleTheme }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScrollActiveLink = () => {
      let currentSection = "";
      menuItems.forEach((item) => {
        const section = document.querySelector(item.href);
        if (section) {
          const sectionTop = section.offsetTop;
          if (window.scrollY >= sectionTop - 150) {
            currentSection = item.href;
          }
        }
      });
      setActiveLink(currentSection);
    };
    window.addEventListener("scroll", handleScrollActiveLink);
    handleScrollActiveLink();
    return () => window.removeEventListener("scroll", handleScrollActiveLink);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (href) => {
    if (isMobile) {
      setMobileOpen(false);
    }
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const logoGlow = keyframes`
    0% { filter: drop-shadow(0 0 2px rgba(102, 126, 234, 0.5)); }
    50% { filter: drop-shadow(0 0 10px rgba(118, 75, 162, 0.8)); }
    100% { filter: drop-shadow(0 0 2px rgba(102, 126, 234, 0.5)); }
  `;

  const Logo = () => (
    <Box
      onClick={() => handleMenuClick("#home")}
      sx={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 1,
        "&:hover": { transform: "scale(1.02)" },
        transition: "transform 0.3s ease",
      }}
    >
      <Typography
        variant="h5"
        component="div"
        sx={{
          fontWeight: 800,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "-0.5px",
          position: "relative",
          animation: `${logoGlow} 3s infinite alternate`,
          fontSize: { xs: "1.2rem", md: "1.5rem" }
        }}
      >
        Mit Jakasaniya
      </Typography>
    </Box>
  );

  const drawer = (
    <Box
      sx={{
        width: 300,
        height: "100%",
        background: darkMode
          ? "linear-gradient(135deg, rgba(15, 15, 35, 0.95), rgba(20, 20, 40, 0.98))"
          : "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        p: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4, alignItems: "center" }}>
        <Typography variant="h6" fontWeight={700} color={darkMode ? "white" : "text.primary"}>
          Menu
        </Typography>
        <IconButton onClick={handleDrawerToggle} sx={{ color: darkMode ? "white" : "text.primary" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item, index) => (
          <Slide direction="left" in={mobileOpen} timeout={200 + index * 50} key={item.text}>
            <ListItemButton
              onClick={() => handleMenuClick(item.href)}
              sx={{
                borderRadius: 2,
                mb: 1,
                py: 1.5,
                background: activeLink === item.href
                  ? "linear-gradient(90deg, rgba(102, 126, 234, 0.1), transparent)"
                  : "transparent",
                borderLeft: activeLink === item.href ? "4px solid #764ba2" : "4px solid transparent",
                "&:hover": {
                  background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                }
              }}
            >
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: activeLink === item.href ? 700 : 500,
                  color: darkMode ? "white" : "text.primary"
                }}
              />
            </ListItemButton>
          </Slide>
        ))}
      </List>

      <Button
        variant="contained"
        startIcon={<DownloadIcon />}
        href="/Mit_Jakasaniya_Resume.pdf"
        download
        className="system-cursor"
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: 3,
          py: 1.5,
          textTransform: "none",
          fontWeight: 600,
          boxShadow: "0 4px 14px 0 rgba(118, 75, 162, 0.39)",
          cursor: "pointer"
        }}
      >
        Download Resume
      </Button>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: "transparent",
        boxShadow: "none",
        top: 0,
        left: 0,
        right: 0,
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        padding: scrolled ? { xs: "10px 0", md: "15px 0" } : { xs: "20px 0", md: "30px 0" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1100,
      }}
    >
      <Container
        maxWidth="lg"
      >
        <Toolbar
          disableGutters
          sx={{
            justifyContent: "space-between",
            minHeight: "60px !important",
            background: scrolled
              ? darkMode
                ? "rgba(15, 23, 42, 0.8)"
                : "rgba(255, 255, 255, 0.8)"
              : "transparent",
            backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
            borderRadius: scrolled ? "50px" : "12px",
            border: scrolled
              ? `1px solid ${darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.3)"}`
              : "none",
            boxShadow: scrolled
              ? darkMode
                ? "0 10px 30px -10px rgba(0, 0, 0, 0.5)"
                : "0 10px 30px -10px rgba(0, 0, 0, 0.1)"
              : "none",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            px: scrolled ? 3 : 0,
            width: "100%"
          }}
        >
          <Logo />

          {isMobile ? (
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton onClick={toggleTheme} sx={{ color: darkMode ? 'white' : 'text.primary' }}>
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              <IconButton
                onClick={handleDrawerToggle}
                sx={{
                  color: darkMode ? "white" : "text.primary",
                  background: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                }}
              >
                <MenuIcon />
              </IconButton>
            </Stack>
          ) : (
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box
                sx={{
                  display: "flex",
                  background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.5)",
                  borderRadius: "50px",
                  p: 0.5,
                  border: `1px solid ${darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
                  backdropFilter: "blur(10px)",
                }}
              >
                {menuItems.map((item) => (
                  <Button
                    key={item.text}
                    onClick={() => handleMenuClick(item.href)}
                    sx={{
                      color: activeLink === item.href
                        ? "#fff"
                        : darkMode ? "#94a3b8" : "#64748b",
                      background: activeLink === item.href
                        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                        : "transparent",
                      borderRadius: "30px",
                      px: 2.5,
                      py: 0.8,
                      fontWeight: activeLink === item.href ? 600 : 500,
                      textTransform: "none",
                      minWidth: "auto",
                      "&:hover": {
                        color: activeLink === item.href ? "#fff" : darkMode ? "#fff" : "#1e293b",
                        background: activeLink === item.href
                          ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                          : darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>

              <Box sx={{ width: "1px", height: "24px", bgcolor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)", mx: 2 }} />

              <IconButton
                onClick={toggleTheme}
                sx={{
                  color: darkMode ? "#fbbf24" : "#f59e0b",
                  transform: darkMode ? "rotate(0deg)" : "rotate(180deg)",
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    bgcolor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                  }
                }}
              >
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>

              <Button
                component="a"
                href="/Mit_Jakasaniya_Resume.pdf"
                download
                variant="outlined"
                className="system-cursor"
                sx={{
                  borderRadius: "50px",
                  borderColor: darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(100, 100, 100, 0.2)",
                  color: darkMode ? "#fff" : "#1e293b",
                  textTransform: "none",
                  fontWeight: 600,
                  px: 2.5,
                  minWidth: "auto",
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: "#667eea",
                    color: "#667eea",
                    background: "transparent"
                  }
                }}
              >
                Resume
              </Button>
            </Stack>
          )}
        </Toolbar>
      </Container>
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            background: "transparent",
            boxShadow: "none",
            width: "auto"
          }
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header;
