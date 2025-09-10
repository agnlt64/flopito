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
  return -1;
}

export function getRoomLabel(roomName: string, roomType: string): string {
  if (roomName === 'BC') {
    roomName = 'Bloc central';
  } else if (roomName === 'NA') {
    roomName = 'Nouvel amphi';
  } else if (roomName === 'GMP') {
    roomName = 'Lambert (probablement)';
  }
  if (roomType === 'AMPHI') {
    return `Amphi : ${roomName}`;
  } else {
    return `Salle : ${roomName}`;
  }
}