import { Star, Lock, CheckCircle, ArrowRight } from "lucide-react";

const levels = [
  {
    level: "Beginner",
    score: "10–55",
    description: "Build your foundation with basic vocabulary and simple sentence structures",
    progress: 85,
    status: "completed" as const,
    tasks: 12,
    color: "cyan" as const,
  },
  {
    level: "Intermediate",
    score: "60–90",
    description: "Strengthen comprehension and develop more complex language skills",
    progress: 42,
    status: "active" as const,
    tasks: 18,
    color: "blue" as const,
  },
  {
    level: "Advanced",
    score: "95–120",
    description: "Refine fluency with academic texts, nuanced writing, and fast-paced listening",
    progress: 0,
    status: "locked" as const,
    tasks: 24,
    color: "violet" as const,
  },
  {
    level: "Expert",
    score: "125–160",
    description: "Master high-level reasoning, argumentation, and native-like proficiency",
    progress: 0,
    status: "locked" as const,
    tasks: 16,
    color: "violet" as const,
  },
];

const borderMap = {
  cyan: "glow-border-cyan",
  blue: "glow-border-blue",
  violet: "glow-border-violet",
};

const barMap = {
  cyan: "bg-glow-cyan",
  blue: "bg-glow-blue",
  violet: "bg-glow-violet",
};

const TaskLevels = () => {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-6">
        <div className="mb-10">
          <h2 className="font-display text-3xl font-bold mb-2">Practice Levels</h2>
          <p className="text-muted-foreground">Progress through difficulty tiers to reach your target DET score</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {levels.map((lvl, i) => (
            <div
              key={lvl.level}
              className={`glass rounded-2xl p-6 liquid-hover transition-all duration-500 group animate-fade-in ${borderMap[lvl.color]} ${lvl.status === "locked" ? "opacity-60" : "hover:scale-[1.01] cursor-pointer"}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display text-xl font-semibold">{lvl.level}</h3>
                    {lvl.status === "completed" && <CheckCircle className="h-4 w-4 text-primary" />}
                    {lvl.status === "locked" && <Lock className="h-4 w-4 text-muted-foreground" />}
                  </div>
                  <span className="text-xs text-muted-foreground">DET Score: {lvl.score}</span>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 4 }).map((_, si) => (
                    <Star
                      key={si}
                      className={`h-3.5 w-3.5 ${si < (lvl.status === "completed" ? 4 : lvl.status === "active" ? 2 : 0) ? "text-primary fill-primary" : "text-muted-foreground/30"}`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{lvl.description}</p>

              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">{lvl.tasks} tasks</span>
                  <span className="text-foreground font-medium">{lvl.progress}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full ${barMap[lvl.color]} transition-all duration-1000`}
                    style={{ width: `${lvl.progress}%` }}
                  />
                </div>
              </div>

              {lvl.status !== "locked" && (
                <button className="flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {lvl.status === "completed" ? "Review" : "Continue"}
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TaskLevels;
