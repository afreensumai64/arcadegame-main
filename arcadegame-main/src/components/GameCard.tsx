import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface GameCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  variant?: "cyan" | "pink" | "purple";
}

const variantStyles = {
  cyan: "border-primary hover:box-glow-cyan hover:border-primary",
  pink: "border-secondary hover:box-glow-pink hover:border-secondary",
  purple: "border-[hsl(var(--neon-purple))] hover:box-glow-purple",
};

const iconStyles = {
  cyan: "text-primary",
  pink: "text-secondary",
  purple: "text-[hsl(var(--neon-purple))]",
};

export function GameCard({ title, description, icon: Icon, onClick, variant = "cyan" }: GameCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative w-full p-6 rounded-xl bg-card border-2 transition-all duration-300",
        "hover:scale-105 hover:-translate-y-1",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
        variantStyles[variant]
      )}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <div className={cn(
          "p-4 rounded-lg bg-muted transition-transform duration-300 group-hover:scale-110",
          iconStyles[variant]
        )}>
          <Icon className="w-8 h-8" />
        </div>
        <div>
          <h3 className="font-pixel text-sm mb-2 text-foreground">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
    </button>
  );
}
