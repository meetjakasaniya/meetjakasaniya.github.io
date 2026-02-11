// import React, { useState, useEffect } from 'react';
// import { AppBar, Toolbar, IconButton, Button, Drawer, List, ListItem, useMediaQuery, useTheme, Typography, Box } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';

// const Header = ({ darkMode, toggleTheme }) => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   const menuItems = [
//     { text: 'About', href: '#about' },
//     { text: 'Experience', href: '#experience' },
//     { text: 'Projects', href: '#projects' },
//     { text: 'Education', href: '#education' },
//     { text: 'Skills', href: '#skills' },
//     { text: 'Contact', href: '#contact' },
//   ];

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const handleMenuClick = (href) => {
//     setMobileOpen(false);
//     const element = document.querySelector(href);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   const drawer = (
//     <Box
//       sx={{
//         width: 250,
//         height: '100%',
//         background: darkMode ? 'rgba(18, 18, 18, 0.9)' : 'rgba(255, 255, 255, 0.9)',
//         backdropFilter: 'blur(10px)',
//       }}
//       role="presentation"
//       onClick={handleDrawerToggle}
//       onKeyDown={handleDrawerToggle}
//     >
//       <List>
//         {menuItems.map((item) => (
//           <ListItem button key={item.text} onClick={() => handleMenuClick(item.href)}>
//             <Typography
//               sx={{
//                 fontWeight: 'bold',
//                 color: darkMode ? theme.palette.primary.light : theme.palette.primary.main,
//               }}
//             >
//               {item.text}
//             </Typography>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <AppBar
//       position="sticky"
//       elevation={scrolled ? 4 : 0}
//       sx={{
//         background: scrolled
//           ? darkMode
//             ? 'rgba(18, 18, 18, 0.8)'
//             : 'rgba(255, 255, 255, 0.8)'
//           : 'transparent',
//         backdropFilter: scrolled ? 'blur(10px)' : 'none',
//         transition: 'background 0.3s, box-shadow 0.3s',
//         boxShadow: scrolled ? (darkMode ? '0 4px 30px rgba(0, 0, 0, 0.1)' : '0 4px 30px rgba(0, 0, 0, 0.1)') : 'none',
//       }}
//     >
//       <Toolbar sx={{ justifyContent: 'space-between' }}>
//         <Typography
//           variant="h6"
//           component="div"
//           sx={{
//             fontWeight: 'bold',
//             flexGrow: 1,
//             background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//           }}
//         >
//           Mit Jakasaniya
//         </Typography>

//         {isMobile ? (
//           <>
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               edge="end"
//               onClick={handleDrawerToggle}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Drawer
//               anchor="right"
//               open={mobileOpen}
//               onClose={handleDrawerToggle}
//               ModalProps={{
//                 keepMounted: true, // Better open performance on mobile.
//               }}
//               sx={{
//                 '& .MuiDrawer-paper': {
//                   background: 'transparent',
//                 },
//               }}
//             >
//               {drawer}
//             </Drawer>
//           </>
//         ) : (
//           <Box sx={{ display: 'flex', gap: 2 }}>
//             {menuItems.map((item) => (
//               <Button
//                 key={item.text}
//                 onClick={() => handleMenuClick(item.href)}
//                 sx={{
//                   color: darkMode ? 'white' : 'black',
//                   fontWeight: 'medium',
//                   position: 'relative',
//                   '&::after': {
//                     content: '""',
//                     position: 'absolute',
//                     width: '0',
//                     height: '2px',
//                     bottom: '-2px',
//                     left: '50%',
//                     transform: 'translateX(-50%)',
//                     backgroundColor: darkMode ? theme.palette.primary.light : theme.palette.primary.main,
//                     transition: 'width 0.3s',
//                   },
//                   '&:hover::after': {
//                     width: '100%',
//                   },
//                 }}
//               >
//                 {item.text}
//               </Button>
//             ))}
//           </Box>
//         )}

//         <IconButton onClick={toggleTheme} color="inherit" sx={{ ml: 2 }}>
//           {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
//         </IconButton>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;

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

  // Effect for handling header background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Effect for tracking active section on scroll
  useEffect(() => {
    const handleScrollActiveLink = () => {
      let currentSection = "";
      menuItems.forEach((item) => {
        const section = document.querySelector(item.href);
        if (section) {
          const sectionTop = section.offsetTop;
          // Add an offset (e.g., 150px) so the link becomes active before the section hits the very top
          if (window.scrollY >= sectionTop - 150) {
            currentSection = item.href;
          }
        }
      });
      setActiveLink(currentSection);
    };
    window.addEventListener("scroll", handleScrollActiveLink);
    // Run on mount to set initial active link
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
      // Smooth scroll to the element, accounting for the header height
      const headerOffset = 80; // Adjust this value based on your header's height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Keyframes for logo animation
  const logoGlow = keyframes`
    0% { filter: drop-shadow(0 0 5px rgba(254, 107, 139, 0.3)); }
    50% { filter: drop-shadow(0 0 20px rgba(254, 107, 139, 0.6)); }
    100% { filter: drop-shadow(0 0 5px rgba(254, 107, 139, 0.3)); }
  `;

  const Logo = () => (
    <Box
      onClick={() => handleMenuClick("#home")}
      sx={{
        cursor: "pointer",
        position: "relative",
        "&:hover": {
          transform: "scale(1.05)",
        },
        transition: "all 0.3s ease",
      }}
    >
      <Typography
        variant="h5"
        component="div"
        sx={{
          fontWeight: 800,
          fontSize: { xs: "1.2rem", md: "1.5rem" },
          background:
            "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          position: "relative",
          "&:hover": {
            animation: `${logoGlow} 2s ease-in-out infinite`,
          },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -2,
            left: 0,
            width: "100%",
            height: "2px",
            background:
              "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
            transform: "scaleX(0)",
            transformOrigin: "center",
            transition: "transform 0.3s ease",
          },
          "&:hover::after": {
            transform: "scaleX(1)",
          },
        }}
      >
        Mit Jakasaniya
      </Typography>
    </Box>
  );

  const drawer = (
    <Box
      sx={{
        width: 280,
        height: "100%",
        background: darkMode
          ? "linear-gradient(135deg, rgba(18, 18, 18, 0.95) 0%, rgba(30, 30, 30, 0.95) 100%)"
          : "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)",
        backdropFilter: "blur(20px)",
        borderLeft: `1px solid ${darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
      }}
      role="presentation"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 3,
          borderBottom: `1px solid ${darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Navigation
        </Typography>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            backgroundColor: darkMode
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.05)",
            "&:hover": {
              backgroundColor: darkMode
                ? "rgba(255, 255, 255, 0.2)"
                : "rgba(0, 0, 0, 0.1)",
              transform: "rotate(90deg)",
            },
            transition: "all 0.3s ease",
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <List sx={{ p: 2 }}>
        {menuItems.map((item, index) => (
          <Slide
            key={item.text}
            direction="left"
            in={mobileOpen}
            timeout={300 + index * 100}
          >
            <ListItemButton
              onClick={() => handleMenuClick(item.href)}
              selected={activeLink === item.href}
              sx={{
                mb: 1,
                borderRadius: 2,
                py: 1.5,
                px: 2,
                background:
                  activeLink === item.href
                    ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    : "transparent",
                color:
                  activeLink === item.href
                    ? "white"
                    : theme.palette.text.primary,
                "&:hover": {
                  background:
                    activeLink === item.href
                      ? "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)"
                      : darkMode
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0.05)",
                  transform: "translateX(8px)",
                },
                transition: "all 0.3s ease",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "3px",
                  height: activeLink === item.href ? "60%" : "0%",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "0 2px 2px 0",
                  transition: "height 0.3s ease",
                },
              }}
            >
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: activeLink === item.href ? 600 : 500,
                  fontSize: "1rem",
                }}
              />
            </ListItemButton>
          </Slide>
        ))}
      </List>

      {/* Download Resume Button for Mobile */}
      <Box sx={{ p: 2 }}>
        <Button
          component="a"
          href="/Mit_Jakasaniya_Resume.pdf"
          download="Mit_Jakasaniya_Resume.pdf"
          startIcon={<DownloadIcon />}
          fullWidth
          sx={{
            py: 1.5,
            borderRadius: 2,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": {
              background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
              transform: "translateY(-2px)",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
            },
            transition: "all 0.3s ease",
          }}
        >
          Download Resume
        </Button>
      </Box>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: scrolled
          ? darkMode
            ? "linear-gradient(135deg, rgba(18, 18, 18, 0.9) 0%, rgba(30, 30, 30, 0.85) 100%)"
            : "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.85) 100%)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        boxShadow: scrolled
          ? darkMode
            ? "0 8px 32px rgba(0, 0, 0, 0.3)"
            : "0 8px 32px rgba(0, 0, 0, 0.1)"
          : "none",
        borderBottom: scrolled
          ? `1px solid ${darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`
          : "none",
        transition: theme.transitions.create(
          ["background", "box-shadow", "backdrop-filter", "border-bottom"],
          {
            duration: theme.transitions.duration.standard,
            easing: theme.transitions.easing.easeInOut,
          },
        ),
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{ justifyContent: "space-between", height: "72px", py: 1 }}
        >
          <Logo />

          {isMobile ? (
            // Mobile View: Hamburger Menu and Theme Toggle
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton
                onClick={toggleTheme}
                sx={{
                  background: darkMode
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.05)",
                  "&:hover": {
                    background: darkMode
                      ? "rgba(255, 255, 255, 0.2)"
                      : "rgba(0, 0, 0, 0.1)",
                    transform: "rotate(180deg)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              <IconButton
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{
                  background: darkMode
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.05)",
                  "&:hover": {
                    background: darkMode
                      ? "rgba(255, 255, 255, 0.2)"
                      : "rgba(0, 0, 0, 0.1)",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <MenuIcon />
              </IconButton>
            </Stack>
          ) : (
            // Desktop View: Modern Pill Navigation and Theme Toggle
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box
                sx={{
                  display: "flex",
                  gap: 0.5,
                  background: darkMode
                    ? "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)"
                    : "linear-gradient(135deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.02) 100%)",
                  p: "8px",
                  borderRadius: "50px",
                  border: `1px solid ${darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
                  backdropFilter: "blur(10px)",
                }}
              >
                {menuItems.map((item) => (
                  <Button
                    key={item.text}
                    onClick={() => handleMenuClick(item.href)}
                    disableElevation
                    sx={{
                      background:
                        activeLink === item.href
                          ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                          : "transparent",
                      color:
                        activeLink === item.href
                          ? "white"
                          : theme.palette.text.primary,
                      borderRadius: "50px",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      textTransform: "none",
                      px: 3,
                      py: 1,
                      minWidth: "auto",
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        background:
                          activeLink === item.href
                            ? "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)"
                            : darkMode
                              ? "rgba(255, 255, 255, 0.1)"
                              : "rgba(0, 0, 0, 0.05)",
                        transform: "translateY(-1px)",
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "-100%",
                        width: "100%",
                        height: "100%",
                        background:
                          "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                        transition: "left 0.5s ease",
                      },
                      "&:hover::before": {
                        left: "100%",
                      },
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>

              {/* Download Resume Button for Desktop */}
              <Button
                component="a"
                href="/Mit_Jakasaniya_Resume.pdf"
                download="Mit_Jakasaniya_Resume.pdf"
                startIcon={<DownloadIcon />}
                sx={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  borderRadius: "50px",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  textTransform: "none",
                  px: 3,
                  py: 1,
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                Resume
              </Button>

              <IconButton
                onClick={toggleTheme}
                sx={{
                  background: darkMode
                    ? "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)"
                    : "linear-gradient(135deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.02) 100%)",
                  border: `1px solid ${darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
                  backdropFilter: "blur(10px)",
                  "&:hover": {
                    background: darkMode
                      ? "rgba(255, 255, 255, 0.15)"
                      : "rgba(0, 0, 0, 0.08)",
                    transform: "rotate(180deg) scale(1.1)",
                  },
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Stack>
          )}
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            border: "none",
            // Applying the glassmorphism effect to the drawer itself
            backgroundColor: darkMode
              ? "rgba(18, 18, 18, 0.9)"
              : "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header;
