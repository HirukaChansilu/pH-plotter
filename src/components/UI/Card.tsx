import { HTMLAttributes } from "react";

export default function Card({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={`${props.className} p-5 rounded-xl bg-white/[0.05] backdrop-blur-xl border-[1px] border-white/5`}
    >
      {children}
    </div>
  );
}
