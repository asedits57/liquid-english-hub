import { Flame, Clock, Target, Zap } from "lucide-react";

const DailyChallenge = () => {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-6">
        <div className="glass rounded-2xl p-8 md:p-10 glow-border-cyan relative overflow-hidden liquid-hover">
          {/* Decorative orbs */}
          <div className="orb orb-cyan w-[200px] h-[200px] -top-10 -right-10" />
          <div className="orb orb-violet w-[150px] h-[150px] bottom-0 left-10" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Flame className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-primary">Daily Challenge</span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">
                5-Minute Speaking Sprint
              </h3>
              <p className="text-muted-foreground max-w-lg">
                Describe three images in under 90 seconds each. AI evaluates pronunciation, fluency, and coherence in real time.
              </p>

              <div className="flex items-center gap-6 mt-5">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  5 min
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Target className="h-4 w-4" />
                  +50 XP
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Zap className="h-4 w-4" />
                  Intermediate
                </div>
              </div>
            </div>

            <button className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_hsla(185,100%,50%,0.3)] hover:scale-105 shrink-0">
              Accept Challenge
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyChallenge;
