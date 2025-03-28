import { useState } from "react";
import { Pages } from "../../lib/types";
import Card from "../UI/Card";
import InputField from "../UI/InputField";

export default function SolutionDataCard({ page }: { page: Pages }) {
  const [test, setTest] = useState<string | number>("");
  return (
    <div className="px-5 flex-auto">
      <Card className="h-full !py-3">
        <div className="text-lg font-medium">Strong Acid</div>

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
