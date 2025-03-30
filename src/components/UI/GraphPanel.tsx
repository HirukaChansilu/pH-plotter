import { Dispatch, SetStateAction, useRef } from "react";
import Card from "./Card";
import { useSwipe } from "../../hooks/useSwipe";
import PlotElement from "./PlotElement";
import { calculatePHStrongAcidStrongBase } from "../../lib/calc/StrongAcidStrongBase";

export default function GraphPanel({
  showGraph,
  setShowGraph,
}: {
  showGraph: boolean;
  setShowGraph: Dispatch<SetStateAction<boolean>>;
}) {
  const swipeRef = useRef<HTMLDivElement>(null);

  useSwipe({
    element: swipeRef,
    direction: "vertical",
    onDown: () => {
      setShowGraph(false);
    },
  });

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

  return (
    <div
      className={`fixed bottom-0 right-0 left-0 h-full w-full flex flex-col justify-end items-center ${
        showGraph ? "pointer-events-auto" : "pointer-events-none"
      }`}
      onClick={() => {
        setShowGraph(false);
      }}
    >
      <Card
        className="w-full h-11/12 !py-0 !pb-3 !px-3 rounded-b-none rounded-t-2xl flex flex-col transition-transform duration-500 ease-in-out"
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={{
          transform: `translateY(${showGraph ? "0" : "100%"})`,
        }}
      >
        <div className="w-8 h-1 bg-white/40 rounded-full relative mx-auto my-3" />

        <div
          className="w-full flex gap-[0.3rem] h-fit relative mb-3"
          ref={swipeRef}
        >
          <Card className="w-full h-full !py-2 !px-2 !rounded-lg">
            <div className="w-full flex justify-between items-center">
              <div className="">
                <div className="text-sm font-medium leading-[1.1]">HCl</div>
              </div>
              <div className="text-xs text-white/80">Flask</div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-[0.7rem] text-white/60">Strong Acid</div>
              <div className="text-[0.7rem]">
                <span className="text-white/60">{"Basicity = "}</span>
                <span className="text-white/80 font-medium">1</span>
              </div>
            </div>

            <hr className="rounded opacity-10 my-1" />

            <div className="text-[0.7rem] leading-[1.2]">
              <span className="text-white/60">{"c = "}</span>
              <span className="text-white/80 font-medium">
                {0.00004}
                <span className="text-[0.65rem]">
                  &nbsp;mol&nbsp;dm
                  <span className="sup !text-[0.5rem]">-3</span>
                </span>
              </span>
            </div>

            <div className="text-[0.7rem] leading-[1.2]">
              <span className="text-white/60">{"v = "}</span>
              <span className="text-white/80 font-medium">
                {25}
                <span className="text-[0.65rem]">&nbsp;cm</span>
                <span className="sup !text-[0.5rem]">3</span>
              </span>
            </div>

            <div className="text-[0.7rem] leading-[1.2]">
              <span className="text-white/60">
                k<span className="sub !text-[0.6rem]">a</span>
                {" = "}
              </span>
              <span className="text-white/80 font-medium">
                {4}
                <span className="text-[0.65rem]">
                  &nbsp;mol&nbsp;dm
                  <span className="sup !text-[0.5rem]">-3</span>
                </span>
              </span>
            </div>
          </Card>

          <Card className="w-full h-full !py-2 !px-2 !rounded-lg">
            <div className="w-full flex justify-between items-center">
              <div className="">
                <div className="text-sm font-medium leading-[1.1]">NaOH</div>
              </div>
              <div className="text-xs text-white/80">Burette</div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-[0.7rem] text-white/60">Strong Base</div>
              <div className="text-[0.7rem]">
                <span className="text-white/60">{"Acidity = "}</span>
                <span className="text-white/80 font-medium">1</span>
              </div>
            </div>

            <hr className="rounded opacity-10 my-1" />

            <div className="text-[0.7rem] leading-[1.2]">
              <span className="text-white/60">{"c = "}</span>
              <span className="text-white/80 font-medium">
                {0.00004}
                <span className="text-[0.65rem]">
                  &nbsp;mol&nbsp;dm
                  <span className="sup !text-[0.5rem]">-3</span>
                </span>
              </span>
            </div>

            <div className="text-[0.7rem] leading-[1.2]">
              <span className="text-white/60">{"v = "}</span>
              <span className="text-white/80 font-medium">
                {25}
                <span className="text-[0.65rem]">&nbsp;cm</span>
                <span className="sup !text-[0.5rem]">3</span>
              </span>
            </div>

            <div className="text-[0.7rem] leading-[1.2]">
              <span className="text-white/60">
                k<span className="sub !text-[0.6rem]">b</span>
                {" = "}
              </span>
              <span className="text-white/80 font-medium">
                {4}
                <span className="text-[0.65rem]">
                  &nbsp;mol&nbsp;dm
                  <span className="sup !text-[0.5rem]">-3</span>
                </span>
              </span>
            </div>
          </Card>
        </div>

        <div className="w-full h-full relative overflow-x-scroll">
          <PlotElement
            data={plotData}
            className="absolute top-0 bottom-0 left-0 h-full aspect-[2/1]"
          />
        </div>
      </Card>
    </div>
  );
}
