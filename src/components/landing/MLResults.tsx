import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { ML_MODELS, CONCLUSIONS } from "@/lib/data";

// Dark bg: #083D77  dt-h=#FAFAF8  dt-b=#C2DCE8  dt-l=#8BBCCE  dt-m=#6AA0B8

const ChartTip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#051E3E] border border-white/15 rounded-xl px-4 py-3 shadow-2xl">
      <p className="font-mono text-[10px] text-[#8BBCCE] uppercase tracking-label mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="font-heading font-700 text-sm" style={{ color: p.color }}>
          {p.name}: <span className="text-[#FAFAF8]">{p.value}{typeof p.value === "number" && p.value < 2 ? "" : "%"}</span>
        </p>
      ))}
    </div>
  );
};

export default function MLResults() {
  const sectionRef = useRef<HTMLElement>(null);
  const tableRef   = useRef<HTMLDivElement>(null);
  const h2Ref      = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      if (h2Ref.current) {
        const split = new SplitText(h2Ref.current, { type: "lines" });
        split.lines.forEach((l) => {
          const w = document.createElement("div"); w.style.overflow = "hidden";
          l.parentNode?.insertBefore(w, l); w.appendChild(l);
        });
        gsap.from(split.lines, {
          yPercent: 105, duration: 1.0, stagger: 0.08, ease: "power4.out",
          scrollTrigger: { trigger: h2Ref.current, start: "top 85%", once: true },
        });
      }
      const rows = tableRef.current?.querySelectorAll(".result-row");
      if (rows) {
        gsap.from(rows, {
          x: -50, opacity: 0, duration: 0.7, stagger: 0.07, ease: "power3.out",
          scrollTrigger: { trigger: tableRef.current, start: "top 80%", once: true },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const chartData = ML_MODELS.filter((m) => m.auc !== null).map((m) => ({
    name: m.shortName, AUC: m.auc!, color: m.color,
  }));

  return (
    <section id="results" ref={sectionRef} className="section-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_40%,#0A3060,#083D77_50%,#051E3E_100%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full blur-[120px] pointer-events-none"
           style={{ background: "rgba(244,211,94,0.04)" }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-36">
        <p className="font-mono text-[11px] tracking-label uppercase text-accent mb-6">Model Performance</p>
        <h2 ref={h2Ref}
          className="font-heading font-900 text-[clamp(2.6rem,6vw,5.5rem)] tracking-title leading-[1.02] text-[#FAFAF8] mb-6 max-w-[640px]">
          5 models.
          <span className="text-accent"> Real data.</span>
        </h2>
        <p className="font-body text-[#C2DCE8] text-[1.0625rem] max-w-md mb-20 leading-relaxed">
          All metrics from Table I and Table II of the paper. 80:20 train-test split.
        </p>

        {/* Table 60% + chart 40% */}
        <div className="lg:grid lg:grid-cols-[60fr_40fr] gap-12 mb-20">
          <div ref={tableRef} className="rounded-2xl overflow-hidden border border-white/12 mb-10 lg:mb-0">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/12 bg-[#051E3E]/60">
                  {["Model", "AUC", "Accuracy", "Precision", "Recall", "F1"].map((h) => (
                    <th key={h} className="text-left py-4 px-4 font-mono text-[9px] tracking-label uppercase text-[#8BBCCE]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ML_MODELS.map((m) => (
                  <tr key={m.name}
                    className="result-row border-b border-white/8 hover:bg-white/5 transition-colors">
                    <td className="py-5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: m.color }} />
                        <span className="font-body font-500 text-[#FAFAF8] text-sm">{m.name}</span>
                      </div>
                    </td>
                    <td className="py-5 px-4 font-mono text-sm tabular-nums">
                      <span className={m.auc === 0.97 ? "text-accent font-700" : "text-[#8BBCCE]"}>
                        {m.auc ?? "N/A"}
                      </span>
                    </td>
                    <td className="py-5 px-4 font-mono text-sm tabular-nums">
                      <span className={m.accuracy === 97.2 ? "text-[#F4D35E] font-700" : "text-[#8BBCCE]"}>
                        {m.accuracy}%
                      </span>
                    </td>
                    <td className="py-5 px-4 font-mono text-sm tabular-nums">
                      <span className={m.precision === 100 ? "text-[#F4D35E] font-600" : "text-[#8BBCCE]"}>
                        {m.precision}%
                      </span>
                    </td>
                    <td className="py-5 px-4 font-mono text-sm tabular-nums">
                      <span className={m.recall === 100 ? "text-[#c084fc] font-600" : "text-[#8BBCCE]"}>
                        {m.recall}%
                      </span>
                    </td>
                    <td className="py-5 px-4 font-mono text-sm tabular-nums text-[#8BBCCE]">{m.f1}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-5 py-3 border-t border-white/10">
              <p className="font-mono text-[9px] text-[#6AA0B8] text-right tracking-label">
                Table I and Table II · Thapar Institute
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="border border-white/12 rounded-2xl p-6 bg-[#051E3E]/40">
              <p className="font-heading font-700 text-[#FAFAF8] text-sm mb-1">AUC · ROC Curve Area</p>
              <p className="font-mono text-[9px] text-[#8BBCCE] uppercase tracking-label mb-5">Table I</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={chartData} barSize={28} barCategoryGap="40%">
                  <XAxis dataKey="name"
                    tick={{ fill: "#8BBCCE", fontSize: 10, fontFamily: "JetBrains Mono" }}
                    axisLine={false} tickLine={false} />
                  <YAxis domain={[0.88, 1.0]}
                    tick={{ fill: "#8BBCCE", fontSize: 10 }}
                    axisLine={false} tickLine={false} tickFormatter={(v: number) => v.toFixed(2)} />
                  <Tooltip content={<ChartTip />} />
                  <Bar dataKey="AUC" radius={[4, 4, 0, 0]}>
                    {chartData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="border border-accent/30 rounded-2xl p-6 bg-accent/8">
              <p className="font-mono text-[9px] text-accent/80 uppercase tracking-label mb-3">Best AUC</p>
              <p className="font-heading font-900 text-[3.5rem] text-accent leading-none mb-2 font-mono">0.97</p>
              <p className="font-body text-[#C2DCE8] text-sm leading-relaxed">
                CatBoost · highest class discrimination
              </p>
            </div>
          </div>
        </div>

        {/* Conclusions */}
        <div className="border border-white/12 rounded-2xl overflow-hidden">
          {[
            { val: "0.97",     tag: "CatBoost AUC",          body: CONCLUSIONS.bestAUC,      color: "#DA4167" },
            { val: "97.2%",    tag: "Random Forest Accuracy", body: CONCLUSIONS.bestAccuracy, color: "#F4D35E" },
            { val: "Balanced", tag: "XGBoost Trade-off",      body: CONCLUSIONS.xgboost,      color: "#F78764" },
            { val: "100%",     tag: "TabNet Recall",          body: CONCLUSIONS.tabnet,       color: "#c084fc" },
          ].map((item, i) => (
            <motion.div key={i}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8
                         border-b border-white/8 last:border-0 px-6 py-6 hover:bg-white/4 transition-colors">
              <p className="font-heading font-900 text-[2rem] leading-none min-w-[100px] font-mono"
                 style={{ color: item.color }}>{item.val}</p>
              <div className="flex-1">
                <p className="font-heading font-700 text-[#FAFAF8] text-sm mb-1">{item.tag}</p>
                <p className="font-body text-[#C2DCE8] text-sm leading-relaxed">{item.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
