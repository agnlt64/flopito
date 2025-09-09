export interface Course {
  id: number;
  room: Room;
  start_time: number;
  day: string;
  course: CourseDetails;
  tutor: string | null;
  id_visio: string | null;
  number: number;
  duration?: number;
}

export interface Room {
  id: number;
  name: string;
}

export interface CourseDetails {
  id: number;
  type: string;
  room_type: string;
  week: number;
  year: number;
  groups: {
    id: number;
    train_prog: string;
    name: string;
    is_structural: boolean;
  }[];
  supp_tutor: any[];
  module: Module;
  pay_module: null;
  is_graded: boolean;
}

export interface Module {
  name: string;
  abbrev: string;
  display: {
    color_bg: string;
    color_txt: string;
  };
}

export type Year = 'BUT1' | 'BUT2I' | 'BUT3I';

export interface Group {
  name: string;
  year: Year;
}

export const YEAR_GROUPS: Record<Year, Group[]> = {
  BUT1: [
    { name: 'A', year: 'BUT1' },
    { name: 'B', year: 'BUT1' },
    { name: 'C', year: 'BUT1' },
    { name: 'D', year: 'BUT1' },
    { name: 'E', year: 'BUT1' },
    { name: 'F', year: 'BUT1' },
  ],
  BUT2I: [
    { name: 'G1', year: 'BUT2I' },
    { name: 'G2', year: 'BUT2I' },
    { name: 'G3', year: 'BUT2I' },
    { name: 'G4', year: 'BUT2I' },
  ],
  BUT3I: [
    { name: 'DVA', year: 'BUT3I' },
    { name: 'DV1', year: 'BUT3I' },
    { name: 'DV2', year: 'BUT3I' },
    { name: 'RE', year: 'BUT3I' },
    { name: 'BD', year: 'BUT3I' },
    { name: 'DV', year: 'BUT3I' },
    { name: 'RE1', year: 'BUT3I' },
  ],
};