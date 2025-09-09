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