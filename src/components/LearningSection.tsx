import { Mic, Headphones, BookOpen, PenTool, Languages, Brain } from "lucide-react";

const sections = [
  {
    icon: Mic,
    title: "Speaking",
    description: "Practice pronunciation and fluency with AI-powered voice analysis",
    color: "cyan" as const,
    tasks: 24,
  },
  {
    icon: Headphones,
    title: "Listening",
    description: "Sharpen comprehension with diverse audio exercises",
    color: "violet" as const,
    tasks: 32,
  },
  {
    icon: BookOpen,
    title: "Reading",
    description: "Build reading speed and comprehension skills",
    color: "blue" as const,
    tasks: 28,
  },
  {
    icon: PenTool,
    title: "Writing",
    description: "Get instant AI feedback on essays and responses",
    color: "cyan" as const,
    tasks: 20,
  },
  {
    icon: Languages,
    title: "Vocabulary",
    description: "Expand your word bank with smart flashcards",
    color: "violet" as const,
    tasks: 40,
  },
  {
    icon: Brain,
    title: "Grammar",
    description: "Master grammar rules through interactive tasks",
    color: "blue" as const,
    tasks: 36,
  },
];

const glowMap = {
  cyan: "glow-border-cyan glow-cyan",
  violet: "glow-border-violet glow-violet",
  blue: "glow-border-blue glow-blue",
};

const iconBgMap = {
  cyan: "bg-glow-cyan/10 text-glow-cyan",
  violet: "bg-glow-violet/10 text-glow-violet",
  blue: "bg-glow-blue/10 text-glow-blue",
};

const LearningSection = () => {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-6">
        <div className="mb-10">
          <h2 className="font-display text-3xl font-bold mb-2">Learning Sections</h2>
          <p className="text-muted-foreground">Choose a skill to practice and improve</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sections.map((section, i) => (
            <div
              key={section.title}
              className={`glass rounded-2xl p-6 liquid-hover transition-all duration-500 hover:scale-[1.02] cursor-pointer group animate-fade-in ${glowMap[section.color]}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${iconBgMap[section.color]} mb-4 transition-transform duration-300 group-hover:scale-110`}>
                <section.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{section.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{section.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{section.tasks} tasks</span>
                <button className="text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Start →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningSection;
