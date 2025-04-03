import { Dispatch, KeyboardEvent, SetStateAction, useState } from "react";

export default function InputField<T>({
  value,
  setValue,
  label,
  placeholder,
  type,
}: {
  value: string | number | readonly string[];
  setValue: Dispatch<SetStateAction<T>> | ((value: T) => void);
  label: string;
  placeholder: string;
  type: HTMLInputElement["type"];
}) {
  return (
    <div className="w-full">
      <div className="text-[0.8rem] font-medium ml-[0.2rem] text-white/60">
        {label}
      </div>
      <input
        type={type}
        value={value as string | number | readonly string[]}
        onChange={(e) => setValue(e.target.value as T)}
        placeholder={placeholder as string}
        className="w-full h-8 py-1 px-2 rounded-lg bg-white/[0.05] backdrop-blur-xl border-[2px] border-white/5 focus:outline-none focus:border-cyan-900 text-sm text-white/60"
      />
    </div>
  );
}

export function NumberArrayInputField({
  numbers,
  setNumbers,
  label,
  placeholder,
}: {
  numbers: number[];
  setNumbers: Dispatch<SetStateAction<number[]>>;
  label: string;
  placeholder: string;
}) {
  const [inputValue, setInputValue] = useState<string>("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      if (inputValue) {
        const parsedValue = parseFloat(inputValue);
        if (!isNaN(parsedValue)) {
          setNumbers((preVal) =>
            [...(preVal || []), parsedValue].sort((a, b) => a - b)
          );
        }
        setInputValue("");
      }
    }
  };

  const handleRemove = (index: number) => {
    setNumbers((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full">
      <div className="text-[0.8rem] font-medium ml-[0.2rem] text-white/60">
        {label}
      </div>

      <div className="w-full min-h-8 py-1 px-2 rounded-lg bg-white/[0.05] backdrop-blur-xl border-[2px] border-white/5 focus:outline-none focus:border-cyan-900 text-sm text-white/60 flex-col items-center justify-start overflow-y-auto max-h-40">
        <div className="flex items-center justify-start gap-1 w-full flex-wrap">
          {Array.isArray(numbers) &&
            numbers.map((num, index) => (
              <button
                key={index}
                onClick={() => handleRemove(index)}
                className="flex items-center px-2 py-1 bg-cyan-100/10 text-white rounded-lg text-xs cursor-pointer"
              >
                {num}
                <div className="ml-2 text-white/60 hover:text-white material-symbols-rounded !text-xs">
                  close
                </div>
              </button>
            ))}

          <input
            type="number"
            value={inputValue}
            onChange={(e) => {
              if (/^[0-9.,]*$/.test(e.target.value)) {
                setInputValue(e.target.value);
              }

              if (e.target.value === ",") {
                setInputValue("");
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full min-w-6/12 focus:outline-none bg-transparent text-white/60"
          />
        </div>
      </div>
    </div>
  );
}
