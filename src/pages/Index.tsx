import { useState } from "react";
import { GameCard } from "@/components/GameCard";
import { MemoryGame } from "@/components/games/MemoryGame";
import { GuessNumberGame } from "@/components/games/GuessNumberGame";
import { Grid3X3, Target, Gamepad2 } from "lucide-react";

type GameType = "menu" | "memory" | "guess";

const Index = () => {
  const [currentGame, setCurrentGame] = useState<GameType>("menu");

  if (currentGame === "memory") {
    return <MemoryGame onBack={() => setCurrentGame("menu")} />;
  }

  if (currentGame === "guess") {
    return <GuessNumberGame onBack={() => setCurrentGame("menu")} />;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Scanlines overlay */}
      <div className="fixed inset-0 pointer-events-none scanlines opacity-30" />
      
      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gamepad2 className="w-10 h-10 text-primary animate-float" />
          </div>
          <h1 className="font-pixel text-3xl md:text-4xl text-foreground mb-4">
            <span className="text-primary text-glow-cyan">ARCADE</span>{" "}
            <span className="text-secondary text-glow-pink">ZONE</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Choose your game and have fun!
          </p>
        </div>

        {/* Games Grid */}
        <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-6">
          <GameCard
            title="MEMORY"
            description="Match the pairs to win"
            icon={Grid3X3}
            onClick={() => setCurrentGame("memory")}
            variant="cyan"
          />
          <GameCard
            title="GUESS"
            description="Find the secret number"
            icon={Target}
            onClick={() => setCurrentGame("guess")}
            variant="pink"
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground text-sm">
            Press a card to start playing
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
