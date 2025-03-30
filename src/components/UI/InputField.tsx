import { Dispatch, SetStateAction } from "react";

export default function InputField({
  value,
  setValue,
  label,
  placeholder,
  type,
}: {
  value: string | number;
  setValue: Dispatch<SetStateAction<string | number>>;
  label: string;
  placeholder: string;
  type: "number" | "text";
}) {
  return (
    <div className="">
      <div className="text-sm mb-[0.1rem] text-white/70">{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full h-8 py-1 px-2 rounded-lg bg-white/[0.05] backdrop-blur-xl border-[2px] border-white/5 focus:outline-none focus:border-cyan-900 text-sm text-white/60"
      />
    </div>
  );
}
