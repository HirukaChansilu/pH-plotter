import { HTMLAttributes } from "react";

export default function Card({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={`${props.className} w-fit h-fit px-6 py-5 rounded-lg bg-white/5 backdrop-blur-xl border-[1px] border-white/5`}
    >
      {children}
    </div>
  );
}
