import { HTMLAttributes, useContext, useEffect, useRef } from "react";
import * as Plot from "@observablehq/plot";
import { SettingsContext } from "../../context/SettingsContext";

interface PlotElementProps extends HTMLAttributes<HTMLDivElement> {
  data: number[][];
}

export default function PlotElement({ data, ...props }: PlotElementProps) {
  const settingsContext = useContext(SettingsContext);

  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const plotLocal = Plot.plot({
      marks: [
        Plot.line(data, {
          curve: "monotone-x",
        }),
        Plot.dot(data),
        Plot.ruleY([0], { stroke: "black", strokeWidth: 1 }),
        Plot.ruleX([0], {
          stroke: "black",
          strokeWidth: 1,
        }),
      ],
      width: 1000,
      height: 500,
      style: {
        fontFamily: "Satoshi, Arial, sans-serif",
      },
      x: {
        label: `Volume ( ${
          settingsContext.settings.volumeUnit === "cm3" ? "cm³" : "dm³"
        } )`,
        labelAnchor: "right",
        labelOffset: 28,
        line: true,
      },
      y: {
        label: "pH",
        labelAnchor: "top",
        labelOffset: 28,
        line: true,
        domain: [0, 14],
      },
      grid: true,
    });

    (containerRef.current as HTMLDivElement).append(plotLocal);
    return () => plotLocal.remove();
  }, [containerRef, data, settingsContext.settings.volumeUnit]);

  return (
    <div
      ref={containerRef}
      {...props}
      className={`plot ${props.className}`}
    ></div>
  );
}
