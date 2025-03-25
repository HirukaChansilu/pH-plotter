import { Acid, Base } from "../types";

export function calculatePHStrongAcidStrongBase(
  acid: Acid,
  base: Base,
  kw: number,
  considerWaterDissociation: boolean = true
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

    //   Considering water dissociation
    if (considerWaterDissociation) {
      pH = -Math.log10((ionsByAcid + Math.sqrt(ionsByAcid ** 2 + 4 * kw)) / 2);
    }
    //   Not considering water dissociation
    else {
      pH = -Math.log10(ionsByAcid);
    }
  } else {
    const excessMoles = baseMoles - (acidMoles * acid.basicity) / base.acidity;
    const excessConcentration = excessMoles / totalVolume;

    const ionsByBase = excessConcentration * base.acidity;

    //   Considering water dissociation

    if (considerWaterDissociation) {
      pH =
        14 + Math.log10((ionsByBase + Math.sqrt(ionsByBase ** 2 + 4 * kw)) / 2);
    }

    //   Not considering water dissociation
    else {
      pH = 14 + Math.log10(ionsByBase);
    }
  }

  return Math.abs(Math.round(pH * 100) / 100);
}
