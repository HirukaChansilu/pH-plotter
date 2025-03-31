import { useState } from "react";

import { Pages } from "./lib/types";

import Menu from "./components/UI/Menu";
import SelectionCardContainer, {
  SelectionCard,
} from "./components/Cards/SelectionCard";
import SolutionDataCard from "./components/Cards/SolutionDataCard";
import GraphPanel from "./components/UI/GraphPanel";

function App() {
  const [page, setPage] = useState<Pages>("flask");
  const [showGraph, setShowGraph] = useState(false);

  return (
    <div className="w-screen h-screen bg-[#00070D] bg-radial-[at_90%_10%] from-white/[0.07] to-transparent xl:grid grid-cols-4">
      <div className="w-full h-full py-5 flex flex-col gap-4">
        <div className="flex items-center justify-between px-5">
          <h1 className="font-semibold text-xl">pH Plotter</h1>

          <button
            className="rounded-full px-5 py-2 text-sm font-medium bg-white/10 cursor-pointer xl:hidden"
            onClick={() => setShowGraph((preVal) => !preVal)}
          >
            Graph <div className="material-symbols-rounded">chevron_right</div>
          </button>
        </div>

        <div className="px-5 md:hidden xl:block">
          <Menu page={page} setPage={setPage} />
        </div>

        <SelectionCardContainer page={page} setPage={setPage} />
        <SolutionDataCard page={page} className="md:hidden xl:block" />

        <div className="hidden md:grid xl:hidden grid-cols-2 gap-4 px-5 h-full">
          <div className="flex flex-col gap-4 h-full">
            <SelectionCard page={"flask"} />
            <SolutionDataCard page={"flask"} />
          </div>

          <div className="flex flex-col gap-4 h-full">
            <SelectionCard page={"burette"} />
            <SolutionDataCard page={"burette"} />
          </div>
        </div>

        <div className="xl:hidden">
          <GraphPanel showGraph={showGraph} setShowGraph={setShowGraph} />
        </div>

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

      <div className="hidden xl:block w-full h-full pb-5 pr-5 col-span-3">
        <GraphPanel
          showGraph={showGraph}
          setShowGraph={setShowGraph}
          disableSlide
        />
      </div>
    </div>
  );
}

export default App;
