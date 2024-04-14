import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const boxClassname = "flex flex-col border gap-2 p-10 rounded-xl bg-secondary hover:bg-accent "

