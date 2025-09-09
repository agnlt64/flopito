import type { Course } from '@/lib/types';
import { TEACHERS_MAP } from '@/lib/teachers-map';

function getDurationInMinutes(type: string): number {
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

export default function Course({ course }: { course: Course }) {
  const duration = course.duration || getDurationInMinutes(course.course.type);
  const top = (course.start_time - 480) / 60 * 64;
  const height = duration / 60 * 64;
  const teacherName = course.tutor ? TEACHERS_MAP.get(course.tutor) || course.tutor : 'N/A';

  return (
    <div
      className="absolute w-full p-2 rounded-lg shadow-md flex flex-col text-center justify-center z-10"
      style={{
        top: `${top}px`,
        height: `${height}px`,
        backgroundColor: course.course.module.display.color_bg,
        color: course.course.module.display.color_txt,
      }}
    >
      <div className="text-sm font-bold tracking-tight leading-tight">{course.course.module.name}</div>
      <div className="text-xs">Salle: {course.room.name === 'NA' ? 'Nouvel amphi' : course.room.name}</div>
      {duration > 60 && <div className="text-xs">Prof: {teacherName}</div>}
    </div>
  );
}