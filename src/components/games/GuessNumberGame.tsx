import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, RotateCcw, ArrowUp, ArrowDown, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface GuessNumberGameProps {
  onBack: () => void;
}

export function GuessNumberGame({ onBack }: GuessNumberGameProps) {
  const [targetNumber, setTargetNumber] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState<"higher" | "lower" | "correct" | null>(null);
  const [history, setHistory] = useState<number[]>([]);

  const resetGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setAttempts(0);
    setFeedback(null);
    setHistory([]);
  };

  const handleGuess = () => {
    const num = parseInt(guess);
    if (isNaN(num) || num < 1 || num > 100) return;

    setAttempts(a => a + 1);
    setHistory(h => [...h, num]);

    if (num === targetNumber) {
      setFeedback("correct");
    } else if (num < targetNumber) {
      setFeedback("higher");
    } else {
      setFeedback("lower");
    }
    setGuess("");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            variant="ghost"
            onClick={resetGame}
            className="text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Title */}
        <h1 className="font-pixel text-xl text-center text-secondary text-glow-pink mb-2">
          GUESS
        </h1>
        <p className="text-center text-muted-foreground mb-6">
          Find the number between 1-100
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-6 mb-6">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">Attempts</p>
            <p className="font-pixel text-lg text-accent">{attempts}</p>
          </div>
        </div>

        {/* Win State */}
        {feedback === "correct" ? (
          <div className="p-6 rounded-xl bg-card border-2 border-accent text-center animate-pulse-glow mb-6">
            <Trophy className="w-12 h-12 text-accent mx-auto mb-3" />
            <p className="font-pixel text-lg text-accent mb-2">CORRECT!</p>
            <p className="text-muted-foreground">
              The number was <span className="text-foreground font-bold">{targetNumber}</span>
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              You got it in {attempts} {attempts === 1 ? "try" : "tries"}!
            </p>
            <Button onClick={resetGame} className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
              Play Again
            </Button>
          </div>
        ) : (
          <>
            {/* Feedback */}
            {feedback && (
              <div className={cn(
                "p-4 rounded-xl border-2 text-center mb-6 transition-all",
                feedback === "higher" 
                  ? "bg-card border-primary text-primary" 
                  : "bg-card border-secondary text-secondary"
              )}>
                <div className="flex items-center justify-center gap-2">
                  {feedback === "higher" ? (
                    <>
                      <ArrowUp className="w-5 h-5" />
                      <span className="font-pixel text-sm">GO HIGHER!</span>
                    </>
                  ) : (
                    <>
                      <ArrowDown className="w-5 h-5" />
                      <span className="font-pixel text-sm">GO LOWER!</span>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="flex gap-3 mb-6">
              <Input
                type="number"
                min="1"
                max="100"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGuess()}
                placeholder="Enter 1-100"
                className="text-center text-lg bg-card border-border focus:border-secondary"
              />
              <Button 
                onClick={handleGuess}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6"
              >
                Guess
              </Button>
            </div>

            {/* History */}
            {history.length > 0 && (
              <div className="p-4 rounded-xl bg-card border border-border">
                <p className="text-muted-foreground text-sm mb-2">Previous guesses:</p>
                <div className="flex flex-wrap gap-2">
                  {history.map((num, i) => (
                    <span
                      key={i}
                      className={cn(
                        "px-3 py-1 rounded-md text-sm font-mono",
                        num < targetNumber 
                          ? "bg-primary/20 text-primary" 
                          : "bg-secondary/20 text-secondary"
                      )}
                    >
                      {num}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
