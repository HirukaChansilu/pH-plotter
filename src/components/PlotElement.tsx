import { useEffect, useRef } from "react";
import * as Plot from "@observablehq/plot";

export default function PlotElement({ data }: { data: number[][] }) {
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
    });

    (containerRef.current as HTMLDivElement).append(plotLocal);
    return () => plotLocal.remove();
  }, [containerRef, data]);

  return <div ref={containerRef}></div>;
}
