"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { syncLenis } from "@/lib/gsap";

// Award-winning scroll config — same easing formula as Apple.com
// duration 2.0 + expo-out = buttery deceleration with weight
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.0,
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.75,   // slightly slow = more control = more premium feel
      touchMultiplier: 2.0,
      infinite: false,
    });

    syncLenis(lenis);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
