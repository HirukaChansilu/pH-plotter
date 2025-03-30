import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Pages } from "../../lib/types";
import Card from "../UI/Card";
import Dropdown from "../UI/Dropdown";
import { useSwipe } from "../../hooks/useSwipe";

export function SelectionCard({ page }: { page: Pages }) {
  const [value, setValue] = useState<string | null>(null);

  return (
    <div className="px-5 w-full">
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

        <Dropdown
          value={value}
          setValue={setValue}
          options={[
            {
              label: "Acid",
              value: "acid",
            },
            {
              label: "Base",
              value: "base",
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
    <div className="w-full relative overflow-hidden" ref={touchRef}>
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
