// components/ui.tsx
import { type HTMLAttributes } from "react";
export function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

export function Button(
  { className, ...p }: HTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 rounded-lg bg-slate-900 text-white text-sm px-3 py-2 hover:bg-slate-800 active:scale-[.99] transition",
        className
      )}
      {...(p as any)}
    />
  );
}
