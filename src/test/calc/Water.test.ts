import { describe, expect, test } from "vitest";
import { WaterStrongAcid } from "../../lib/calc/Water";

const kw = 1.0e-14; // Water ionization constant at 25°C

describe("WaterStrongAcid", () => {
  test("High concentration acid (1M HCl)", () => {
    const result = WaterStrongAcid(
      1,
      {
        basicity: 1,
        concentration: 1.0,
        volume: 0.1,
        label: "High concentration acid",
      },
      kw
    );
    expect(result).toBeCloseTo(0.0, 2);
  });

  test("Moderate concentration acid (0.01M HCl)", () => {
    const result = WaterStrongAcid(
      1,
      {
        basicity: 1,
        concentration: 0.01,
        volume: 0.1,
        label: "Moderate concentration acid",
      },
      kw
    );
    expect(result).toBeCloseTo(2.0, 2);
  });

  test("Low concentration acid (1 μM HCl)", () => {
    const result = WaterStrongAcid(
      1,
      {
        basicity: 1,
        concentration: 1.0e-6,
        volume: 0.1,
        label: "Low concentration acid",
      },
      kw
    );
    expect(result).toBeCloseTo(6.0, 2);
  });

  test("Very low concentration acid (10 nM HCl) where water autoionization matters", () => {
    const result = WaterStrongAcid(
      1,
      {
        basicity: 1,
        concentration: 1.0e-8,
        volume: 0.1,
        label: "Very low concentration acid",
      },
      kw
    );
    expect(result).toBeCloseTo(6.92, 2);
  });

  test("Pure water (no acid)", () => {
    const result = WaterStrongAcid(
      1,
      { basicity: 1, concentration: 0, volume: 0.1, label: "Pure water" },
      kw
    );
    expect(result).toBeCloseTo(7.0, 2);
  });
});
