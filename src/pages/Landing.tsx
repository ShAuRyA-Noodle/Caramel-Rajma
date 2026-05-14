import Nav          from "@/components/landing/Nav";
import Hero         from "@/components/landing/Hero";
import Problem      from "@/components/landing/Problem";
import Physics      from "@/components/landing/Physics";
import Pipeline     from "@/components/landing/Pipeline";
import MLResults    from "@/components/landing/MLResults";
import Technology   from "@/components/landing/Technology";
import ResearchTeam from "@/components/landing/ResearchTeam";
import Footer       from "@/components/landing/Footer";
import ScrollProgress from "@/components/shared/ScrollProgress";
import Marquee      from "@/components/shared/Marquee";

export default function Landing() {
  return (
    <main>
      {/* Magenta progress bar at top */}
      <ScrollProgress />

      <Nav />
      <Hero />

      {/* Kinetic marquee strip between hero and problem */}
      <Marquee variant="light" />

      <Problem />
      <Physics />

      {/* Marquee between physics and pipeline */}
      <Marquee variant="light" reverse />

      <Pipeline />
      <MLResults />

      {/* Marquee before technology */}
      <Marquee variant="dark" />

      <Technology />
      <ResearchTeam />
      <Footer />
    </main>
  );
}
