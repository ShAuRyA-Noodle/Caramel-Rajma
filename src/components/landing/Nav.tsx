import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import MagneticButton from "@/components/shared/MagneticButton";

const LINKS = [
  { label: "Problem",   href: "#problem"  },
  { label: "Physics",   href: "#physics"  },
  { label: "Pipeline",  href: "#pipeline" },
  { label: "Results",   href: "#results"  },
  { label: "Team",      href: "#team"     },
];

function LogoMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="2.5" fill="#DA4167" />
      <path d="M6 11 a5 5 0 0 1 10 0" stroke="#DA4167" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
      <path d="M2.5 11 a8.5 8.5 0 0 1 17 0" stroke="#DA4167" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

export default function Nav() {
  const [scrolled,    setScrolled]    = useState(false);
  const [open,        setOpen]        = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-700
          ${scrolled
            ? "bg-[#061F3F] border-b border-white/12 shadow-[0_2px_20px_rgba(0,0,0,0.25)]"
            : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-[68px] flex items-center justify-between gap-4">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 shrink-0 group">
            <div className="group-hover:scale-110 transition-transform duration-300">
              <LogoMark />
            </div>
            <div className="leading-none">
              <p className="font-heading font-800 text-[13px] tracking-[0.22em] uppercase text-[#FAFAF8]">
                GlucoSense
              </p>
              <p className="font-mono text-[8.5px] text-[#8BBCCE] tracking-[0.18em] uppercase mt-[3px] hidden sm:block">
                Thapar Institute
              </p>
            </div>
          </a>

          {/* Scrolled pill nav */}
          <AnimatePresence>
            {scrolled && (
              <motion.nav
                key="pill"
                initial={{ y: -16, opacity: 0, scale: 0.94 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -12, opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.8 }}
                className="hidden lg:flex absolute left-1/2 -translate-x-1/2
                           items-center gap-0.5 px-2 py-1.5 rounded-full
                           bg-white/[0.07] backdrop-blur-xl
                           border border-white/[0.12]
                           shadow-[inset_0_1px_0_rgba(255,255,255,0.09)]"
              >
                {LINKS.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, type: "spring", stiffness: 400, damping: 28 }}
                    className="relative"
                    onMouseEnter={() => setHoveredLink(link.label)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    {hoveredLink === link.label && (
                      <motion.span layoutId="pill-hover"
                        className="absolute inset-0 rounded-full bg-white/10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <button onClick={() => go(link.href)}
                      className={`relative z-10 px-4 py-1.5 font-body text-[12.5px] tracking-wide transition-colors duration-200
                        ${hoveredLink === link.label ? "text-[#FAFAF8]" : "text-[#C2DCE8]"}`}>
                      {link.label}
                    </button>
                  </motion.div>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>

          {/* Non-scrolled links */}
          {!scrolled && (
            <nav className="hidden lg:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
              {LINKS.map((link) => (
                <button key={link.label} onClick={() => go(link.href)}
                  className="font-body text-[13px] text-[#8BBCCE] hover:text-[#FAFAF8] transition-colors duration-300 tracking-wide">
                  {link.label}
                </button>
              ))}
            </nav>
          )}

          {/* Right CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <MagneticButton>
              <Link to="/dashboard"
                className={`hidden lg:flex items-center gap-2 text-[12.5px] font-body font-600
                             rounded-full px-5 py-2 transition-all duration-400 active:scale-[0.97]
                             ${scrolled
                               ? "bg-accent text-[#FAFAF8] hover:bg-accent-hover shadow-[0_4px_20px_rgba(218,65,103,0.3)]"
                               : "border border-white/20 text-[#C2DCE8] hover:text-[#FAFAF8] hover:border-white/35"}`}>
                Dashboard
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 2.5l3.5 3.5L7 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </MagneticButton>
            <button className="lg:hidden w-8 h-8 flex flex-col justify-center items-center gap-[5px]"
              onClick={() => setOpen(!open)} aria-label="Menu">
              <motion.span className="block w-5 h-px bg-[#FAFAF8] rounded-full origin-center"
                animate={{ rotate: open ? 45 : 0, y: open ? 3 : 0 }} transition={{ duration: 0.22 }} />
              <motion.span className="block w-5 h-px bg-[#FAFAF8] rounded-full"
                animate={{ opacity: open ? 0 : 1 }} transition={{ duration: 0.18 }} />
              <motion.span className="block w-5 h-px bg-[#FAFAF8] rounded-full origin-center"
                animate={{ rotate: open ? -45 : 0, y: open ? -3 : 0 }} transition={{ duration: 0.22 }} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed inset-x-0 top-[68px] z-40 bg-navy/92 backdrop-blur-2xl border-b border-white/10 lg:hidden"
          >
            <div className="px-6 py-8 space-y-1">
              {LINKS.map((link, i) => (
                <motion.button key={link.label}
                  initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 380, damping: 28 }}
                  onClick={() => go(link.href)}
                  className="flex w-full items-center justify-between py-4 border-b border-white/[0.08]
                             font-heading font-700 text-xl text-[#C2DCE8] hover:text-[#FAFAF8] transition-colors tracking-tight">
                  {link.label}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
              ))}
              <div className="pt-5">
                <Link to="/dashboard" onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent rounded-full text-[#FAFAF8] font-body font-600 text-sm">
                  Dashboard
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
