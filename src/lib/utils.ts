import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

//yo mr.white, hows it going?

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
