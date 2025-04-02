export interface Settings {
  kw: number;
  concentrationUnit: "moldm-3";
  volumeUnit: "cm3" | "dm3";
}

export type Pages = "flask" | "burette";

export type Solutions =
  | "strong-acid"
  | "weak-acid"
  | "strong-base"
  | "weak-base"
  | "water";

export interface Acid {
  label: string;
  Ka?: number;
  concentration: number;
  basicity: number;
  volume: number;
}

export interface Base {
  label: string;
  Kb?: number;
  concentration: number;
  acidity: number;
  volume: number;
}

export interface Flask {
  type: Solutions | null;
  content: Acid | Base | null;
  volume: number | null;
}

export interface Burette {
  type: Solutions | null;
  content: Acid | Base | null;
  volumePoints: number[] | null;
}
