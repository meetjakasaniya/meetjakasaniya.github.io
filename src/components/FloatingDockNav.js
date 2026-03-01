import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Github, Linkedin, FileText, Menu, X } from 'lucide-react';

/* ─────────────────────────────────────
   CONFIGURATION
   ───────────────────────────────────── */
const NAV_ITEMS = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
];

const SOCIAL_LINKS = [
    { icon: Github, href: 'https://github.com/meetjakasaniya', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/jakasaniya-mit', label: 'LinkedIn' },
];

/* ─────────────────────────────────────
   MAGNETIC ICON COMPONENT
   Subtle magnetic pull effect on hover
   ───────────────────────────────────── */
function MagneticIcon({ children, href, label }) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 300, damping: 20 });
    const springY = useSpring(y, { stiffness: 300, damping: 20 });

    const handleMouseMove = (e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) * 0.25);
        y.set((e.clientY - centerY) * 0.25);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.a
            ref={ref}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.92 }}
            className="
        relative flex items-center justify-center w-9 h-9 rounded-full
        bg-white/[0.04] border border-white/[0.06]
        text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30
        hover:bg-cyan-500/[0.08] hover:shadow-[0_0_16px_rgba(34,211,238,0.15)]
        transition-colors duration-300 cursor-pointer
      "
        >
            {children}
        </motion.a>
    );
}

/* ─────────────────────────────────────
   GLOWING ACTIVE INDICATOR
   Animated pill that slides behind active link
   ───────────────────────────────────── */
function ActiveIndicator({ activeRect, containerRect }) {
    if (!activeRect || !containerRect) return null;

    return (
        <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
                background: 'linear-gradient(135deg, rgba(34,211,238,0.12), rgba(139,92,246,0.08))',
                border: '1px solid rgba(34,211,238,0.2)',
                boxShadow: '0 0 20px rgba(34,211,238,0.1), inset 0 0 12px rgba(34,211,238,0.05)',
            }}
            initial={false}
            animate={{
                left: activeRect.left - containerRect.left - 12,
                width: activeRect.width + 24,
                top: activeRect.top - containerRect.top - 6,
                height: activeRect.height + 12,
            }}
            transition={{
                type: 'spring',
                stiffness: 400,
                damping: 32,
            }}
        />
    );
}

/* ─────────────────────────────────────
   NAV LINK (desktop)
   ───────────────────────────────────── */
function NavLink({ item, isActive, onRef }) {
    return (
        <a
            href={item.href}
            ref={onRef}
            className={`
        relative z-10 px-3 py-1.5 text-[14px] font-medium tracking-wide
        transition-all duration-300 cursor-pointer select-none whitespace-nowrap
        ${isActive
                    ? 'text-cyan-300'
                    : 'text-slate-400 hover:text-slate-200'
                }
      `}
        >
            {item.name}
        </a>
    );
}

/* ─────────────────────────────────────
   FLOATING DOCK NAV (MAIN COMPONENT)
   ───────────────────────────────────── */
export default function FloatingDockNav() {
    const [activeSection, setActiveSection] = useState('home');
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hoverGlow, setHoverGlow] = useState(false);

    const navContainerRef = useRef(null);
    const linkRefs = useRef({});
    const [activeRect, setActiveRect] = useState(null);
    const [containerRect, setContainerRect] = useState(null);

    useEffect(() => {
        const onScroll = () => {
            const sy = window.scrollY;

            const sections = document.querySelectorAll('section[id]');
            let current = 'home';
            sections.forEach((s) => {
                const top = s.offsetTop - 160;
                if (sy >= top && sy < top + s.offsetHeight) {
                    current = s.id;
                }
            });
            setActiveSection(current);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const computeRects = () => {
            const container = navContainerRef.current;
            const activeLink = linkRefs.current[activeSection];
            if (container && activeLink) {
                setContainerRect(container.getBoundingClientRect());
                setActiveRect(activeLink.getBoundingClientRect());
            }
        };
        computeRects();
        // slight delay to ensure fonts/layout are ready
        setTimeout(computeRects, 100);
        window.addEventListener('resize', computeRects);
        return () => window.removeEventListener('resize', computeRects);
    }, [activeSection]);

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth > 768) setMobileOpen(false);
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    return (
        <>
            {/* ════════════════════════════════════
          DESKTOP DOCK
          ════════════════════════════════════ */}
            <motion.header
                initial={{ y: -100, x: "-50%", opacity: 0 }}
                animate={{
                    y: 0,
                    x: "-50%",
                    opacity: 1,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                onMouseEnter={() => setHoverGlow(true)}
                onMouseLeave={() => setHoverGlow(false)}
                className="
          fixed top-6 left-1/2 z-[100]
          hidden md:flex items-center gap-2
          px-4 py-2.5 rounded-full
          bg-gray-950/60 backdrop-blur-xl
          border border-gray-800/80
          shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.03)]
        "
                style={{
                    borderColor: hoverGlow
                        ? 'rgba(34,211,238,0.15)'
                        : 'rgba(31,41,55,0.8)',
                    boxShadow: hoverGlow
                        ? '0 8px 32px rgba(0,0,0,0.4), 0 0 40px rgba(34,211,238,0.06), 0 0 0 1px rgba(34,211,238,0.08)'
                        : '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03)',
                    transition: 'border-color 0.5s ease, box-shadow 0.5s ease',
                }}
            >
                {/* ── Logo ── */}
                <a
                    href="#home"
                    className="
            group flex items-center gap-1 px-3 mr-3
            text-slate-100 no-underline select-none
          "
                >
                    <span className="
            text-xl font-extrabold tracking-tight
            transition-all duration-300
            group-hover:[text-shadow:0_0_20px_rgba(34,211,238,0.5),0_0_40px_rgba(34,211,238,0.2)]
          ">
                        Mit<span className="text-cyan-400">.</span>
                    </span>
                </a>

                {/* ── Nav Links (with sliding indicator) ── */}
                <nav ref={navContainerRef} className="relative flex items-center gap-1">
                    <ActiveIndicator activeRect={activeRect} containerRect={containerRect} />
                    {NAV_ITEMS.map((item) => (
                        <NavLink
                            key={item.name}
                            item={item}
                            isActive={activeSection === item.href.slice(1)}
                            onRef={(el) => { linkRefs.current[item.href.slice(1)] = el; }}
                        />
                    ))}
                </nav>

                {/* ── Divider ── */}
                <div className="w-px h-6 bg-white/[0.08] mx-3" />

                {/* ── Social Icons ── */}
                <div className="flex items-center gap-2">
                    {SOCIAL_LINKS.map((social) => (
                        <MagneticIcon key={social.label} href={social.href} label={social.label}>
                            <social.icon size={16} strokeWidth={2} />
                        </MagneticIcon>
                    ))}

                    {/* ── Resume Mini-Button ── */}
                    <motion.a
                        href="/Mit_Jakasaniya_Resume.pdf"
                        download
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.95 }}
                        className="
              relative flex items-center gap-1.5 px-4 py-2 ml-1
              rounded-full text-[13px] font-semibold tracking-wide
              text-cyan-300 no-underline cursor-pointer
              bg-cyan-500/[0.08] border border-cyan-500/20
              hover:bg-cyan-500/[0.15] hover:border-cyan-400/40
              hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]
              transition-all duration-300
            "
                    >
                        <FileText size={14} strokeWidth={2.5} />
                        Resume
                    </motion.a>
                </div>
            </motion.header>

            {/* ════════════════════════════════════
          MOBILE DOCK
          ════════════════════════════════════ */}
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{
                    y: 0,
                    opacity: 1,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="
          fixed top-4 left-4 right-4 z-[100]
          flex md:hidden items-center justify-between
          px-5 py-3 rounded-2xl
          bg-gray-950/70 backdrop-blur-xl
          border border-gray-800/80
          shadow-[0_8px_32px_rgba(0,0,0,0.5)]
        "
            >
                <a href="#home" className="text-slate-100 no-underline">
                    <span className="text-xl font-extrabold tracking-tight">
                        Mit<span className="text-cyan-400">.</span>
                    </span>
                </a>

                <div className="flex items-center gap-3">
                    {SOCIAL_LINKS.map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            className="
                flex items-center justify-center w-9 h-9 rounded-full
                text-slate-400 hover:text-cyan-400
                bg-white/[0.04] border border-white/[0.06]
                transition-colors duration-300
              "
                        >
                            <social.icon size={16} />
                        </a>
                    ))}

                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="
              flex items-center justify-center w-10 h-10 rounded-full
              bg-white/[0.06] border border-white/[0.08]
              text-slate-300 hover:text-cyan-400
              transition-colors duration-300 cursor-pointer
            "
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait">
                            {mobileOpen ? (
                                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                    <X size={20} />
                                </motion.div>
                            ) : (
                                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                    <Menu size={20} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </motion.div>

            {/* ── Mobile Full-Screen Menu ── */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="
              fixed inset-0 z-[99]
              bg-gray-950/95 backdrop-blur-2xl
              flex flex-col items-center justify-center
              md:hidden
            "
                    >
                        <nav className="flex flex-col items-center gap-3 w-full max-w-xs">
                            {NAV_ITEMS.map((item, i) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                                    transition={{ delay: i * 0.05, duration: 0.3 }}
                                    className={`
                    w-full text-center py-4 px-6 rounded-xl
                    text-lg font-medium tracking-wide no-underline
                    transition-all duration-300
                    ${activeSection === item.href.slice(1)
                                            ? 'text-cyan-300 bg-cyan-500/[0.1] border border-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.1)]'
                                            : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] border border-transparent'
                                        }
                  `}
                                >
                                    {item.name}
                                </motion.a>
                            ))}

                            {/* ── Mobile Resume Button ── */}
                            <motion.a
                                href="/Mit_Jakasaniya_Resume.pdf"
                                download
                                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                                transition={{ delay: NAV_ITEMS.length * 0.05, duration: 0.3 }}
                                className="
                  w-full text-center py-4 px-6 mt-6 rounded-xl
                  text-base font-semibold tracking-wide no-underline
                  text-cyan-300 bg-cyan-500/[0.1] border border-cyan-500/25
                  hover:bg-cyan-500/[0.18] hover:border-cyan-400/40
                  shadow-[0_0_20px_rgba(34,211,238,0.1)]
                  transition-all duration-300
                  flex items-center justify-center gap-2
                "
                            >
                                <FileText size={18} />
                                Download Resume
                            </motion.a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
