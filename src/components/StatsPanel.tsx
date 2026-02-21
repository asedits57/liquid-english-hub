import { TrendingUp, Target, Clock, Award } from "lucide-react";

const stats = [
  { icon: TrendingUp, label: "Predicted DET Score", value: "115", trend: "+5", color: "text-glow-cyan" },
  { icon: Target, label: "Accuracy", value: "87%", trend: "+2%", color: "text-glow-violet" },
  { icon: Clock, label: "Practice Time", value: "4.2h", trend: "this week", color: "text-glow-blue" },
  { icon: Award, label: "Tasks Completed", value: "142", trend: "+8 today", color: "text-glow-cyan" },
];

const weekData = [
  { day: "Mon", value: 65 },
  { day: "Tue", value: 80 },
  { day: "Wed", value: 45 },
  { day: "Thu", value: 90 },
  { day: "Fri", value: 70 },
  { day: "Sat", value: 55 },
  { day: "Sun", value: 85 },
];

const StatsPanel = () => {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-6">
        <div className="mb-10">
          <h2 className="font-display text-3xl font-bold mb-2">Performance Analytics</h2>
          <p className="text-muted-foreground">Track your progress and identify areas for improvement</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="glass rounded-xl p-5 liquid-hover transition-all duration-300 hover:scale-[1.02] animate-fade-in"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <stat.icon className={`h-5 w-5 ${stat.color} mb-3`} />
              <div className="font-display text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
              <div className="text-xs text-primary mt-1">{stat.trend}</div>
            </div>
          ))}
        </div>

        {/* Mini chart */}
        <div className="glass rounded-xl p-6 glow-border-cyan">
          <h4 className="text-sm font-medium text-muted-foreground mb-4">Weekly Activity</h4>
          <div className="flex items-end gap-3 h-32">
            {weekData.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full rounded-t-md bg-primary/20 relative overflow-hidden" style={{ height: `${d.value}%` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-glow-cyan/40 to-glow-violet/20" />
                </div>
                <span className="text-xs text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsPanel;
