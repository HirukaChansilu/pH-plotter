import { HTMLAttributes, useEffect, useRef } from "react";
import * as Plot from "@observablehq/plot";

interface PlotElementProps extends HTMLAttributes<HTMLDivElement> {
  data: number[][];
}

export default function PlotElement({ data, ...props }: PlotElementProps) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const plotLocal = Plot.plot({
      marks: [
        Plot.line(data, {
          curve: "catmull-rom",
        }),
        Plot.dot(data),
      ],
      width: 1000,
      height: 500,
    });

    (containerRef.current as HTMLDivElement).append(plotLocal);
    return () => plotLocal.remove();
  }, [containerRef, data]);

  return (
    <div
      ref={containerRef}
      {...props}
      className={`plot ${props.className}`}
    ></div>
  );
}
