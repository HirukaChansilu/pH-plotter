import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { SolutionContext } from "../../context/SolutionContext";
import { SettingsContext } from "../../context/SettingsContext";
import { useSwipe } from "../../hooks/useSwipe";

import {
  getSolutionStrength,
  getSolutionType,
  getSolutionTypeName,
} from "../../lib/func";
import { Acid, Base } from "../../lib/types";
import { getGraphData } from "../../lib/calc/titrationManager";

import Card from "./Card";
import PlotElement from "./PlotElement";
import Table from "./Table";

export default function GraphPanel({
  showGraph,
  setShowGraph,
  disableSlide = false,
}: {
  showGraph: boolean;
  setShowGraph: Dispatch<SetStateAction<boolean>>;
  disableSlide?: boolean;
}) {
  const solutionContext = useContext(SolutionContext);
  const settingsContext = useContext(SettingsContext);

  const swipeRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<number[][]>([]);

  useEffect(() => {
    setData(
      getGraphData(
        solutionContext.flask,
        solutionContext.burette,
        settingsContext.settings
      ) || []
    );
  }, [solutionContext, settingsContext]);

  useSwipe({
    element: swipeRef,
    direction: "vertical",
    onDown: () => {
      setShowGraph(false);
    },
  });

  return (
    <div
      className={`fixed bottom-0 right-0 left-0 h-full w-full flex flex-col justify-end items-center xl:relative ${
        showGraph || disableSlide
          ? "pointer-events-auto"
          : "pointer-events-none"
      }`}
      onClick={() => {
        if (!disableSlide) setShowGraph(false);
      }}
    >
      <Card
        className="w-full h-11/12 !py-0 !pb-3 !px-3 rounded-b-none xl:rounded-b-2xl rounded-t-2xl flex flex-col transition-transform duration-500 ease-in-out relative"
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={{
          transform: `translateY(${showGraph || disableSlide ? "0" : "100%"})`,
        }}
      >
        <div className="w-8 h-1 bg-white/40 rounded-full relative mx-auto my-3 xl:hidden" />

        <div
          className="w-full flex gap-[0.4rem] h-fit relative mb-[0.4rem] xl:mt-3 xl:gap-3 xl:mb-3"
          ref={swipeRef}
        >
          <Card className="w-full h-full !py-2 !px-2 !rounded-lg">
            <div className="w-full flex justify-between items-center">
              <div className="">
                <div className="text-sm font-medium leading-[1.1]">
                  {solutionContext.flask.type === "water"
                    ? "Water"
                    : solutionContext.flask.content?.label || "-"}
                </div>
              </div>
              <div className="text-xs text-white/80">Flask</div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-[0.7rem] text-white/60">
                {solutionContext.flask.type === "water"
                  ? "H₂O"
                  : getSolutionTypeName(solutionContext.flask.type)}
              </div>
              <div className="text-[0.7rem]">
                <span className="text-white/60">
                  {solutionContext.flask.type === "water"
                    ? " "
                    : getSolutionType(solutionContext.flask.type) === "acid"
                    ? "Basicity = "
                    : getSolutionType(solutionContext.flask.type) === "base"
                    ? "Acidity = "
                    : "-"}
                </span>
                <span className="text-white/80 font-medium">
                  {getSolutionType(solutionContext.flask.type) === "acid"
                    ? (solutionContext.flask.content as Acid)?.basicity || "-"
                    : getSolutionType(solutionContext.flask.type) === "base"
                    ? (solutionContext.flask.content as Base)?.acidity || "-"
                    : ""}
                </span>
              </div>
            </div>

            <hr className="rounded opacity-10 my-1" />

            {solutionContext.flask.type !== "water" && (
              <div className="text-[0.7rem] leading-[1.2]">
                <span className="text-white/60">{"c = "}</span>
                <span className="text-white/80 font-medium">
                  {solutionContext.flask.content?.concentration || "-"}
                  <span className="text-[0.65rem]">
                    &nbsp;mol&nbsp;dm
                    <span className="sup !text-[0.5rem]">-3</span>
                  </span>
                </span>
              </div>
            )}

            <div className="text-[0.7rem] leading-[1.2]">
              <span className="text-white/60">{"v = "}</span>
              <span className="text-white/80 font-medium">
                {solutionContext.flask.volume || "-"}
                <span className="text-[0.65rem]">&nbsp;cm</span>
                <span className="sup !text-[0.5rem]">3</span>
              </span>
            </div>

            {getSolutionStrength(solutionContext.flask.type) === "weak" && (
              <div className="text-[0.7rem] leading-[1.2]">
                <span className="text-white/60">
                  k
                  <span className="sub !text-[0.6rem]">
                    {getSolutionType(solutionContext.flask.type) === "acid"
                      ? "a"
                      : "b"}
                  </span>
                  {" = "}
                </span>
                <span className="text-white/80 font-medium">
                  {getSolutionType(solutionContext.flask.type) === "acid"
                    ? (solutionContext.flask.content as Acid)?.Ka || "-"
                    : getSolutionType(solutionContext.flask.type) === "base"
                    ? (solutionContext.flask.content as Base)?.Kb || "-"
                    : "-"}
                  <span className="text-[0.65rem]">
                    &nbsp;mol&nbsp;dm
                    <span className="sup !text-[0.5rem]">-3</span>
                  </span>
                </span>
              </div>
            )}
          </Card>

          <Card className="w-full h-full !py-2 !px-2 !rounded-lg">
            <div className="w-full flex justify-between items-center">
              <div className="">
                <div className="text-sm font-medium leading-[1.1]">
                  {solutionContext.burette.type === "water"
                    ? "Water"
                    : solutionContext.burette.content?.label || "-"}
                </div>
              </div>
              <div className="text-xs text-white/80">Burette</div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-[0.7rem] text-white/60">
                {solutionContext.burette.type === "water"
                  ? "H₂O"
                  : getSolutionTypeName(solutionContext.burette.type)}
              </div>
              <div className="text-[0.7rem]">
                <span className="text-white/60">
                  {solutionContext.burette.type === "water"
                    ? " "
                    : getSolutionType(solutionContext.burette.type) === "acid"
                    ? "Basicity = "
                    : getSolutionType(solutionContext.burette.type) === "base"
                    ? "Acidity = "
                    : "-"}
                </span>
                <span className="text-white/80 font-medium">
                  {getSolutionType(solutionContext.burette.type) === "acid"
                    ? (solutionContext.burette.content as Acid)?.basicity || "-"
                    : getSolutionType(solutionContext.burette.type) === "base"
                    ? (solutionContext.burette.content as Base)?.acidity || "-"
                    : ""}
                </span>
              </div>
            </div>

            <hr className="rounded opacity-10 my-1" />

            {solutionContext.burette.type !== "water" && (
              <div className="text-[0.7rem] leading-[1.2]">
                <span className="text-white/60">{"c = "}</span>
                <span className="text-white/80 font-medium">
                  {solutionContext.burette.content?.concentration || "-"}
                  <span className="text-[0.65rem]">
                    &nbsp;mol&nbsp;dm
                    <span className="sup !text-[0.5rem]">-3</span>
                  </span>
                </span>
              </div>
            )}
          </Card>
        </div>

        <div className="w-full h-full flex flex-col lg:flex-row gap-1 relative">
          <Table
            data={data.length > 0 ? data : [[0, 0]]}
            className={`transition-all duration-500 ease-in-out ${
              data.length > 0 ? "opacity-100 blur-none" : "opacity-40 blur-xs"
            }`}
          />
          <div className="w-full h-full relative overflow-x-scroll flex gap-1 items-start justify-start">
            <PlotElement
              data={
                data.length > 0
                  ? data
                  : [
                      [0, 0],
                      [1, 1],
                      [2, 7],
                      [3, 8],
                      [4, 14],
                    ]
              }
              className={`absolute top-0 bottom-0 left-0 h-full aspect-[2/1] transition-all duration-500 ease-in-out ${
                data.length > 0 ? "opacity-100 blur-none" : "opacity-40 blur-xs"
              }`}
            />
          </div>

          <div
            className={`flex flex-col items-center justify-center absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out pointer-events-none ${
              data.length > 0 ? "opacity-0" : "opacity-80"
            }`}
          >
            <div className="material-symbols-rounded !text-3xl">timeline</div>
            <div className="text-center text-xs leading-3.5">
              Need to add more data to the flask <br />
              and burette to see the graph
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
