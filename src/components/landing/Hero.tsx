import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { gsap, SplitText } from "@/lib/gsap";
import MicrowaveRipple from "@/components/shared/MicrowaveRipple";
import MagneticButton  from "@/components/shared/MagneticButton";

// Dark bg: #083D77  Text: dt-h=#FAFAF8  dt-b=#C2DCE8  dt-l=#8BBCCE  dt-m=#6AA0B8

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const h1Ref      = useRef<HTMLHeadingElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const badgeRef   = useRef<HTMLDivElement>(null);
  const visualRef  = useRef<HTMLDivElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(badgeRef.current, { y: -20, opacity: 0, duration: 0.6 }, 0.2);
      if (h1Ref.current) {
        const split = new SplitText(h1Ref.current, { type: "lines" });
        split.lines.forEach((line) => {
          const w = document.createElement("div");
          w.style.overflow = "hidden";
          line.parentNode?.insertBefore(w, line);
          w.appendChild(line);
        });
        tl.from(split.lines, { yPercent: 105, duration: 1.05, stagger: 0.09 }, 0.35);
      }
      if (subRef.current) tl.from(subRef.current, { y: 25, opacity: 0, duration: 0.7 }, "-=0.5");
      tl.from(statsRef.current, { y: 25, opacity: 0, duration: 0.65 }, "-=0.5");
      tl.from(ctaRef.current,   { y: 20, opacity: 0, duration: 0.6  }, "-=0.45");
      tl.from(visualRef.current, { opacity: 0, scale: 0.9, duration: 1.1, ease: "power3.out" }, 0.5);
      if (!sectionRef.current) return;
      gsap.to(bgRef.current, {
        yPercent: 20, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(visualRef.current, {
        yPercent: -12, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-dark relative overflow-hidden min-h-[100dvh] flex flex-col justify-center">
      <div ref={bgRef} className="absolute inset-0 pointer-events-none will-change-transform">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_60%_40%,#0D4D8A_0%,#083D77_40%,#051E3E_100%)]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[350px] rounded-full blur-[100px]"
             style={{ background: "rgba(218,65,103,0.07)" }} />
        <div className="absolute top-0 right-0 w-[400px] h-[300px] rounded-full blur-[120px]"
             style={{ background: "rgba(244,211,94,0.05)" }} />
      </div>
      <div className="noise-overlay pointer-events-none" aria-hidden />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-16
                      grid lg:grid-cols-[55fr_45fr] gap-10 lg:gap-8 items-center min-h-[100dvh]">
        <div className="flex flex-col items-start">
          {/* Gold badge */}
          <div ref={badgeRef} className="flex items-center gap-2 px-3 py-1.5 rounded-full mb-10
                                          border border-[#F4D35E]/30 bg-[#F4D35E]/10">
            <div className="w-1.5 h-1.5 rounded-full bg-[#F4D35E] animate-blink" />
            <span className="font-mono text-[10px] text-[#F4D35E]/80 tracking-[0.2em] uppercase">
              Thapar Institute · ECE Dept
            </span>
          </div>

          {/* Heading */}
          <h1 ref={h1Ref}
              className="font-heading font-900 text-[clamp(3.5rem,8.5vw,7.5rem)]
                         leading-[0.98] tracking-display text-[#FAFAF8] mb-8 max-w-[700px]">
            No needles.{" "}
            <span className="text-accent">No pain.</span>
            <span className="block font-400 text-[0.38em] tracking-[-0.01em] text-[#8BBCCE] mt-3">
              Non-invasive blood glucose monitoring
              <br className="hidden lg:block" /> using microwave sensors.
            </span>
          </h1>

          {/* Body */}
          <p ref={subRef} className="font-body text-[#C2DCE8] text-[1.0625rem] leading-[1.75] max-w-[480px] mb-10">
            A microwave-based antenna sensor combined with machine learning delivers{" "}
            <span className="text-[#FAFAF8] font-600">a safe, quick, and comfortable alternative</span>{" "}
            for people with diabetes to regularly check their blood sugar levels.
          </p>

          {/* Stats */}
          <div ref={statsRef} className="flex items-start gap-8 mb-12 divide-x divide-white/15">
            {[
              { val: "828M", label: "diabetics worldwide", color: "text-[#F4D35E]" },
              { val: "212M", label: "in India",            color: "text-[#F4D35E]" },
              { val: "0.97", label: "CatBoost AUC",        color: "text-accent"    },
            ].map((s, i) => (
              <div key={i} className={i > 0 ? "pl-8" : ""}>
                <p className={`font-heading font-900 text-[2.4rem] leading-none ${s.color} font-mono`}>{s.val}</p>
                <p className="font-mono text-[10px] text-[#8BBCCE] uppercase tracking-label mt-1.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <MagneticButton>
              <button onClick={() => document.querySelector("#pipeline")?.scrollIntoView({ behavior: "smooth" })}
                className="group flex items-center gap-3 px-7 py-3.5 rounded-full
                           bg-accent text-[#FAFAF8] font-body font-600 text-[15px]
                           hover:bg-accent-hover transition-colors duration-300
                           active:scale-[0.97] hover:shadow-[0_8px_30px_rgba(218,65,103,0.35)]">
                See how it works
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                  className="group-hover:translate-x-1 transition-transform duration-300">
                  <path d="M2.5 7.5h10M8.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </MagneticButton>
            <MagneticButton>
              <Link to="/dashboard"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full
                           border border-white/25 text-[#C2DCE8] font-body text-[15px]
                           hover:border-white/45 hover:text-[#FAFAF8] transition-all duration-300 active:scale-[0.97]">
                Live dashboard
              </Link>
            </MagneticButton>
          </div>
        </div>

        {/* Visualization */}
        <div ref={visualRef} className="relative w-full max-w-[480px] mx-auto aspect-square will-change-transform">
          <div className="absolute inset-[-15%] rounded-full blur-3xl pointer-events-none"
               style={{ background: "rgba(218,65,103,0.05)" }} />
          <MicrowaveRipple />
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="absolute top-[12%] right-[-8%] glass-dark rounded-xl px-4 py-3 animate-float" style={{ animationDelay: "0.3s" }}>
            <p className="font-mono text-[9px] text-[#8BBCCE] uppercase tracking-label">Signal</p>
            <p className="font-heading font-700 text-[15px] text-[#FAFAF8] leading-tight">S-Params</p>
            <p className="font-mono text-[9px] text-[#8BBCCE] mt-0.5">Microwave</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.0, duration: 0.8 }}
            className="absolute bottom-[18%] left-[-8%] glass-dark rounded-xl px-4 py-3 animate-float" style={{ animationDelay: "1.2s" }}>
            <p className="font-mono text-[9px] text-[#8BBCCE] uppercase tracking-label">Substrate</p>
            <p className="font-heading font-700 text-[15px] text-[#F4D35E] leading-tight">R5880</p>
            <p className="font-mono text-[9px] text-[#8BBCCE] mt-0.5">Rogers</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="absolute top-[48%] left-[-10%] glass-dark rounded-xl px-4 py-3 animate-float" style={{ animationDelay: "2.1s" }}>
            <p className="font-mono text-[9px] text-[#8BBCCE] uppercase tracking-label">Best AUC</p>
            <p className="font-heading font-900 text-[18px] text-accent leading-none">0.97</p>
            <p className="font-mono text-[9px] text-[#8BBCCE] mt-0.5">CatBoost</p>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="font-mono text-[9px] text-[#6AA0B8] tracking-[0.4em] uppercase">Scroll</span>
        <div className="w-px h-12 overflow-hidden">
          <motion.div className="w-full h-full bg-gradient-to-b from-accent via-white/40 to-transparent"
            animate={{ y: ["-100%", "100%"] }} transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }} />
        </div>
      </div>
      {/* Transition fade to warm golden — must match section-light */}
      <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
           style={{ background: "linear-gradient(to bottom, transparent, #FEF6E4)" }} />
    </section>
  );
}
