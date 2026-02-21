import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Orbs */}
      <div className="orb orb-cyan w-[400px] h-[400px] -top-20 -left-20 float" />
      <div className="orb orb-violet w-[300px] h-[300px] top-40 right-10 float-delayed" />
      <div className="orb orb-blue w-[250px] h-[250px] bottom-0 left-1/3 float" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 animate-fade-in">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">AI-Powered Learning</span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Master English with{" "}
            <span className="text-glow">Intelligent</span>{" "}
            Practice
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Prepare for the Duolingo English Test with adaptive AI feedback, real-time scoring, and personalized learning paths.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <button className="group flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_hsla(185,100%,50%,0.3)] hover:scale-105">
              Start Practicing
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="glass glow-border-cyan rounded-xl px-6 py-3 font-semibold text-foreground transition-all duration-300 hover:scale-105">
              View Demo Test
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
          {[
            { value: "50K+", label: "Active Learners" },
            { value: "95%", label: "Success Rate" },
            { value: "150+", label: "Practice Tests" },
            { value: "24/7", label: "AI Feedback" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-4 text-center liquid-hover">
              <div className="font-display text-2xl font-bold text-glow-subtle">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
