import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-amber-300 text-stone-950 shadow-lg shadow-amber-950/30 hover:bg-amber-200 focus-visible:ring-amber-200",
  secondary:
    "bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-950/25 hover:bg-cyan-200 focus-visible:ring-cyan-200",
  ghost:
    "border border-white/[0.15] bg-white/[0.08] text-white hover:border-white/25 hover:bg-white/[0.12] focus-visible:ring-white/40",
  danger:
    "bg-rose-400 text-rose-950 shadow-lg shadow-rose-950/25 hover:bg-rose-300 focus-visible:ring-rose-200",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3 text-sm",
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-6 text-base",
};

export function buttonClassName(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className = "",
) {
  return [
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-55",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button className={buttonClassName(variant, size, className)} type={type} {...props}>
      {children}
    </button>
  );
}
