import { calculatePHStrongAcidStrongBase } from "./calc/StrongAcidStrongBase";

import { Acid, Base, Burette, Flask, Solutions } from "./types";

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

export function getGraphData(flask: Flask, burette: Burette, kw: number) {
  if (!burette.volumePoints || !flask.content || !burette.content) return [];

  // Strong Acid - Strong Base
  if (
    (flask.type === "strong-acid" && burette.type === "strong-base") ||
    (flask.type === "strong-base" && burette.type === "strong-acid")
  ) {
    return burette.volumePoints.map((volume) => {
      return [
        volume,
        flask.type === "strong-acid"
          ? calculatePHStrongAcidStrongBase(
              { ...flask.content, volume: (flask.volume || 0) / 1000 } as Acid,
              { ...burette.content, volume: volume / 1000 } as Base,
              kw,
              true
            )
          : calculatePHStrongAcidStrongBase(
              { ...burette.content, volume: volume / 1000 } as Acid,
              { ...flask.content, volume: (flask.volume || 0) / 1000 } as Base,
              kw,
              true
            ),
      ];
    });
  }
}
