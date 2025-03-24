import Plot from "./components/PlotElement";
import { calculatePHStrongAcidStrongBase } from "./lib/calc/StrongAcidStrongBase";

function App() {
  const data = [
    0, 5, 12.5, 15, 20, 24, 24.9, 24.95, 24.99, 25, 25.01, 25.05, 25.1, 26, 30,
    35, 37.5, 40, 50,
  ];

  const acid = {
    label: "HCl",
    concentration: 1,
    basicity: 1,
    volume: 25 / 1000,
  };

  const base = {
    label: "NaOH",
    concentration: 1,
    acidity: 1,
    volume: 0,
  };

  const plotData = data.map((d) => [
    d,
    calculatePHStrongAcidStrongBase(acid, { ...base, volume: d / 1000 }),
  ]);

  return (
    <div className="w-full h-full">
      <Plot data={plotData} />
    </div>
  );
}

export default App;
