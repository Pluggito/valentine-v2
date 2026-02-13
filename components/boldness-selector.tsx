"use client";

interface BoldnessSelectorProps {
  selectedBoldness: "safe" | "medium" | "unhinged" | null;
  onSelect: (value: "safe" | "medium" | "unhinged") => void;
  unhingedType?: "raw" | "fantasy" | null;
}

export default function BoldnessSelector({
  selectedBoldness,
  onSelect,
  unhingedType,
}: BoldnessSelectorProps) {
  const options: Array<{
    value: "safe" | "medium" | "unhinged";
    label: string;
    emoji: string;
  }> = [
    { value: "safe", label: "Safe", emoji: "😇" },
    { value: "medium", label: "Medium", emoji: "😌" },
    { value: "unhinged", label: "Unhinged", emoji: "🔥" },
  ];

  return (
    <div className="space-y-3 pt-4 border-t border-border/50">
      <div>
        <label className="text-foreground font-medium block mb-2">
          How bold should the message be?
        </label>
        <p className="text-xs text-muted-foreground mb-3">
          Choose your flavor of romance 🌹
        </p>
      </div>

      <div className="flex gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`flex-1 py-2 px-3 rounded-lg transition-all duration-200 text-sm font-medium flex items-center justify-center gap-1 border-2 ${
              selectedBoldness === option.value
                ? "border-primary bg-primary/10 text-primary"
                : "border-border/50 bg-background hover:border-primary/50"
            }`}
          >
            <span>{option.emoji}</span>
            <span>{option.label}</span>
            {selectedBoldness === option.value &&
              unhingedType &&
              option.value === "unhinged" && (
                <span className="text-xs ml-1">({unhingedType})</span>
              )}
          </button>
        ))}
      </div>
    </div>
  );
}
