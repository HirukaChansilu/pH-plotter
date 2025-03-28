import { useState } from "react";
import mesh from "./assets/mesh.png";
import arrowLeft from "./assets/arrow_left.svg";

import InfoPanel from "./components/Block/InfoPanel";
import Biuret from "./components/Block/Biuret";
import Flask from "./components/Block/Flask";
import Graph from "./components/Block/Graph";
import { calculatePHStrongAcidStrongBase } from "./lib/calc/StrongAcidStrongBase";
import PlotElement from "./components/UI/PlotElement";

function App() {
  const data = [
    0, 5, 10, 12.5, 15, 17.5, 20, 24, 24.9, 24.95, 24.99, 25, 25.01, 25.05,
    25.1, 26, 30, 35, 37.5, 40, 50,
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
    calculatePHStrongAcidStrongBase(acid, { ...base, volume: d / 1000 }, 1e-14),
  ]);

  const [showGraph, setShowGraph] = useState(false);

  return (
    <>
      <div
        className="w-screen h-screen bg-[#0a0a0a] bg-cover bg-center bg-no-repeat z-10 bg-blend-overlay grid grid-cols-4 2xl:grid-cols-5 gap-6 py-5 pl-6 pr-6 lg:pr-0 overflow-hidden"
        style={{ backgroundImage: `url(${mesh})` }}
      >
        <InfoPanel />

        <div
          className={`fixed top-0 bottom-0 left-0 w-[30%] z-40 bg-gradient-to-r from-[#0a0a0aa1] to-transparent transition-opacity ease-in-out duration-300 ${
            showGraph ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="fixed top-0 bottom-0 right-0 h-full flex flex-col justify-center items-center z-50">
          <button
            className="bg-white/10 mr-6 py-3 px-1 rounded-lg cursor-pointer"
            onClick={() => {
              setShowGraph((preValue) => !preValue);
            }}
          >
            <img
              src={arrowLeft}
              alt="Toggle Graph"
              className={`w-6 h-6 transition-transform ease-in-out duration-300 transform ${
                showGraph ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>

        <div className="relative w-full h-full col-span-3 2xl:col-span-4">
          <div
            className="absolute top-0 bottom-0 left-0 h-full w-[150%] grid grid-cols-4 2xl:grid-cols-5 gap-5 transition-transform ease-in-out pr-6 duration-700"
            style={{
              transform: `translateX(${
                showGraph ? "-33.333333333333333333%" : "0%"
              })`,
            }}
          >
            <PlotElement data={plotData} />;
            <Biuret />
            <Flask />
            <Graph />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
