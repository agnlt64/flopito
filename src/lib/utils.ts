import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { AMPHIS_MAP, TEACHERS_MAP } from "./maps";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDurationInMinutes(type: string): number {
  // The first 2 characters of the type are the type of course (e.g., TD, CM, TP),
  // the rest is the duration.
  const durationStr = type.substring(2);
  let totalMinutes = 0;

  if (durationStr.includes('h')) {
    const parts = durationStr.split('h');
    const hours = parseInt(parts[0], 10);
    if (!isNaN(hours)) {
      totalMinutes += hours * 60;
    }

    if (parts.length > 1 && parts[1]) {
      const minutes = parseInt(parts[1], 10);
      if (!isNaN(minutes)) {
        totalMinutes += minutes;
      }
    }
  } else if (durationStr) {
    // This part handles durations that are only in minutes, e.g., "90"
    const minutes = parseInt(durationStr, 10);
    if (!isNaN(minutes)) {
      totalMinutes = minutes;
    }
  }

  return Math.max(0, totalMinutes);
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