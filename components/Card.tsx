import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  interactive?: boolean;
}

export function Card({ children, className = "", interactive = false, ...props }: CardProps) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/10 bg-white/[0.08] p-5 shadow-2xl shadow-black/20 backdrop-blur",
        interactive ? "transition duration-200 hover:-translate-y-1 hover:border-amber-200/[0.35] hover:bg-white/[0.12]" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
