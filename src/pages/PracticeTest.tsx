import { useState, useRef, useCallback } from "react";
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Volume2, RotateCcw, Clock, Trophy, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Question = {
  id: number;
  type: "multiple-choice" | "fill-blank" | "audio";
  category: string;
  difficulty: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  audioText?: string;
  blanks?: string[];
  explanation: string;
};

const questions: Question[] = [
  {
    id: 1,
    type: "multiple-choice",
    category: "Grammar",
    difficulty: "Intermediate",
    question: "Choose the correct sentence:",
    options: [
      "She don't like coffee in the morning.",
      "She doesn't likes coffee in the morning.",
      "She doesn't like coffee in the morning.",
      "She not like coffee in the morning.",
    ],
    correctAnswer: "She doesn't like coffee in the morning.",
    explanation: "With third-person singular subjects, we use 'doesn't' + base form of the verb.",
  },
  {
    id: 2,
    type: "fill-blank",
    category: "Vocabulary",
    difficulty: "Advanced",
    question: 'Complete the sentence: "The scientist\'s groundbreaking research had a profound _____ on the field of genetics."',
    correctAnswer: "impact",
    blanks: ["impact", "effect", "influence"],
    explanation: "'Impact' collocates naturally with 'profound' and 'on the field' in academic contexts.",
  },
  {
    id: 3,
    type: "audio",
    category: "Listening",
    difficulty: "Intermediate",
    question: "Listen to the passage and select the main idea:",
    audioText: "Climate change is one of the most pressing issues facing our planet today. Rising temperatures are causing ice caps to melt, sea levels to rise, and extreme weather events to become more frequent. Scientists agree that immediate action is needed to reduce greenhouse gas emissions.",
    options: [
      "Scientists disagree about climate change.",
      "Climate change requires urgent action to address its effects.",
      "Sea levels have always been rising naturally.",
      "Extreme weather events are decreasing over time.",
    ],
    correctAnswer: "Climate change requires urgent action to address its effects.",
    explanation: "The passage emphasizes the urgency of climate change and the need for immediate action.",
  },
  {
    id: 4,
    type: "multiple-choice",
    category: "Reading",
    difficulty: "Beginner",
    question: 'What does the word "ubiquitous" most closely mean?',
    options: ["Rare and unusual", "Found everywhere", "Extremely dangerous", "Highly valuable"],
    correctAnswer: "Found everywhere",
    explanation: "'Ubiquitous' means present, appearing, or found everywhere.",
  },
  {
    id: 5,
    type: "fill-blank",
    category: "Grammar",
    difficulty: "Intermediate",
    question: '"If I _____ known about the meeting, I would have attended."',
    correctAnswer: "had",
    blanks: ["had", "have", "has"],
    explanation: "This is a third conditional sentence (past unreal condition), requiring 'had' + past participle.",
  },
  {
    id: 6,
    type: "audio",
    category: "Listening",
    difficulty: "Advanced",
    question: "Listen and identify the speaker's tone:",
    audioText: "I find it absolutely remarkable that after decades of research and billions of dollars in funding, we still can't seem to agree on the most basic solutions. Perhaps it's time we reconsidered our entire approach.",
    options: ["Enthusiastic and hopeful", "Sarcastic and frustrated", "Neutral and informative", "Cheerful and optimistic"],
    correctAnswer: "Sarcastic and frustrated",
    explanation: "The use of 'absolutely remarkable' paired with criticism indicates sarcasm and frustration.",
  },
  {
    id: 7,
    type: "multiple-choice",
    category: "Vocabulary",
    difficulty: "Expert",
    question: 'Choose the word that best completes: "The politician\'s _____ remarks alienated even her closest allies."',
    options: ["Eloquent", "Incendiary", "Mundane", "Benevolent"],
    correctAnswer: "Incendiary",
    explanation: "'Incendiary' means inflammatory or provocative — fitting for remarks that alienate allies.",
  },
  {
    id: 8,
    type: "fill-blank",
    category: "Grammar",
    difficulty: "Expert",
    question: '"Not only _____ the exam, but she also received the highest score in her class."',
    correctAnswer: "did she pass",
    blanks: ["did she pass", "she passed", "she did pass"],
    explanation: "'Not only' at the start of a sentence triggers subject-auxiliary inversion.",
  },
];

const difficultyColor: Record<string, string> = {
  Beginner: "text-glow-cyan",
  Intermediate: "text-glow-blue",
  Advanced: "text-glow-violet",
  Expert: "text-glow-violet",
};

const PracticeTest = () => {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState<Record<number, boolean>>({});
  const [fillInput, setFillInput] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const synthRef = useRef(window.speechSynthesis);

  const q = questions[currentIdx];
  const totalAnswered = Object.keys(answers).length;
  const correctCount = Object.entries(answers).filter(
    ([id, ans]) => questions.find((qq) => qq.id === Number(id))?.correctAnswer === ans
  ).length;

  const submitAnswer = useCallback(
    (ans: string) => {
      if (showResult[q.id]) return;
      setAnswers((prev) => ({ ...prev, [q.id]: ans }));
      setShowResult((prev) => ({ ...prev, [q.id]: true }));
    },
    [q.id, showResult]
  );

  const playAudio = useCallback(() => {
    if (!q.audioText) return;
    synthRef.current.cancel();
    const u = new SpeechSynthesisUtterance(q.audioText);
    u.rate = 0.9;
    u.onend = () => setIsPlaying(false);
    setIsPlaying(true);
    synthRef.current.speak(u);
  }, [q]);

  const goNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((p) => p + 1);
      setFillInput("");
    }
  };
  const goPrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((p) => p - 1);
      setFillInput("");
    }
  };

  const isCorrect = answers[q.id] === q.correctAnswer;
  const answered = showResult[q.id];

  return (
    <div className="min-h-screen animated-bg relative">
      {/* Orbs */}
      <div className="orb orb-cyan w-[350px] h-[350px] -top-20 right-20 float" />
      <div className="orb orb-violet w-[250px] h-[250px] bottom-40 -left-10 float-delayed" />

      {/* Header */}
      <header className="glass-strong sticky top-0 z-50 border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 glass rounded-full px-3 py-1.5">
              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">
                {currentIdx + 1} / {questions.length}
              </span>
            </div>
            <div className="flex items-center gap-2 glass rounded-full px-3 py-1.5">
              <Trophy className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">
                {correctCount} correct
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10 max-w-3xl relative z-10">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-glow-cyan to-glow-violet transition-all duration-500"
              style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="glass rounded-2xl p-8 glow-border-cyan liquid-hover animate-fade-in" key={q.id}>
          {/* Meta */}
          <div className="flex items-center gap-3 mb-6">
            <span className="glass rounded-full px-3 py-1 text-xs font-medium text-foreground">
              {q.category}
            </span>
            <span className={`text-xs font-medium ${difficultyColor[q.difficulty]}`}>
              {q.difficulty}
            </span>
            <span className="text-xs text-muted-foreground capitalize ml-auto">
              {q.type.replace("-", " ")}
            </span>
          </div>

          {/* Question text */}
          <h2 className="font-display text-xl md:text-2xl font-semibold mb-8 leading-relaxed">
            {q.question}
          </h2>

          {/* Audio player */}
          {q.type === "audio" && (
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={playAudio}
                disabled={isPlaying}
                className="flex items-center gap-2 glass glow-border-blue rounded-xl px-5 py-3 font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50"
              >
                <Volume2 className={`h-5 w-5 text-glow-blue ${isPlaying ? "animate-pulse" : ""}`} />
                {isPlaying ? "Playing…" : "Play Audio"}
              </button>
              {isPlaying && (
                <div className="flex gap-1 items-end h-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-1 bg-glow-blue rounded-full animate-pulse"
                      style={{
                        height: `${12 + Math.random() * 12}px`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Multiple choice */}
          {(q.type === "multiple-choice" || q.type === "audio") && q.options && (
            <div className="space-y-3">
              {q.options.map((opt) => {
                const selected = answers[q.id] === opt;
                const correct = opt === q.correctAnswer;
                let style = "glass glow-border-cyan hover:scale-[1.01]";
                if (answered && correct) style = "border border-primary bg-primary/10 glow-cyan";
                else if (answered && selected && !correct) style = "border border-destructive bg-destructive/10";
                else if (answered) style = "glass opacity-50";

                return (
                  <button
                    key={opt}
                    onClick={() => submitAnswer(opt)}
                    disabled={answered}
                    className={`w-full text-left rounded-xl px-5 py-4 text-sm font-medium transition-all duration-300 ${style} flex items-center justify-between`}
                  >
                    <span>{opt}</span>
                    {answered && correct && <CheckCircle className="h-5 w-5 text-primary shrink-0" />}
                    {answered && selected && !correct && <XCircle className="h-5 w-5 text-destructive shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Fill in the blank */}
          {q.type === "fill-blank" && (
            <div className="space-y-4">
              <div className="flex gap-3">
                <input
                  value={answered ? answers[q.id] : fillInput}
                  onChange={(e) => setFillInput(e.target.value)}
                  disabled={answered}
                  placeholder="Type your answer…"
                  className="flex-1 rounded-xl bg-muted/50 border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  onKeyDown={(e) => e.key === "Enter" && fillInput.trim() && submitAnswer(fillInput.trim().toLowerCase())}
                />
                {!answered && (
                  <button
                    onClick={() => fillInput.trim() && submitAnswer(fillInput.trim().toLowerCase())}
                    className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_20px_hsla(185,100%,50%,0.3)] hover:scale-105"
                  >
                    Submit
                  </button>
                )}
              </div>
              {q.blanks && !answered && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-muted-foreground mr-1">Hints:</span>
                  {q.blanks.map((b) => (
                    <button
                      key={b}
                      onClick={() => setFillInput(b)}
                      className="glass rounded-full px-3 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {b}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Result feedback */}
          {answered && (
            <div
              className={`mt-6 rounded-xl p-4 ${
                isCorrect ? "bg-primary/5 border border-primary/20" : "bg-destructive/5 border border-destructive/20"
              } animate-fade-in`}
            >
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <CheckCircle className="h-4 w-4 text-primary" />
                ) : (
                  <XCircle className="h-4 w-4 text-destructive" />
                )}
                <span className={`text-sm font-semibold ${isCorrect ? "text-primary" : "text-destructive"}`}>
                  {isCorrect ? "Correct!" : "Incorrect"}
                </span>
              </div>
              {!isCorrect && (
                <p className="text-sm text-muted-foreground mb-1">
                  Correct answer: <span className="text-foreground font-medium">{q.correctAnswer}</span>
                </p>
              )}
              <p className="text-sm text-muted-foreground">{q.explanation}</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={goPrev}
            disabled={currentIdx === 0}
            className="flex items-center gap-2 glass rounded-xl px-5 py-3 text-sm font-medium transition-all hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </button>

          {/* Dot indicators */}
          <div className="hidden sm:flex gap-1.5">
            {questions.map((_, i) => {
              const done = showResult[questions[i].id];
              const isActive = i === currentIdx;
              return (
                <button
                  key={i}
                  onClick={() => { setCurrentIdx(i); setFillInput(""); }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-6 bg-primary"
                      : done
                      ? answers[questions[i].id] === questions[i].correctAnswer
                        ? "w-2 bg-primary/50"
                        : "w-2 bg-destructive/50"
                      : "w-2 bg-muted-foreground/30"
                  }`}
                />
              );
            })}
          </div>

          <button
            onClick={goNext}
            disabled={currentIdx === questions.length - 1}
            className="flex items-center gap-2 glass rounded-xl px-5 py-3 text-sm font-medium transition-all hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Score summary when all done */}
        {totalAnswered === questions.length && (
          <div className="mt-10 glass rounded-2xl p-8 glow-border-violet text-center animate-fade-in">
            <Zap className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="font-display text-2xl font-bold mb-2">Test Complete!</h3>
            <p className="text-4xl font-display font-bold text-glow mb-2">
              {correctCount} / {questions.length}
            </p>
            <p className="text-muted-foreground mb-6">
              {correctCount >= 6 ? "Excellent work!" : correctCount >= 4 ? "Good effort, keep practicing!" : "Keep going — practice makes perfect!"}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setAnswers({});
                  setShowResult({});
                  setCurrentIdx(0);
                  setFillInput("");
                }}
                className="flex items-center gap-2 glass glow-border-cyan rounded-xl px-5 py-3 text-sm font-medium transition-all hover:scale-105"
              >
                <RotateCcw className="h-4 w-4" />
                Retry
              </button>
              <button
                onClick={() => navigate("/")}
                className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_20px_hsla(185,100%,50%,0.3)] hover:scale-105"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PracticeTest;
