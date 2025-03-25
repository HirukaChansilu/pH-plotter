import { expect, test } from "vitest";
import { calculatePHStrongAcidStrongBase } from "../../lib/calc/StrongAcidStrongBase.ts";

// Extended automated testing with more edge cases
const testCases = [
  {
    acid: { label: "H₂SO₄", concentration: 1, basicity: 2, volume: 0.025 },
    base: { label: "NaOH", concentration: 1, acidity: 1, volume: 0.02 },
    expectedPH: 0.18,
  },
  {
    acid: { label: "H₃PO₄", concentration: 1, basicity: 3, volume: 0.03 },
    base: { label: "Ca(OH)₂", concentration: 1, acidity: 2, volume: 0.02 },
    expectedPH: 0,
  },
  {
    acid: { label: "HCl", concentration: 1, basicity: 1, volume: 0.025 },
    base: { label: "Ba(OH)₂", concentration: 1, acidity: 2, volume: 0.02 },
    expectedPH: 13.52,
  },
  {
    acid: { label: "HNO₃", concentration: 1, basicity: 1, volume: 0.03 },
    base: { label: "KOH", concentration: 1, acidity: 1, volume: 0.02 },
    expectedPH: 0.7,
  },
  {
    acid: { label: "H₂SO₄", concentration: 0.5, basicity: 2, volume: 0.04 },
    base: { label: "Ca(OH)₂", concentration: 1, acidity: 2, volume: 0.03 },
    expectedPH: 13.46,
  },
  {
    acid: { label: "HCl", concentration: 0.1, basicity: 1, volume: 0.05 },
    base: { label: "NaOH", concentration: 0.1, acidity: 1, volume: 0.05 },
    expectedPH: 7,
  },
  {
    acid: { label: "H₂SO₄", concentration: 2, basicity: 2, volume: 0.01 },
    base: { label: "KOH", concentration: 1, acidity: 1, volume: 0.03 },
    expectedPH: 0.6,
  },
  {
    acid: { label: "HNO₃", concentration: 0.05, basicity: 1, volume: 0.1 },
    base: { label: "Ca(OH)₂", concentration: 0.1, acidity: 2, volume: 0.02 },
    expectedPH: 2.08,
  },
];

// Run tests and log results
for (const { acid, base, expectedPH } of testCases) {
  const calculatedPH = calculatePHStrongAcidStrongBase(acid, base, 1e-14);

  test(`${acid.label} with ${base.label}`, () => {
    expect(calculatedPH).toBe(expectedPH);
  });
}
