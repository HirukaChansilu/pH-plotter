import { Acid, Base } from "../types";

export function calculatePHStrongAcidWeakBase(
  acid: Acid,
  base: Base,
  kw: number,
  considerWaterDissociation: boolean = true
): number {
  const acidMoles = acid.concentration * acid.volume;
  const baseMoles = base.concentration * base.volume;

  const totalVolume = acid.volume + base.volume;

  let pH = 0;
  const pKW = -Math.log10(kw);

  // Check if the limiting reagent is the acid
  if ((baseMoles * base.acidity) / acid.basicity > acidMoles) {
    const excessBaseMoles =
      baseMoles - (acidMoles * acid.basicity) / base.acidity;
    const generatedSaltMoles = (acidMoles * acid.basicity) / base.acidity;

    const excessBaseConcentration = excessBaseMoles / totalVolume;
    const generatedSaltConcentration = generatedSaltMoles / totalVolume;

    // No acid added (no salt generated)
    if (acidMoles === 0) {
      pH =
        pKW +
        Math.log10(
          Math.sqrt((base.Kb ? base.Kb : 0) * excessBaseConcentration)
        );
    }
    // Acid added
    else {
      pH =
        pKW +
        Math.log10(
          ((base.Kb ? base.Kb : 0) * excessBaseConcentration) /
            generatedSaltConcentration
        );
    }
  }
  // Check if the limiting reagent is the base
  else if ((baseMoles * base.acidity) / acid.basicity < acidMoles) {
    const excessMoles = acidMoles - (baseMoles * base.acidity) / acid.basicity;
    const excessConcentration = excessMoles / totalVolume;

    const ionsByAcid = excessConcentration * acid.basicity;

    // Considering water dissociation
    if (considerWaterDissociation) {
      pH = -Math.log10((ionsByAcid + Math.sqrt(ionsByAcid ** 2 + 4 * kw)) / 2);
    }
    // Not considering water dissociation
    else {
      pH = -Math.log10(ionsByAcid);
    }
  }
  // When acid and base have same amount of moles
  else {
    const generatedSaltMoles = (acidMoles * acid.basicity) / base.acidity;

    const generatedSaltConcentration = generatedSaltMoles / totalVolume;

    pH =
      (pKW -
        Math.log10(generatedSaltConcentration) +
        Math.log10(base.Kb ? base.Kb : 0)) /
      2;
  }

  return Math.abs(Math.round(pH * 100) / 100);
}
