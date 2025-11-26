import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box, useTheme, Chip, Stack } from '@mui/material';
import { keyframes } from '@mui/system';

const Hero = () => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animation keyframes
  const fadeInUp = keyframes`
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  const typewriter = keyframes`
    from { width: 0 }
    to { width: 100% }
  `;

  const blink = keyframes`
    from, to { border-color: transparent }
    50% { border-color: ${theme.palette.primary.main} }
  `;

  const float = keyframes`
    0%, 100% { transform: translateY(0px) }
    50% { transform: translateY(-10px) }
  `;

  const skills = ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express', 'Git'];

  return (
    <Box
      component="section"
      id="hero"
      sx={{
        py: { xs: 8, md: 12 },
        display: 'flex',
        alignItems: 'center',
        minHeight: 'calc(100vh - 72px)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: theme.palette.mode === 'dark' 
            ? 'radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.1) 0%, transparent 50%)'
            : 'radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.05) 0%, transparent 50%)',
          zIndex: -1,
        },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 4,
          }}
        >
          <Box
            sx={{
              width: { xs: '100%', md: '50%' },
              mb: { xs: 4, md: 0 },
            }}
            className="animate-on-scroll"
          >
            <Box
              sx={{
                animation: isVisible ? `${fadeInUp} 0.8s ease-out` : 'none',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 1,
                  fontWeight: 400,
                  color: 'text.secondary',
                  fontSize: { xs: '1.1rem', md: '1.2rem' },
                }}
              >
                Hello, I'm
              </Typography>
            </Box>

            <Box
              sx={{
                animation: isVisible ? `${fadeInUp} 0.8s ease-out 0.2s both` : 'none',
              }}
            >
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  mb: 1,
                  color: 'text.primary',
                  lineHeight: 1.2,
                }}
              >
                Mit Jakasaniya
              </Typography>
            </Box>

            <Box
              sx={{
                animation: isVisible ? `${fadeInUp} 0.8s ease-out 0.4s both` : 'none',
                mb: 3,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  fontWeight: 500,
                  color: theme.palette.primary.main,
                  mb: 3,
                }}
              >
                Fullstack Developer
              </Typography>
            </Box>

            <Box
              sx={{
                animation: isVisible ? `${fadeInUp} 0.8s ease-out 0.6s both` : 'none',
                mb: 4,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1.1rem', md: '1.2rem' },
                  lineHeight: 1.6,
                  color: 'text.secondary',
                  maxWidth: '500px',
                  mb: 3,
                }}
              >
                Full-stack developer with 2+ years building web apps. I work with React for frontends, Node.js for backends, and love solving complex problems. Always learning new tech and open to interesting projects.
              </Typography>
              
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {skills.map((skill, index) => (
                  <Chip
                    key={skill}
                    label={skill}
                    size="small"
                    sx={{
                      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                      color: 'text.primary',
                      fontWeight: 500,
                      '&:hover': {
                        backgroundColor: theme.palette.primary.main,
                        color: 'white',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  />
                ))}
              </Stack>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <Button
                variant="contained"
                size="large"
                href="#contact"
                sx={{
                  px: 3,
                  py: 1.2,
                  fontSize: '1rem',
                  fontWeight: 500,
                  textTransform: 'none',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                  },
                  transition: 'transform 0.2s ease',
                }}
              >
                Get In Touch
              </Button>
              <Button
                variant="outlined"
                size="large"
                href="#projects"
                sx={{
                  px: 3,
                  py: 1.2,
                  fontSize: '1rem',
                  fontWeight: 500,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                View Projects
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              width: { xs: '100%', md: '45%' },
              display: 'flex',
              justifyContent: 'center',
              animation: isVisible ? `${fadeInUp} 1s ease-out 0.4s both` : 'none',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                animation: `${float} 3s ease-in-out infinite`,
              }}
            >
              <Box
                component="img"
                src="https://i.postimg.cc/PJgvgJsk/meet.jpg"
                alt="Mit Jakasaniya"
                sx={{
                  width: { xs: 280, md: 350, lg: 400 },
                  height: { xs: 280, md: 350, lg: 400 },
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '6px solid transparent',
                  background: `linear-gradient(${theme.palette.mode === 'dark' ? '#1a1a2e' : 'white'}, ${theme.palette.mode === 'dark' ? '#1a1a2e' : 'white'}), linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)`,
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'content-box, border-box',
                  boxShadow: '0 20px 60px rgba(102, 126, 234, 0.3)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'scale(1.05) rotate(2deg)',
                    boxShadow: '0 25px 80px rgba(102, 126, 234, 0.4)',
                  },
                }}
              />
              
              {/* Decorative elements */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -20,
                  right: -20,
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  opacity: 0.8,
                  animation: `${float} 2s ease-in-out infinite reverse`,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -10,
                  left: -30,
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  opacity: 0.7,
                  animation: `${float} 2.5s ease-in-out infinite`,
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero; 