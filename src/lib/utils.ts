import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

//yo mr.white, this is the classnames function

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
