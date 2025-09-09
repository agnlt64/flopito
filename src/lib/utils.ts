import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDurationInMinutes(type: string): number {
  if (type.includes('1h')) return 60;
  if (type.includes('1h30')) return 90;
  if (type.includes('2h')) return 120;
  if (type.includes('3h')) return 180;
  if (type.includes('4h')) return 240;
  switch (type) {
    case 'CM':
      return 120;
    case 'TD':
    case 'TP':
      return 90;
    default:
      return 90;
  }
}