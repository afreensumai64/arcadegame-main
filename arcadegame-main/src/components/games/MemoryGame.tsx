import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const EMOJIS = ["🎮", "🕹️", "👾", "🎲", "🎯", "🏆", "⭐", "🔥"];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryGameProps {
  onBack: () => void;
}

export function MemoryGame({ onBack }: MemoryGameProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const initializeGame = () => {
    const shuffledCards = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setIsWon(false);
    setIsLocked(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (id: number) => {
    if (isLocked) return;
    if (flippedCards.length === 2) return;
    if (cards[id].isFlipped || cards[id].isMatched) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      setIsLocked(true);

      const [first, second] = newFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        setTimeout(() => {
          const matched = [...cards];
          matched[first].isMatched = true;
          matched[second].isMatched = true;
          setCards(matched);
          setFlippedCards([]);
          setIsLocked(false);

          if (matched.every(c => c.isMatched)) {
            setIsWon(true);
          }
        }, 500);
      } else {
        setTimeout(() => {
          const reset = [...cards];
          reset[first].isFlipped = false;
          reset[second].isFlipped = false;
          setCards(reset);
          setFlippedCards([]);
          setIsLocked(false);
        }, 1000);
      }
    }
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
            onClick={initializeGame}
            className="text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Title */}
        <h1 className="font-pixel text-xl text-center text-primary text-glow-cyan mb-2">
          MEMORY
        </h1>
        <p className="text-center text-muted-foreground mb-6">
          Moves: <span className="text-accent font-bold">{moves}</span>
        </p>

        {/* Win Message */}
        {isWon && (
          <div className="mb-6 p-4 rounded-xl bg-card border-2 border-accent box-glow-cyan text-center animate-pulse-glow">
            <Trophy className="w-8 h-8 text-accent mx-auto mb-2" />
            <p className="font-pixel text-sm text-accent">YOU WIN!</p>
            <p className="text-muted-foreground text-sm mt-1">
              Completed in {moves} moves
            </p>
          </div>
        )}

        {/* Game Grid */}
        <div className="grid grid-cols-4 gap-3">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={card.isFlipped || card.isMatched || isLocked}
              className={cn(
                "aspect-square rounded-lg text-3xl flex items-center justify-center",
                "transition-all duration-300 transform",
                card.isFlipped || card.isMatched
                  ? "bg-card border-2 border-primary rotate-0 scale-100"
                  : "bg-muted border-2 border-border hover:border-primary hover:scale-105",
                card.isMatched && "border-accent box-glow-cyan opacity-80"
              )}
            >
              {(card.isFlipped || card.isMatched) ? card.emoji : "?"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
