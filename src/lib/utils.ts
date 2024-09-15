import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

//yo mr.white, this is the classnames function
//it combines the clsx and tailwind-merge functions

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
