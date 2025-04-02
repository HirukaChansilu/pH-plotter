import { Acid } from "../types";

export function WaterStrongAcid(
  volume: number,
  acid: Acid,
  kw: number
): number {
  const h30PlusByAcid =
    (acid.basicity * acid.concentration * acid.volume) / (volume + acid.volume);

  const pH = -Math.log10(
    (h30PlusByAcid + Math.sqrt(h30PlusByAcid ** 2 + 4 * kw)) / 2
  );

  console.log("Acid Contribution: ", h30PlusByAcid);
  console.log(
    "Kw Contribution: ",
    (Math.sqrt(h30PlusByAcid ** 2 + 4 * kw) - h30PlusByAcid) / 2
  );
  console.log(
    "Final H3O+ Concentration: ",
    (h30PlusByAcid + Math.sqrt(h30PlusByAcid ** 2 + 4 * kw)) / 2
  );
  console.log("pH: ", pH);

  return Math.abs(Math.round(pH * 100) / 100);
}
