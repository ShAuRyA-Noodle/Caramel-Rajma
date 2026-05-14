import { Link } from "react-router-dom";
import { INSTITUTION, PAPER_TITLE } from "@/lib/data";

// Deep dark bg: #051E3E  text: #FAFAF8 headings  #A8C8DC body  #6A9CB5 labels  #4A7A98 muted

export default function Footer() {
  return (
    <footer className="section-deep border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-12">
        <div className="grid lg:grid-cols-[2fr_1fr_1fr] gap-12 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-6 rounded-full border border-accent/60 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-accent animate-blink" />
              </div>
              <span className="font-heading font-800 text-[#FAFAF8] text-sm tracking-[0.2em] uppercase">GlucoSense</span>
            </div>
            <p className="font-body text-[#A8C8DC] text-sm leading-[1.7] max-w-xs">
              Non-invasive blood glucose monitoring via microwave sensors and machine learning.
              All data sourced from real research.
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] text-[#6A9CB5] uppercase tracking-label mb-5">Research</p>
            <p className="font-body text-[#A8C8DC] text-sm leading-relaxed mb-3">{PAPER_TITLE}</p>
            <p className="font-body text-[#6A9CB5] text-xs">{INSTITUTION}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] text-[#6A9CB5] uppercase tracking-label mb-5">Navigation</p>
            <div className="flex flex-col gap-3">
              {[
                { label: "The Problem", href: "#problem" },
                { label: "Physics",     href: "#physics" },
                { label: "Pipeline",    href: "#pipeline" },
                { label: "Results",     href: "#results" },
              ].map((l) => (
                <a key={l.label} href={l.href}
                  className="font-body text-sm text-[#A8C8DC] hover:text-[#FAFAF8] transition-colors w-fit">
                  {l.label}
                </a>
              ))}
              <Link to="/dashboard"
                className="font-body text-sm text-accent/80 hover:text-accent transition-colors w-fit mt-1">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-mono text-[9px] text-[#4A7A98] tracking-label uppercase">
            All metrics on this site are real and sourced exclusively from the research paper. Zero synthetic data.
          </p>
          <p className="font-mono text-[9px] text-[#4A7A98] tracking-label uppercase">
            Thapar Institute of Engineering and Technology
          </p>
        </div>
      </div>
    </footer>
  );
}
