import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { AMPHIS_MAP, TEACHERS_MAP } from "./maps";

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

export function getRoomLabel(roomName: string, roomType: string): { type: string; name: string } {
  const finalRoomName = AMPHIS_MAP.get(roomName) || roomName;
  const type = roomType === 'AMPHI' || AMPHIS_MAP.has(roomName) ? 'Amphi' : 'Salle';
  return { type, name: finalRoomName };
}

export function getTeacherLabel(tutor: string | null, defaultName: string = '??'): { abbrev: string; fullName: string } {
  const abbrev = tutor || defaultName;
  const fullName = (tutor ? TEACHERS_MAP.get(tutor) : null) || abbrev;
  return { abbrev, fullName };
}