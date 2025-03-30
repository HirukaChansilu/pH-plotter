import { useState } from "react";
import { Pages } from "../../lib/types";
import Card from "../UI/Card";
import InputField from "../UI/InputField";

export default function SolutionDataCard({
  page,
  className,
}: {
  page: Pages;
  className?: string;
}) {
  const [test, setTest] = useState<string | number>("");
  return (
    <div className={`px-5 md:px-0 xl:px-5 flex-auto ${className}`}>
      <Card className="h-full !py-3">
        <div className="text-lg font-medium">Strong Acid</div>

        {page}

        <InputField
          value={test}
          setValue={setTest}
          label="Concentration (M)"
          placeholder="Place 1"
          type="text"
        />
      </Card>
    </div>
  );
}
