import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Code2, ChevronUp, MapPin, Phone, GraduationCap, Briefcase, Award, Mail, Github, Linkedin } from 'lucide-react';
import FloatingDockNav from './components/FloatingDockNav';

/* ─────────────────────────────────────
   YOUR DATA
   ───────────────────────────────────── */
const PERSONAL = {
  name: 'Mit Jakasaniya',
  title: 'Full Stack Developer',
  photo: 'https://i.postimg.cc/PJgvgJsk/meet.jpg',
  email: 'meetjaka46@gmail.com',
  phone: '+91 7990343887',
  location: 'Morbi, Gujarat, India',
  github: 'https://github.com/meetjakasaniya',
  linkedin: 'https://www.linkedin.com/in/jakasaniya-mit',
  bio: "Full-stack web developer with 2+ years building web apps. I work with React.js and Next.js for frontends, Node.js for backends, and love solving complex problems. Always learning new tech and open to interesting projects.",
  aboutPara1: "Hello! I'm Mit Jakasaniya, a passionate and dedicated MERN Stack Developer from Morbi, Gujarat. I specialize in building responsive and dynamic web applications using technologies like HTML5, CSS3, JavaScript, React.js, Node.js, MongoDB, and MySQL.",
  aboutPara2: "Currently pursuing my B.Tech in Information Technology at CHARUSAT, I have maintained a strong academic record (CGPA: 8.20) and continually expand my technical knowledge through NPTEL certifications in Data Structures, DBMS, and Algorithm Design.",
};

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

const SKILLS_DATA = [
  {
    title: 'Technical Skills',
    skills: [
      { name: 'HTML', color: '#e34f26' },
      { name: 'CSS', color: '#1572b6' },
      { name: 'JavaScript', color: '#f7df1e' },
      { name: 'React JS', color: '#61dafb' },
      { name: 'Node JS', color: '#68a063' },
      { name: 'Express JS', color: '#888888' },
      { name: 'MongoDB', color: '#47a248' },
      { name: 'GitHub', color: '#ffffff' },
      { name: 'VS Code', color: '#007acc' },
      { name: 'RESTful APIs', color: '#ff6c37' },
    ],
  },
  {
    title: 'Soft Skills',
    skills: [
      { name: 'Teamwork', color: '#a78bfa' },
      { name: 'Leadership', color: '#f472b6' },
      { name: 'Problem Solving', color: '#34d399' },
      { name: 'Presentation', color: '#fbbf24' },
      { name: 'Creativity', color: '#f87171' },
      { name: 'Time Management', color: '#38bdf8' },
      { name: 'Planning', color: '#22d3ee' },
    ],
  },
  {
    title: 'Languages',
    skills: [
      { name: 'English', color: '#94a3b8' },
      { name: 'Gujarati', color: '#94a3b8' },
      { name: 'Hindi', color: '#94a3b8' },
    ],
  },
];

const PROJECTS = [
  {
    title: 'Smart Classroom Management System',
    period: 'Feb 2025 - Apr 2025',
    desc: 'A user-friendly interface for Students and Faculties to efficiently manage their data and other classroom operations.',
    tags: ['MERN Stack', 'React', 'Node.js', 'MongoDB'],
    tools: ['VS Code', 'GitHub', 'MongoDB Atlas'],
  },
  {
    title: 'Event Management System',
    period: 'Apr 2025 - May 2025',
    desc: 'A platform for event organizers to create, manage, and promote events, while providing attendees with a seamless registration experience.',
    tags: ['MERN Stack', 'React', 'Node.js', 'MongoDB'],
    tools: ['VS Code', 'GitHub', 'MongoDB Atlas'],
  },
  {
    title: 'Weather App',
    period: 'May 2025 - June 2025',
    desc: 'Provides real-time weather updates and forecasts for any location worldwide, allowing users to plan their activities accordingly.',
    tags: ['MERN Stack', 'React', 'Node.js', 'Weather API'],
    tools: ['VS Code', 'GitHub', 'MongoDB Atlas'],
  },
  {
    title: 'Netflix Clone',
    period: 'Oct 2024 - Nov 2024',
    desc: 'A Netflix UI clone built from scratch for practicing frontend fundamentals — pixel-perfect HTML & CSS implementation.',
    tags: ['HTML', 'CSS'],
    tools: ['VS Code', 'GitHub'],
  },
];

const EDUCATION = [
  {
    degree: 'B.Tech Information Technology',
    institution: 'CHARUSAT',
    location: 'Anand, Gujarat',
    period: '2023 - Present',
    details: 'CGPA: 8.20',
  },
  {
    degree: 'Higher Secondary Education (Science)',
    institution: 'GSHSEB',
    location: 'Morbi, Gujarat',
    period: '2023',
    details: 'Percentile: 80.33',
  },
  {
    degree: 'Secondary Education',
    institution: 'GSEB',
    location: 'Morbi, Gujarat',
    period: '2021',
    details: 'Percentage: 71%',
  },
];

const CERTIFICATIONS = [
  { title: 'Problem Solving through Programming In C', issuer: 'NPTEL', date: 'April 2024', score: 'Score: 56' },
  { title: 'Database Management System', issuer: 'NPTEL', date: 'Sep 2024', score: 'Score: 56' },
  { title: 'Data Structure and Algorithms using Java', issuer: 'NPTEL', date: 'Oct 2024', score: 'Score: 60' },
];

const EXPERIENCE = [
  {
    title: 'Web Development Team Lead',
    company: 'Agevole Innovation Pvt. Ltd.',
    location: 'Surat, Gujarat',
    period: 'May 2024 - June 2024',
    responsibilities: [
      'Led the web development team on multiple projects',
      'Worked on Blog Website and BookStore Website projects',
      'Technologies used: HTML, CSS, Javascript, PHP',
      'Tools used: Visual Studio Code, Github',
    ],
  },
];

/* ─────────────────────────────────────
   ANIMATION VARIANTS
   ───────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

/* ─────────────────────────────────────
   ANIMATED SECTION WRAPPER
   ───────────────────────────────────── */
function AnimatedSection({ children, style, id }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section
      id={id}
      ref={ref}
      style={{
        ...style,
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      {children}
    </section>
  );
}

/* ─────────────────────────────────────
   SECTION HEADING COMPONENT
   ───────────────────────────────────── */
function SectionHeading({ children, accent }) {
  return (
    <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: '12px', letterSpacing: '-1px', textAlign: 'center' }}>
      {children} <span style={{ color: accent || '#22d3ee' }}>{accent ? '' : ''}</span>
    </h2>
  );
}

/* ─────────────────────────────────────
   MAIN APP
   ───────────────────────────────────── */
function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const containerStyle = { maxWidth: '1200px', margin: '0 auto', padding: '0 24px' };

  const glassCard = {
    background: 'rgba(15, 23, 42, 0.5)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '20px',
    transition: 'border-color 0.4s, box-shadow 0.4s, transform 0.4s',
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#020617', color: '#f1f5f9', fontFamily: "'Inter', sans-serif" }}>

      {/* ── BG EFFECTS ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} className="bg-grid" />
      <div style={{ position: 'fixed', top: '-30%', left: '-15%', width: '55%', height: '55%', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0, animation: 'float 8s ease-in-out infinite' }} />
      <div style={{ position: 'fixed', bottom: '-25%', right: '-15%', width: '55%', height: '55%', background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0, animation: 'float 10s ease-in-out infinite reverse' }} />

      {/* ════════════════════════════════════
          FLOATING DOCK NAVIGATION
          ════════════════════════════════════ */}
      <FloatingDockNav />

      <main style={{ position: 'relative', zIndex: 1 }}>

        {/* ════════════════════════════════════
            HERO SECTION
            ════════════════════════════════════ */}
        <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap', justifyContent: 'center' }}>

            {/* Text side */}
            <div style={{ flex: '1 1 500px', minWidth: '300px' }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', borderRadius: '999px', background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.25)', color: '#67e8f9', fontSize: '13px', fontWeight: 600, marginBottom: '24px', letterSpacing: '0.5px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22d3ee', boxShadow: '0 0 10px #22d3ee', animation: 'pulse-glow 2s infinite' }} />
                Available for Opportunities
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                style={{ fontSize: '17px', color: '#94a3b8', marginBottom: '8px' }}>Hello, I'm</motion.p>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}
                style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-2px', marginBottom: '12px', color: '#f1f5f9' }}>
                {PERSONAL.name.split(' ')[0]}{' '}
                <span className="gradient-text-cyan glow-cyan">{PERSONAL.name.split(' ')[1]}</span>
              </motion.h1>

              <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 600, color: '#22d3ee', marginBottom: '20px' }}>
                {PERSONAL.title}
              </motion.h2>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                style={{ fontSize: '16px', color: '#94a3b8', lineHeight: 1.7, maxWidth: '520px', marginBottom: '32px' }}>
                {PERSONAL.bio}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <motion.a href="#projects" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  style={{ padding: '14px 32px', borderRadius: '999px', background: 'linear-gradient(135deg, #06b6d4, #10b981)', color: '#020617', fontWeight: 700, fontSize: '14px', textDecoration: 'none', boxShadow: '0 0 30px rgba(6,182,212,0.3)', transition: 'box-shadow 0.3s' }}>
                  View My Work
                </motion.a>
                <motion.a href="#contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  style={{ padding: '14px 32px', borderRadius: '999px', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', color: '#e2e8f0', fontWeight: 600, fontSize: '14px', textDecoration: 'none', transition: 'border-color 0.3s' }}>
                  Get In Touch
                </motion.a>
              </motion.div>
            </div>

            {/* Photo side */}
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.8 }}
              style={{ flex: '0 0 auto', position: 'relative' }}>
              <div style={{ animation: 'float 4s ease-in-out infinite' }}>
                <img src={PERSONAL.photo} alt={PERSONAL.name}
                  style={{
                    width: 'clamp(240px, 30vw, 360px)', height: 'clamp(240px, 30vw, 360px)',
                    borderRadius: '50%', objectFit: 'cover',
                    border: '4px solid transparent',
                    background: 'linear-gradient(#020617, #020617) padding-box, linear-gradient(135deg, #22d3ee, #8b5cf6, #10b981) border-box',
                    boxShadow: '0 20px 60px rgba(6, 182, 212, 0.25)',
                  }}
                />
                {/* Decorative orbs */}
                <div style={{ position: 'absolute', top: '-15px', right: '-15px', width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(135deg, #22d3ee, #06b6d4)', opacity: 0.7, animation: 'float 2s ease-in-out infinite reverse' }} />
                <div style={{ position: 'absolute', bottom: '-10px', left: '-20px', width: '35px', height: '35px', borderRadius: '50%', background: 'linear-gradient(135deg, #a78bfa, #8b5cf6)', opacity: 0.6, animation: 'float 2.5s ease-in-out infinite' }} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════
            ABOUT SECTION
            ════════════════════════════════════ */}
        <AnimatedSection id="about" style={{ padding: '100px 24px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(6,182,212,0.2), transparent)' }} />
          <div style={containerStyle}>
            <SectionHeading>About <span style={{ color: '#22d3ee' }}>Me</span></SectionHeading>
            <p style={{ color: '#64748b', fontSize: '15px', textAlign: 'center', maxWidth: '560px', margin: '0 auto 48px' }}>Get to know the person behind the code</p>

            <div style={{ maxWidth: '800px', margin: '0 auto', ...glassCard, padding: '40px' }}>
              <p style={{ fontSize: '16px', color: '#cbd5e1', lineHeight: 1.8, marginBottom: '20px' }}>{PERSONAL.aboutPara1}</p>
              <p style={{ fontSize: '16px', color: '#cbd5e1', lineHeight: 1.8, marginBottom: '20px' }}>{PERSONAL.aboutPara2}</p>
              <p style={{ fontSize: '16px', color: '#cbd5e1', lineHeight: 1.8 }}>
                I love collaborating on innovative projects and have developed several applications including a Smart Classroom Management System, an Event Management System, and a Weather App. Apart from coding, I value teamwork, effective communication, and lifelong learning.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* ════════════════════════════════════
            SKILLS SECTION
            ════════════════════════════════════ */}
        <AnimatedSection id="skills" style={{ padding: '100px 24px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(139,92,246,0.2), transparent)' }} />
          <div style={containerStyle}>
            <SectionHeading>Core <span style={{ color: '#22d3ee' }}>Skills</span></SectionHeading>
            <p style={{ color: '#64748b', fontSize: '15px', textAlign: 'center', maxWidth: '560px', margin: '0 auto 56px' }}>Technologies & frameworks I leverage to build performant applications</p>

            {SKILLS_DATA.map((cat, ci) => (
              <div key={ci} style={{ marginBottom: '48px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#e2e8f0', marginBottom: '20px', textAlign: 'center' }}>{cat.title}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', maxWidth: '800px', margin: '0 auto' }}>
                  {cat.skills.map((skill, i) => (
                    <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
                      whileHover={{ scale: 1.12, y: -6 }}
                      style={{ padding: '10px 24px', borderRadius: '999px', background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.06)', color: '#cbd5e1', fontWeight: 500, fontSize: '14px', cursor: 'default', transition: 'border-color 0.3s, color 0.3s, box-shadow 0.3s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = skill.color + '55'; e.currentTarget.style.color = skill.color; e.currentTarget.style.boxShadow = `0 0 20px ${skill.color}22`; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#cbd5e1'; e.currentTarget.style.boxShadow = 'none'; }}
                    >{skill.name}</motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* ════════════════════════════════════
            EXPERIENCE SECTION
            ════════════════════════════════════ */}
        <AnimatedSection id="experience" style={{ padding: '100px 24px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(6,182,212,0.2), transparent)' }} />
          <div style={containerStyle}>
            <SectionHeading>Professional <span style={{ color: '#22d3ee' }}>Experience</span></SectionHeading>
            <p style={{ color: '#64748b', fontSize: '15px', textAlign: 'center', maxWidth: '560px', margin: '0 auto 56px' }}>Where I've contributed and grown as a developer</p>

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              {EXPERIENCE.map((exp, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
                  style={{ ...glassCard, padding: '32px', marginBottom: '24px' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(6,182,212,0.35)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(6,182,212,0.1)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <Briefcase size={20} color="#22d3ee" />
                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#f1f5f9' }}>{exp.title}</h3>
                  </div>
                  <p style={{ fontSize: '16px', color: '#22d3ee', fontWeight: 600, marginBottom: '4px' }}>{exp.company}</p>
                  <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>{exp.location} • {exp.period}</p>
                  <ul style={{ paddingLeft: '20px', margin: 0 }}>
                    {exp.responsibilities.map((r, j) => (
                      <li key={j} style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.8, marginBottom: '4px' }}>{r}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ════════════════════════════════════
            PROJECTS SECTION
            ════════════════════════════════════ */}
        <AnimatedSection id="projects" style={{ padding: '100px 24px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(52,211,153,0.2), transparent)' }} />
          <div style={containerStyle}>
            <SectionHeading>My <span style={{ color: '#34d399' }}>Projects</span></SectionHeading>
            <p style={{ color: '#64748b', fontSize: '15px', textAlign: 'center', maxWidth: '560px', margin: '0 auto 56px' }}>A curated selection of projects I've built end-to-end</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: '28px' }}>
              {PROJECTS.map((project, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
                  style={{ ...glassCard, padding: '32px', display: 'flex', flexDirection: 'column' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(6,182,212,0.35)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(6,182,212,0.12), 0 20px 60px rgba(0,0,0,0.3)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '6px', color: '#f1f5f9' }}>{project.title}</h3>
                  <p style={{ fontSize: '13px', color: '#22d3ee', fontWeight: 500, marginBottom: '14px' }}>{project.period}</p>
                  <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.7, marginBottom: '20px', flex: 1 }}>{project.desc}</p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                    {project.tags.map((tag, j) => (
                      <span key={j} style={{ padding: '5px 14px', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(255,255,255,0.06)', fontSize: '12px', fontWeight: 500, color: '#94a3b8' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p style={{ fontSize: '12px', color: '#475569' }}>
                    <span style={{ fontWeight: 600, color: '#64748b' }}>Tools:</span> {project.tools.join(', ')}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ════════════════════════════════════
            EDUCATION SECTION
            ════════════════════════════════════ */}
        <AnimatedSection id="education" style={{ padding: '100px 24px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(139,92,246,0.2), transparent)' }} />
          <div style={containerStyle}>
            <SectionHeading>Education & <span style={{ color: '#a78bfa' }}>Certifications</span></SectionHeading>
            <p style={{ color: '#64748b', fontSize: '15px', textAlign: 'center', maxWidth: '560px', margin: '0 auto 56px' }}>My academic journey and credentials</p>

            {/* Education Timeline */}
            <div style={{ maxWidth: '700px', margin: '0 auto 64px', position: 'relative', paddingLeft: '40px' }}>
              <div style={{ position: 'absolute', left: '14px', top: '8px', bottom: '8px', width: '2px', background: 'linear-gradient(to bottom, #22d3ee, #8b5cf6)' }} />
              {EDUCATION.map((edu, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
                  style={{ marginBottom: '32px', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-33px', top: '4px', width: '14px', height: '14px', borderRadius: '50%', background: 'linear-gradient(135deg, #22d3ee, #8b5cf6)', boxShadow: '0 0 12px rgba(34,211,238,0.4)' }} />
                  <div style={{ ...glassCard, padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <GraduationCap size={18} color="#22d3ee" />
                      <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#f1f5f9' }}>{edu.degree}</h3>
                    </div>
                    <p style={{ fontSize: '15px', color: '#22d3ee', fontWeight: 600, marginBottom: '4px' }}>{edu.institution}</p>
                    <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '6px' }}>{edu.location} • {edu.period}</p>
                    <p style={{ fontSize: '14px', color: '#34d399', fontWeight: 600 }}>{edu.details}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Certifications */}
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#e2e8f0', textAlign: 'center', marginBottom: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <Award size={22} color="#fbbf24" /> Certifications
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '20px', maxWidth: '900px', margin: '0 auto' }}>
              {CERTIFICATIONS.map((cert, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
                  style={{ ...glassCard, padding: '24px' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(251,191,36,0.3)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
                >
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#f1f5f9', marginBottom: '8px' }}>{cert.title}</h4>
                  <p style={{ fontSize: '14px', color: '#fbbf24', fontWeight: 600, marginBottom: '4px' }}>{cert.issuer}</p>
                  <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>{cert.date}</p>
                  <p style={{ fontSize: '13px', color: '#34d399', fontWeight: 600 }}>{cert.score}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ════════════════════════════════════
            CONTACT / FOOTER
            ════════════════════════════════════ */}
        <AnimatedSection id="contact" style={{ padding: '120px 24px 80px', textAlign: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(139,92,246,0.2), transparent)' }} />

          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, letterSpacing: '-1.5px', marginBottom: '20px', lineHeight: 1.15 }}>
              Let's Build Something{' '}
              <span className="gradient-text-purple">Together.</span>
            </h2>
            <p style={{ color: '#64748b', fontSize: '16px', lineHeight: 1.7, marginBottom: '36px' }}>
              Currently open for new opportunities. Whether you have a question or just want to say hi — I'll try my best to get back to you!
            </p>

            {/* Contact info pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginBottom: '40px' }}>
              <a href={`mailto:${PERSONAL.email}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 22px', borderRadius: '999px', background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.06)', color: '#cbd5e1', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'all 0.3s' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(6,182,212,0.4)'; e.currentTarget.style.color = '#22d3ee'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#cbd5e1'; }}
              ><Mail size={16} /> {PERSONAL.email}</a>
              <a href={`tel:${PERSONAL.phone}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 22px', borderRadius: '999px', background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.06)', color: '#cbd5e1', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'all 0.3s' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(6,182,212,0.4)'; e.currentTarget.style.color = '#22d3ee'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#cbd5e1'; }}
              ><Phone size={16} /> {PERSONAL.phone}</a>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 22px', borderRadius: '999px', background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.06)', color: '#cbd5e1', fontSize: '14px', fontWeight: 500 }}>
                <MapPin size={16} /> {PERSONAL.location}
              </span>
            </div>

            <motion.a href={`mailto:${PERSONAL.email}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '18px 44px', borderRadius: '999px', background: '#f1f5f9', color: '#020617', fontWeight: 700, fontSize: '16px', textDecoration: 'none', boxShadow: '0 0 50px rgba(255,255,255,0.12)', marginBottom: '48px', transition: 'all 0.3s' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.boxShadow = '0 0 70px rgba(255,255,255,0.2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.boxShadow = '0 0 50px rgba(255,255,255,0.12)'; }}
            >Say Hello <Mail size={18} /></motion.a>

            {/* Social icons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px' }}>
              {[
                { icon: <Github size={22} />, href: PERSONAL.github },
                { icon: <Linkedin size={22} />, href: PERSONAL.linkedin },
                { icon: <Mail size={22} />, href: `mailto:${PERSONAL.email}` },
              ].map((s, i) => (
                <a key={i} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '52px', height: '52px', borderRadius: '999px', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.06)', color: '#94a3b8', textDecoration: 'none', transition: 'all 0.3s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#22d3ee'; e.currentTarget.style.borderColor = 'rgba(6,182,212,0.4)'; e.currentTarget.style.background = 'rgba(6,182,212,0.08)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(15,23,42,0.6)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >{s.icon}</a>
              ))}
            </div>

            <p style={{ fontSize: '13px', color: '#475569' }}>
              © {new Date().getFullYear()} Mit Jakasaniya. Built with{' '}
              <span style={{ color: '#22d3ee' }}>React</span> &{' '}
              <span style={{ color: '#34d399' }}>❤️</span>
            </p>
          </div>
        </AnimatedSection>
      </main>

      {/* ── BACK TO TOP ── */}
      <AnimatePresence>
        {scrolled && (
          <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ position: 'fixed', bottom: '32px', right: '32px', width: '48px', height: '48px', borderRadius: '999px', background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99, transition: 'color 0.2s, border-color 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#22d3ee'; e.currentTarget.style.borderColor = 'rgba(6,182,212,0.4)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
          ><ChevronUp size={20} /></motion.button>
        )}
      </AnimatePresence>

      {/* ── RESPONSIVE STYLES ── */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-nav { display: none !important; }
        }
      `}</style>
    </div>
  );
}

export default App;
