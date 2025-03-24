import { Acid, Base } from "../types";

const kw = 1e-14;

export function calculatePHStrongAcidStrongBase(acid: Acid, base: Base) {
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

    pH = -Math.log10((ionsByAcid + Math.sqrt(ionsByAcid ** 2 + 4 * kw)) / 2);
  } else {
    const excessMoles = baseMoles - (acidMoles * acid.basicity) / base.acidity;
    const excessConcentration = excessMoles / totalVolume;

    const ionsByBase = excessConcentration * base.acidity;

    //   Considering water dissociation

    pH =
      14 + Math.log10((ionsByBase + Math.sqrt(ionsByBase ** 2 + 4 * kw)) / 2);
  }

  return Math.round(pH * 100) / 100;
}

// // Extended automated testing with more edge cases
// const testCases = [
//   {
//     acid: { label: "H₂SO₄", concentration: 1, basicity: 2, volume: 0.025 },
//     base: { label: "NaOH", concentration: 1, acidity: 1, volume: 0.02 },
//     expectedPH: 0.18,
//   },
//   {
//     acid: { label: "H₃PO₄", concentration: 1, basicity: 3, volume: 0.03 },
//     base: { label: "Ca(OH)₂", concentration: 1, acidity: 2, volume: 0.02 },
//     expectedPH: 0,
//   },
//   {
//     acid: { label: "HCl", concentration: 1, basicity: 1, volume: 0.025 },
//     base: { label: "Ba(OH)₂", concentration: 1, acidity: 2, volume: 0.02 },
//     expectedPH: 13.52,
//   },
//   {
//     acid: { label: "HNO₃", concentration: 1, basicity: 1, volume: 0.03 },
//     base: { label: "KOH", concentration: 1, acidity: 1, volume: 0.02 },
//     expectedPH: 0.7,
//   },
//   {
//     acid: { label: "H₂SO₄", concentration: 0.5, basicity: 2, volume: 0.04 },
//     base: { label: "Ca(OH)₂", concentration: 1, acidity: 2, volume: 0.03 },
//     expectedPH: 13.46,
//   },
//   {
//     acid: { label: "HCl", concentration: 0.1, basicity: 1, volume: 0.05 },
//     base: { label: "NaOH", concentration: 0.1, acidity: 1, volume: 0.05 },
//     expectedPH: 7,
//   },
//   {
//     acid: { label: "H₂SO₄", concentration: 2, basicity: 2, volume: 0.01 },
//     base: { label: "KOH", concentration: 1, acidity: 1, volume: 0.03 },
//     expectedPH: 0.6,
//   },
//   {
//     acid: { label: "HNO₃", concentration: 0.05, basicity: 1, volume: 0.1 },
//     base: { label: "Ca(OH)₂", concentration: 0.1, acidity: 2, volume: 0.02 },
//     expectedPH: 2.08,
//   },
// ];

// // Run tests and log results
// for (const { acid, base, expectedPH } of testCases) {
//   const calculatedPH = calculatePHStrongAcidStrongBase(acid, base);
//   //   console.log(
//   //     `Testing ${acid.label} (${acid.volume}L, ${acid.concentration}M) with ${base.label} (${base.volume}L, ${base.concentration}M)`
//   //   );
//   console.log(`Calculated pH: ${calculatedPH}, Expected pH: ${expectedPH}\n`);
// }
