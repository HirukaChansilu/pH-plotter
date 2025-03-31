import { Dispatch, SetStateAction } from "react";

export default function Dropdown<T>({
  value,
  setValue,
  options,
}: {
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
  options: {
    label: string;
    value: string;
    disabled?: boolean;
  }[];
}) {
  return (
    <select
      value={(value as string) || ""}
      onChange={(e) => setValue(e.target.value as T)}
      className="w-full h-8 py-1 px-2 rounded-lg bg-white/[0.05] backdrop-blur-xl border-[2px] border-white/5 focus:outline-none focus:border-cyan-900 text-sm text-white/60"
    >
      <option value="" disabled hidden>
        Select an option
      </option>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className={`bg-[#2c3237] ${
            option.disabled ? "text-white/40 italic" : "text-white"
          }`}
          disabled={option.disabled ?? false}
        >
          {option.disabled
            ? `${option.label} (Not Implemented yet)`
            : option.label}
        </option>
      ))}
    </select>
  );
}
