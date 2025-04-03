import { convertVolumeUnits } from "../func";
import { Acid, Base, Burette, Flask, Settings } from "../types";
import { calculatePHStrongAcidStrongBase } from "./StrongAcidStrongBase";
import { WaterStrongAcid, WaterStrongBase } from "./Water";

function getPHValue(
  flask: Flask,
  burette: Burette,
  buretteVolume: number,
  settings: Settings
): number {
  const buretteVolumeConverted = convertVolumeUnits(settings, buretteVolume);
  const flaskVolumeConverted = convertVolumeUnits(settings, flask.volume || 0);

  // Strong Acid with Water

  if (flask.type === "water" && burette.type === "strong-acid") {
    return WaterStrongAcid(
      flaskVolumeConverted,
      {
        ...burette.content,
        volume: buretteVolumeConverted,
      } as Acid,
      settings.kw
    );
  } else if (flask.type === "strong-acid" && burette.type === "water") {
    return WaterStrongAcid(
      buretteVolumeConverted,
      {
        ...flask.content,
        volume: flaskVolumeConverted,
      } as Acid,
      settings.kw
    );
  }
  // Strong Base with Water

  if (flask.type === "water" && burette.type === "strong-base") {
    return WaterStrongBase(
      flaskVolumeConverted,
      {
        ...burette.content,
        volume: buretteVolumeConverted,
      } as Acid,
      settings.kw
    );
  } else if (flask.type === "strong-base" && burette.type === "water") {
    return WaterStrongBase(
      buretteVolumeConverted,
      {
        ...flask.content,
        volume: flaskVolumeConverted,
      } as Acid,
      settings.kw
    );
  }

  // Strong Acid with Strong Base

  if (
    (flask.type === "strong-acid" && burette.type === "strong-base") ||
    (flask.type === "strong-base" && burette.type === "strong-acid")
  ) {
    return flask.type === "strong-acid"
      ? calculatePHStrongAcidStrongBase(
          { ...flask.content, volume: flaskVolumeConverted } as Acid,
          { ...burette.content, volume: buretteVolumeConverted } as Base,
          settings.kw
        )
      : calculatePHStrongAcidStrongBase(
          { ...burette.content, volume: buretteVolumeConverted } as Acid,
          { ...flask.content, volume: flaskVolumeConverted } as Base,
          settings.kw
        );
  }

  return 0;
}

export function getGraphData(
  flask: Flask,
  burette: Burette,
  settings: Settings
) {
  if (
    !burette.volumePoints ||
    (flask.type !== "water" && !flask.content) ||
    (burette.type !== "water" && !burette.content)
  )
    return [];

  return burette.volumePoints.map((buretteVolume) => {
    return [buretteVolume, getPHValue(flask, burette, buretteVolume, settings)];
  });
}
