import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { SolutionContext } from "../../context/SolutionContext";
import { Acid, Base, Pages } from "../../lib/types";

import Card from "../UI/Card";
import InputField, { NumberArrayInputField } from "../UI/InputField";
import { getSolutionTypeName } from "../../lib/func";

export default function SolutionDataCard({
  page,
  className,
}: {
  page: Pages;
  className?: string;
}) {
  const solutionContext = useContext(SolutionContext);

  const [solution, setSolution] = useState<
    Partial<Acid> | Partial<Base> | null
  >(solutionContext[page].content);

  const [volumePoints, setVolumePoints] = useState<number | number[] | null>(
    page === "flask"
      ? solutionContext.flask.volume
      : solutionContext.burette.volumePoints
  );

  useEffect(() => {
    if (!solution) return;

    if (page === "flask") {
      solutionContext.setFlask({
        ...solutionContext.flask,
        content: {
          ...solutionContext.flask.content,
          ...solution,
        } as Acid | Base,
      });
    }

    if (page === "burette") {
      solutionContext.setBurette({
        ...solutionContext.burette,
        content: {
          ...solutionContext.burette.content,
          ...solution,
        } as Acid | Base,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solution]);

  useEffect(() => {
    setSolution(solutionContext[page].content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, solutionContext[page].type]);

  useEffect(() => {
    if (!volumePoints) return;

    if (page === "flask") {
      solutionContext.setFlask({
        ...solutionContext.flask,
        volume: volumePoints as number,
      });
    }

    if (page === "burette") {
      solutionContext.setBurette({
        ...solutionContext.burette,
        volumePoints: volumePoints as number[],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volumePoints]);

  useEffect(() => {
    setVolumePoints(
      page === "flask"
        ? solutionContext.flask.volume
        : solutionContext.burette.volumePoints
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className={`px-5 md:px-0 xl:px-5 flex-auto ${className}`}>
      <Card className="h-full !py-3 flex flex-col relative">
        <div
          className={`flex flex-col items-center justify-center absolute inset-0 w-full h-full transition-opacity ${
            solutionContext[page].type ? "opacity-0" : "opacity-60"
          }`}
        >
          <div className="material-symbols-rounded !text-3xl">experiment</div>
          <div className="text-center text-xs leading-3.5">
            Select the type of solution <br />
            in the {page.charAt(0).toUpperCase() + page.slice(1)}
          </div>
        </div>

        <div
          className={`w-full h-full transition-opacity flex flex-col justify-start ${
            solutionContext[page].type ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="text-lg font-medium">
            {getSolutionTypeName(solutionContext[page].type)}
          </div>

          <hr className="rounded opacity-10 my-1" />

          <div className="flex flex-col gap-1 h-full">
            {solutionContext[page].type !== "water" && (
              <InputField<string>
                value={solution?.label || ""}
                setValue={(value: string) =>
                  setSolution((preVal) => {
                    return { ...preVal, label: value } as Acid | Base;
                  })
                }
                label="Label"
                placeholder="Enter the name of the solution"
                type="text"
              />
            )}

            {solutionContext[page].type === "weak-acid" && (
              <InputField<number>
                value={(solution as Acid)?.Ka || ""}
                setValue={(value: number) =>
                  setSolution((preVal) => {
                    return { ...preVal, Ka: value } as Acid;
                  })
                }
                label="Ka"
                placeholder="Enter the Ka value"
                type="number"
              />
            )}

            {solutionContext[page].type === "weak-base" && (
              <InputField<number>
                value={(solution as Base)?.Kb || ""}
                setValue={(value: number) =>
                  setSolution((preVal) => {
                    return { ...preVal, Kb: value } as Base;
                  })
                }
                label="Kb"
                placeholder="Enter the Kb value"
                type="number"
              />
            )}
            {solutionContext[page].type !== "water" && (
              <InputField<number>
                value={solution?.concentration || ""}
                setValue={(value: number) => {
                  setSolution((preVal) => {
                    return { ...preVal, concentration: value } as Acid | Base;
                  });
                }}
                label="Concentration ( mol dm⁻³ )"
                placeholder={"Enter the concentration"}
                type="number"
              />
            )}

            {(solutionContext[page].type === "strong-acid" ||
              solutionContext[page].type === "weak-acid") && (
              <InputField<number>
                value={(solution as Acid)?.basicity || ""}
                setValue={(value: number) =>
                  setSolution((preVal) => {
                    return { ...preVal, basicity: value } as Acid;
                  })
                }
                label="Basicity"
                placeholder="Enter the basicity of the acid"
                type="number"
              />
            )}

            {(solutionContext[page].type === "strong-base" ||
              solutionContext[page].type === "weak-base") && (
              <InputField<number>
                value={(solution as Base)?.acidity || ""}
                setValue={(value: number) =>
                  setSolution((preVal) => {
                    return { ...preVal, acidity: value } as Base;
                  })
                }
                label="Acidity"
                placeholder="Enter the acidity of the base"
                type="number"
              />
            )}

            {page === "flask" && (
              <InputField<number>
                value={(volumePoints as number) || ""}
                setValue={setVolumePoints}
                label="Volume ( cm³ )"
                placeholder="Enter the volume"
                type="number"
              />
            )}

            {page === "burette" && (
              <NumberArrayInputField
                numbers={(volumePoints || []) as number[]}
                setNumbers={
                  setVolumePoints as Dispatch<SetStateAction<number[]>>
                }
                label="Volume Points ( cm³ )"
                placeholder="Enter the volume points"
              />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
