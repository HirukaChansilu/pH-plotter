export type Pages = "flask" | "burette";

export interface Acid {
  label: string;
  pKa?: number;
  concentration: number;
  basicity: number;
  volume: number;
}

export interface Base {
  label: string;
  pKb?: number;
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
