import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#667eea",
        light: "#8b9aff",
        dark: "#4c63d2",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#764ba2",
        light: "#a478d4",
        dark: "#5a3a7a",
        contrastText: "#ffffff",
      },
      background: {
        default: darkMode ? "#0f172a" : "#f8fafc", // Deeper slate for dark mode, cleaner slate for light
        paper: darkMode ? "#1e293b" : "#ffffff",
      },
      text: {
        primary: darkMode ? "#f1f5f9" : "#0f172a",
        secondary: darkMode ? "#94a3b8" : "#64748b",
      },
    },
    typography: {
      fontFamily:
        '"Inter", "Poppins", -apple-system, BlinkMacSystemFont, sans-serif',
      h1: { fontWeight: 800, letterSpacing: "-0.025em" },
      h2: { fontWeight: 700, letterSpacing: "-0.025em" },
      h3: { fontWeight: 600, letterSpacing: "-0.025em" },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      button: {
        fontWeight: 600,
        textTransform: "none",
        letterSpacing: "0.01em"
      },
    },
    shape: {
      borderRadius: 16,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 50,
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
    },
  });

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CustomCursor />
      <Router>
        <div
          className={`min-h-screen ${darkMode ? "dark" : "light"}`}
          style={{
            background: darkMode
              ? "radial-gradient(circle at 50% 0%, #1e293b 0%, #0f172a 100%)"
              : "radial-gradient(circle at 50% 0%, #f1f5f9 0%, #e2e8f0 100%)",
            transition: "background 0.5s ease"
          }}
        >
          <Header darkMode={darkMode} toggleTheme={toggleTheme} />
          <main>
            <Hero />
            <About />
            <Projects />
            <Education />
            <Skills />
            <Contact />
          </main>
          {/* <Footer /> */}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
