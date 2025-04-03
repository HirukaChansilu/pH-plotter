import { Acid } from "../types";

export function WaterStrongAcid(
  volume: number,
  acid: Acid,
  kw: number
): number {
  // Calculate total moles of H+ from the acid
  const molesHPlus = acid.concentration * acid.basicity * acid.volume;

  // Calculate final volume after mixing
  const finalVolume = volume + acid.volume;

  // Calculate final H+ concentration
  const hPlusConcentration = molesHPlus / finalVolume;

  const pH = -Math.log10(
    (hPlusConcentration + Math.sqrt(hPlusConcentration ** 2 + 4 * kw)) / 2
  );

  return Math.abs(Math.round(pH * 100) / 100);
}

export function WaterStrongBase(
  volume: number,
  base: Acid,
  kw: number
): number {
  // Calculate total moles of OH- from the base
  const molesOHMinus = base.concentration * base.basicity * base.volume;

  // Calculate final volume after mixing
  const finalVolume = volume + base.volume;

  // Calculate final OH- concentration
  const ohMinusConcentration = molesOHMinus / finalVolume;

  const pOH = -Math.log10(
    (ohMinusConcentration + Math.sqrt(ohMinusConcentration ** 2 + 4 * kw)) / 2
  );

  return Math.abs(Math.round((14 - pOH) * 100) / 100);
}
