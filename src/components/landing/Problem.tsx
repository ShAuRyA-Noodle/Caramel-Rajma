import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap, SplitText } from "@/lib/gsap";
import CountUp from "@/components/shared/CountUp";
import { PROBLEM_QUOTES } from "@/lib/data";

// Light bg: #EBEBD3  Text: lt-h=#083D77  lt-b=#1E5478  lt-l=#345E7A  lt-m=#3A6080

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const h2Ref      = useRef<HTMLHeadingElement>(null);
  const stat1Ref   = useRef<HTMLDivElement>(null);
  const stat2Ref   = useRef<HTMLDivElement>(null);
  const stat3Ref   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      if (h2Ref.current) {
        const split = new SplitText(h2Ref.current, { type: "lines" });
        split.lines.forEach((line) => {
          const w = document.createElement("div"); w.style.overflow = "hidden";
          line.parentNode?.insertBefore(w, line); w.appendChild(line);
        });
        gsap.from(split.lines, {
          yPercent: 105, duration: 1.0, stagger: 0.08, ease: "power4.out",
          scrollTrigger: { trigger: h2Ref.current, start: "top 85%", once: true },
        });
      }
      [stat1Ref, stat2Ref, stat3Ref].forEach((ref, i) => {
        if (!ref.current) return;
        gsap.from(ref.current, {
          x: -60, opacity: 0, duration: 0.85, ease: "power3.out", delay: i * 0.12,
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="problem" ref={sectionRef} className="section-light relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full blur-[120px] pointer-events-none"
           style={{ background: "rgba(218,65,103,0.06)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-36">
        <p className="font-mono text-[11px] tracking-label uppercase text-accent mb-6">
          The Problem
        </p>
        <h2 ref={h2Ref}
          className="font-heading font-900 text-[clamp(2.6rem,6vw,5.5rem)]
                     tracking-title leading-[1.02] text-[#083D77] mb-5 max-w-[700px]">
          Diabetes is a global crisis.
          <span className="block font-400 text-[0.5em] tracking-[-0.01em] text-[#345E7A] mt-3">
            And the most common way to manage it still hurts.
          </span>
        </h2>
        <div className="h-px w-24 bg-[#B0C8D8] mb-20" />

        {/* Asymmetric stats */}
        <div className="mt-4 mb-24">
          {/* Stat 1 */}
          <div ref={stat1Ref}
            className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-[#B0C8D8] pb-10 mb-10">
            <div>
              {/* Navy ghost — dark on warm golden = clearly visible watermark */}
              <p className="font-heading font-900 text-[clamp(5rem,14vw,12rem)] leading-none
                            tracking-[-0.05em] select-none pointer-events-none"
                 style={{ color: "rgba(8,61,119,0.18)" }}>828M</p>
            </div>
            <div className="lg:text-right max-w-sm">
              <p className="font-heading font-900 text-[2.8rem] leading-none tracking-title text-[#083D77] mb-3">
                <CountUp end={828} suffix="M" className="font-heading font-900 text-[2.8rem] leading-none tracking-title text-[#083D77]" />
              </p>
              <p className="font-body text-[#1E5478] text-lg leading-relaxed">diabetics worldwide</p>
              <p className="font-mono text-[10px] text-[#3A6080] uppercase tracking-label mt-2">
                Source: Saeedi et al., Diabetes Res. Clin. Pract., 2019
              </p>
            </div>
          </div>

          {/* Stat 2 */}
          <div ref={stat2Ref}
            className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-[#B0C8D8] pb-10 mb-10 lg:pl-24">
            <div className="max-w-sm">
              <p className="font-heading font-900 text-[2.8rem] leading-none tracking-title text-[#083D77] mb-3">
                <CountUp end={212} suffix="M" className="font-heading font-900 text-[2.8rem] leading-none tracking-title text-[#083D77]" />
              </p>
              <p className="font-body text-[#1E5478] text-lg leading-relaxed">diabetics in India alone</p>
              <p className="font-mono text-[10px] text-[#3A6080] uppercase tracking-label mt-2">
                Roughly a quarter of all diabetics globally
              </p>
            </div>
            {/* Coral on warm golden — complementary contrast */}
            <p className="font-heading font-900 text-[clamp(5rem,14vw,12rem)] leading-none
                          tracking-[-0.05em] select-none pointer-events-none"
               style={{ color: "rgba(218,65,103,0.22)" }}>212M</p>
          </div>

          {/* Stat 3 */}
          <div ref={stat3Ref}
            className="flex flex-col lg:flex-row lg:items-end justify-between pb-10 lg:pl-48">
            <div>
              <p className="font-heading font-900 text-[clamp(5rem,14vw,12rem)] leading-none
                            tracking-[-0.05em] select-none pointer-events-none"
                 style={{ color: "rgba(8,61,119,0.15)" }}>0.97</p>
            </div>
            <div className="lg:text-right max-w-sm">
              <p className="font-heading font-900 text-[2.8rem] leading-none tracking-title text-accent mb-3">0.97</p>
              <p className="font-body text-[#1E5478] text-lg leading-relaxed">CatBoost AUC · best model</p>
              <p className="font-mono text-[10px] text-[#3A6080] uppercase tracking-label mt-2">
                Table I · paper results
              </p>
            </div>
          </div>
        </div>

        {/* Quote cards — white on beige */}
        <div className="space-y-5">
          {PROBLEM_QUOTES.map((q, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
              className={`relative rounded-2xl bg-white overflow-hidden group
                          border border-[#B0C8D8] shadow-[0_2px_20px_rgba(8,61,119,0.06)]
                          ${i % 2 === 1 ? "lg:ml-24" : ""}`}>
              <div className="absolute top-0 left-0 w-[3px] h-full rounded-full"
                   style={{ backgroundColor: q.accentColor }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 rounded-2xl"
                   style={{ background: `radial-gradient(600px at 0% 50%, ${q.accentColor}06, transparent 70%)` }} />
              <div className="relative px-10 py-10 lg:py-12 lg:pr-16">
                <p className="font-heading font-900 text-[6rem] leading-none -mt-4 mb-2"
                   style={{ color: q.accentColor, opacity: 0.2 }}>"</p>
                <p className="font-body text-[#083D77] text-[1.0625rem] leading-[1.75] max-w-2xl">{q.quote}</p>
                <p className="font-mono text-[10px] text-[#3A6080] uppercase tracking-label mt-5">{q.context}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
