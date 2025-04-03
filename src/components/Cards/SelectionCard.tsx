import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { SolutionContext } from "../../context/SolutionContext";
import { useSwipe } from "../../hooks/useSwipe";

import { Pages, Solutions } from "../../lib/types";

import Card from "../UI/Card";
import Dropdown from "../UI/Dropdown";

export function SelectionCard({ page }: { page: Pages }) {
  const solutionContext = useContext(SolutionContext);

  const [value, setValue] = useState<Solutions | null>(
    page === "flask" ? solutionContext.flask.type : solutionContext.burette.type
  );

  useEffect(() => {
    if (!value) return;

    if (page === "flask") {
      solutionContext.setFlask({
        type: value,
      });
    } else if (page === "burette") {
      solutionContext.setBurette({
        type: value,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, value]);

  return (
    <div className="px-5 md:px-0 xl:px-5 w-full">
      <Card className="w-full !py-3 flex flex-col gap-3 !pb-4">
        <div>
          <h2 className="text-xl font-semibold">
            {page.charAt(0).toUpperCase() + page.slice(1)}
          </h2>

          <p className="text-xs text-white/60 leading-[1.25]">
            {page === "flask"
              ? "Select the type of solution you want to prepare and the details of the solution."
              : page === "burette"
              ? "Select the type of solution you want to titrate and the details of the solution."
              : ""}
          </p>
        </div>

        <Dropdown<Solutions | null>
          value={value}
          setValue={setValue}
          options={[
            {
              label: "Water",
              value: "water",
            },
            {
              label: "Strong Acid",
              value: "strong-acid",
            },
            {
              label: "Weak Acid",
              value: "weak-acid",
              disabled: true,
            },
            {
              label: "Strong Base",
              value: "strong-base",
            },
            {
              label: "Weak Base",
              value: "weak-base",
              disabled: true,
            },
          ]}
        />
      </Card>
    </div>
  );
}

export default function SelectionCardContainer({
  page,
  setPage,
}: {
  page: Pages;
  setPage: Dispatch<SetStateAction<Pages>>;
}) {
  const touchRef = useRef<HTMLDivElement>(null);

  useSwipe({
    element: touchRef,
    direction: "horizontal",
    onLeft: () => {
      if (page === "flask") {
        setPage("burette");
      }
    },
    onRight: () => {
      if (page === "burette") {
        setPage("flask");
      }
    },
  });

  return (
    <div
      className="w-full relative overflow-hidden md:hidden xl:block"
      ref={touchRef}
    >
      <div
        className="flex w-[calc(200%-4px)] transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(${page === "flask" ? 0 : -50}%)`,
        }}
      >
        <SelectionCard page={"flask"} />
        <SelectionCard page={"burette"} />
      </div>
    </div>
  );
}
