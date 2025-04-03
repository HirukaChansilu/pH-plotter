import { Settings, Solutions } from "./types";

export function convertVolumeUnits(settings: Settings, volume: number) {
  if (settings.volumeUnit === "cm3") {
    return volume / 1000;
  }
  return volume;
}

export function getSolutionTypeName(type: Solutions | null) {
  switch (type) {
    case "strong-acid":
      return "Strong Acid";
    case "weak-acid":
      return "Weak Acid";
    case "strong-base":
      return "Strong Base";
    case "weak-base":
      return "Weak Base";
    case "water":
      return "Water";
    default:
      return "-";
  }
}

export function getSolutionType(type: Solutions | null) {
  switch (type) {
    case "strong-acid":
      return "acid";
    case "weak-acid":
      return "acid";
    case "strong-base":
      return "base";
    case "weak-base":
      return "base";
    default:
      return "";
  }
}

export function getSolutionStrength(type: Solutions | null) {
  switch (type) {
    case "strong-acid":
      return "strong";
    case "weak-acid":
      return "weak";
    case "strong-base":
      return "strong";
    case "weak-base":
      return "weak";
    default:
      return "";
  }
}
