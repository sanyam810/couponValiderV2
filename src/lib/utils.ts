import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Yo mr.white, I'm gonna need you to cook me up some classnames

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
