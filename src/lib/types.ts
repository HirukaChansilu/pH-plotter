export type Pages = "flask" | "burette";

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
  type: "acid" | "base";
  content: Acid | Base;
  volume: number;
}

export interface Burette {
  type: "acid" | "base";
  content: Acid | Base;
  volume: number;
}
