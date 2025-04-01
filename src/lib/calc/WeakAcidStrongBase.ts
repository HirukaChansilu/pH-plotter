import { Acid, Base } from "../types";

export function calculatePHWeakAcidStrongBase(
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

  // Check if the limiting reagent is the base
  if ((acidMoles * acid.basicity) / base.acidity > baseMoles) {
    const excessAcidMoles =
      acidMoles - (baseMoles * base.acidity) / acid.basicity;
    const generatedSaltMoles = (baseMoles * base.acidity) / acid.basicity;

    const excessAcidConcentration = excessAcidMoles / totalVolume;
    const generatedSaltConcentration = generatedSaltMoles / totalVolume;

    // No base added (no salt generated)
    if (baseMoles === 0) {
      pH = -Math.log10(
        Math.sqrt((acid.Ka ? acid.Ka : 0) * excessAcidConcentration)
      );
    }
    // Acid added
    else {
      pH = -Math.log10(
        ((acid.Ka ? acid.Ka : 0) * excessAcidConcentration) /
          generatedSaltConcentration
      );
    }
  }
  // Check if the limiting reagent is the acid
  else if ((acidMoles * acid.basicity) / base.acidity < baseMoles) {
    const excessMoles = baseMoles - (acidMoles * acid.basicity) / base.acidity;
    const excessConcentration = excessMoles / totalVolume;

    const ionsByBase = excessConcentration * base.acidity;

    // Considering water dissociation
    if (considerWaterDissociation) {
      pH =
        14 + Math.log10((ionsByBase + Math.sqrt(ionsByBase ** 2 + 4 * kw)) / 2);
    }
    // Not considering water dissociation
    else {
      pH = 14 + Math.log10(ionsByBase);
    }
  }
  // When acid and base have same amount of moles
  else {
    const generatedSaltMoles = (baseMoles * base.acidity) / acid.basicity;

    const generatedSaltConcentration = generatedSaltMoles / totalVolume;

    pH =
      (pKW -
        Math.log10(acid.Ka ? acid.Ka : 0) +
        Math.log10(generatedSaltConcentration)) /
      2;
  }

  return Math.abs(Math.round(pH * 100) / 100);
}
