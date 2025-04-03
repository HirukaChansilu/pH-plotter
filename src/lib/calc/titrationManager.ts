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
  if (!flask.volume) return 0;

  // Water - Water Fallback

  if (flask.type === "water" && burette.type === "water") {
    const pH = -Math.log10(Math.sqrt(settings.kw));

    return Math.abs(Math.round(pH * 100) / 100);
  }

  // Strong Acid with Water

  if (flask.type === "water" && burette.type === "strong-acid") {
    return WaterStrongAcid(
      flask.volume,
      {
        ...burette.content,
        volume: buretteVolume,
      } as Acid,
      settings.kw
    );
  } else if (flask.type === "strong-acid" && burette.type === "water") {
    return WaterStrongAcid(
      buretteVolume,
      {
        ...flask.content,
        volume: flask.volume,
      } as Acid,
      settings.kw
    );
  }
  // Strong Base with Water

  if (flask.type === "water" && burette.type === "strong-base") {
    return WaterStrongBase(
      flask.volume,
      {
        ...burette.content,
        volume: buretteVolume,
      } as Acid,
      settings.kw
    );
  } else if (flask.type === "strong-base" && burette.type === "water") {
    return WaterStrongBase(
      buretteVolume,
      {
        ...flask.content,
        volume: flask.volume,
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
          { ...flask.content, volume: flask.volume } as Acid,
          { ...burette.content, volume: buretteVolume } as Base,
          settings.kw
        )
      : calculatePHStrongAcidStrongBase(
          { ...burette.content, volume: buretteVolume } as Acid,
          { ...flask.content, volume: flask.volume } as Base,
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
    const buretteVolumeConverted = convertVolumeUnits(settings, buretteVolume);
    const flaskVolumeConverted = convertVolumeUnits(
      settings,
      flask.volume || 0
    );

    return [
      buretteVolume,
      getPHValue(
        { ...flask, volume: flaskVolumeConverted },
        burette,
        buretteVolumeConverted,
        settings
      ),
    ];
  });
}
