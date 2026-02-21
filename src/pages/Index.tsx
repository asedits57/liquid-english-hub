import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LearningSection from "@/components/LearningSection";
import TaskLevels from "@/components/TaskLevels";
import DailyChallenge from "@/components/DailyChallenge";
import StatsPanel from "@/components/StatsPanel";

const Index = () => {
  return (
    <div className="min-h-screen animated-bg relative">
      <Navbar />
      <HeroSection />
      <DailyChallenge />
      <LearningSection />
      <TaskLevels />
      <StatsPanel />
      <footer className="glass-strong border-t border-border/50 py-8 mt-8">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          © 2026 FluentAI — AI-Powered English Learning Platform
        </div>
      </footer>
    </div>
  );
};

export default Index;
