import { useState } from "react";

import Menu from "./components/UI/Menu";

import { Pages } from "./lib/types";
import SelectionCardContainer from "./components/Cards/SelectionCard";
import SolutionDataCard from "./components/Cards/SolutionDataCard";

function App() {
  const [page, setPage] = useState<Pages>("flask");

  // const data = [
  //   0, 5, 10, 12.5, 15, 17.5, 20, 24, 24.9, 24.95, 24.99, 25, 25.01, 25.05,
  //   25.1, 26, 30, 35, 37.5, 40, 50,
  // ];

  // const acid = {
  //   label: "HCl",
  //   concentration: 1,
  //   basicity: 1,
  //   volume: 25 / 1000,
  // };

  // const base = {
  //   label: "NaOH",
  //   concentration: 1,
  //   acidity: 1,
  //   volume: 0,
  // };

  // const plotData = data.map((d) => [
  //   d,
  //   calculatePHStrongAcidStrongBase(acid, { ...base, volume: d / 1000 }, 1e-14),
  // ]);

  return (
    <>
      <div className="w-screen h-screen bg-[#00070D] bg-radial-[at_90%_10%] from-white/[0.07] to-transparent py-5 flex flex-col gap-4">
        <div className="flex items-center justify-between px-5">
          <h1 className="font-semibold text-xl">pH Plotter</h1>

          <button className="rounded-full px-5 py-2 text-sm font-medium bg-white/10 cursor-pointer">
            Graph <div className="material-symbols-rounded">chevron_right</div>
          </button>
        </div>

        <div className="px-5">
          <Menu page={page} setPage={setPage} />
        </div>

        <SelectionCardContainer page={page} setPage={setPage} />
        <SolutionDataCard page={page} />

        {/* <footer className="text-xs text-white/60 text-center">
          Developed by{" "}
          <a
            href="https://github.com/HirukaChansilu/"
            className="!text-white/70"
          >
            Hiruka Chansilu
          </a>
        </footer> */}
      </div>
    </>
  );
}

export default App;
