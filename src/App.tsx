import { useState } from "react";

import Menu from "./components/UI/Menu";

import { Pages } from "./lib/types";
import SelectionCardContainer from "./components/Cards/SelectionCard";
import SolutionDataCard from "./components/Cards/SolutionDataCard";
import GraphPanel from "./components/UI/GraphPanel";

function App() {
  const [page, setPage] = useState<Pages>("flask");
  const [showGraph, setShowGraph] = useState(false);

  return (
    <>
      <div className="w-screen h-screen bg-[#00070D] bg-radial-[at_90%_10%] from-white/[0.07] to-transparent py-5 flex flex-col gap-4">
        <div className="flex items-center justify-between px-5">
          <h1 className="font-semibold text-xl">pH Plotter</h1>

          <button
            className="rounded-full px-5 py-2 text-sm font-medium bg-white/10 cursor-pointer"
            onClick={() => setShowGraph((preVal) => !preVal)}
          >
            Graph <div className="material-symbols-rounded">chevron_right</div>
          </button>
        </div>

        <div className="px-5">
          <Menu page={page} setPage={setPage} />
        </div>

        <SelectionCardContainer page={page} setPage={setPage} />
        <SolutionDataCard page={page} />

        <GraphPanel showGraph={showGraph} setShowGraph={setShowGraph} />

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
