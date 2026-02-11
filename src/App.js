import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState, useEffect } from "react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Contact from "./components/Contact";

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
        default: darkMode ? "#0f0f23" : "#fafbfc",
        paper: darkMode ? "#1a1a2e" : "#ffffff",
      },
      text: {
        primary: darkMode ? "#e2e8f0" : "#1e293b",
        secondary: darkMode ? "#94a3b8" : "#64748b",
      },
    },
    typography: {
      fontFamily:
        '"Inter", "Poppins", -apple-system, BlinkMacSystemFont, sans-serif',
      h1: {
        fontWeight: 800,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      button: {
        fontWeight: 500,
        textTransform: "none",
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 50,
            textTransform: "none",
            fontWeight: 500,
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
      <Router>
        <div
          className={`min-h-screen ${darkMode ? "dark" : "light"}`}
          style={{
            background: darkMode
              ? "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)"
              : "linear-gradient(135deg, #fafbfc 0%, #f1f5f9 100%)",
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
