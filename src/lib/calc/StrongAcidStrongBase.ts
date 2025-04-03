import { Acid, Base } from "../types";

export function calculatePHStrongAcidStrongBase(
  acid: Acid,
  base: Base,
  kw: number
): number {
  const acidMoles = acid.concentration * acid.volume;
  const baseMoles = base.concentration * base.volume;

  const totalVolume = acid.volume + base.volume;

  let pH = 0;

  if ((acidMoles * acid.basicity) / base.acidity === baseMoles) {
    pH = 7;
  }
  // Check if the limiting reagent is the base
  else if ((acidMoles * acid.basicity) / base.acidity > baseMoles) {
    const excessMoles = acidMoles - (baseMoles * base.acidity) / acid.basicity;
    const excessConcentration = excessMoles / totalVolume;

    const ionsByAcid = excessConcentration * acid.basicity;

    pH = -Math.log10((ionsByAcid + Math.sqrt(ionsByAcid ** 2 + 4 * kw)) / 2);
  } else {
    const excessMoles = baseMoles - (acidMoles * acid.basicity) / base.acidity;
    const excessConcentration = excessMoles / totalVolume;

    const ionsByBase = excessConcentration * base.acidity;

    pH =
      14 + Math.log10((ionsByBase + Math.sqrt(ionsByBase ** 2 + 4 * kw)) / 2);
  }

  return Math.abs(Math.round(pH * 100) / 100);
}
