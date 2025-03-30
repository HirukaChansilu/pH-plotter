import { Dispatch, SetStateAction } from "react";

import Card from "./Card";
import { Pages } from "../../lib/types";

export default function Menu({
  page,
  setPage,
}: {
  page: Pages;
  setPage: Dispatch<SetStateAction<Pages>>;
}) {
  return (
    <Card className="w-full h-9 relative !p-0 !rounded-full">
      <div className="w-full h-full grid grid-cols-2 items-center content-center text-center absolute inset-0">
        <button
          onClick={() => setPage("flask")}
          className={`h-9 w-full transition-opacity duration-500 ease-in-out cursor-pointer font-medium ${
            page === "flask" ? "opacity-100" : "opacity-60"
          }`}
        >
          Flask
        </button>
        <button
          onClick={() => setPage("burette")}
          className={`h-9 w-full transition-opacity duration-500 ease-in-out cursor-pointer font-medium ${
            page === "burette" ? "opacity-100" : "opacity-60"
          }`}
        >
          Burette
        </button>
      </div>

      <div className="grid grid-cols-2 h-full">
        <Card
          className="!rounded-full transition-transform duration-400 ease-out !p-0 flex items-center justify-center overflow-hidden"
          style={{
            transform: `translateX(${page === "flask" ? 0 : 100}%)`,
          }}
        >
          <div className="h-9 bg-white w-16 rounded-full blur-lg opacity-30" />
        </Card>
      </div>
    </Card>
  );
}
