import { calculatePHStrongAcidStrongBase } from "./calc/StrongAcidStrongBase";
import { WaterStrongAcid } from "./calc/Water";

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

function getPHValue(
  flask: Flask,
  burette: Burette,
  kw: number,
  buretteVolume: number
): number {
  // Strong Acid with Water

  if (flask.type === "water" && burette.type === "strong-acid") {
    return WaterStrongAcid(
      flask.volume || 0,
      { ...burette.content, volume: buretteVolume / 1000 } as Acid,
      kw
    );
  } else if (flask.type === "strong-acid" && burette.type === "water") {
    return WaterStrongAcid(
      buretteVolume,
      { ...flask.content, volume: (flask.volume || 0) / 1000 } as Acid,
      kw
    );
  } else {
    return 0;
  }

  // Strong Acid with Strong Base
}

export function getGraphData(flask: Flask, burette: Burette, kw: number) {
  if (
    !burette.volumePoints ||
    (flask.type !== "water" && !flask.content) ||
    (burette.type !== "water" && !burette.content)
  )
    return [];

  // // Acid with Water

  // if (flask.type === "water" && burette.type === "strong-acid") {
  //   return WaterStrongAcid(flask.volume || 0);
  // } else if (flask.type === "strong-acid" && burette.type === "water") {
  // }

  // // Strong Acid - Strong Base
  // if (
  //   (flask.type === "strong-acid" && burette.type === "strong-base") ||
  //   (flask.type === "strong-base" && burette.type === "strong-acid")
  // ) {
  //   return burette.volumePoints.map((volume) => {
  //     return [
  //       volume,
  //       flask.type === "strong-acid"
  //         ? calculatePHStrongAcidStrongBase(
  //             { ...flask.content, volume: (flask.volume || 0) / 1000 } as Acid,
  //             { ...burette.content, volume: volume / 1000 } as Base,
  //             kw,
  //             true
  //           )
  //         : calculatePHStrongAcidStrongBase(
  //             { ...burette.content, volume: volume / 1000 } as Acid,
  //             { ...flask.content, volume: (flask.volume || 0) / 1000 } as Base,
  //             kw,
  //             true
  //           ),
  //     ];
  //   });
  // }

  return burette.volumePoints.map((buretteVolume) => {
    return [buretteVolume, getPHValue(flask, burette, kw, buretteVolume)];
  });
}
