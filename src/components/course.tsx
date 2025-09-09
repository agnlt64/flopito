import type { Course } from '@/lib/types';
import { TEACHERS_MAP } from '@/lib/teachers-map';
import { getDurationInMinutes } from '@/lib/utils';

export default function Course({ course, onClick }: { course: Course, onClick: (course: Course) => void }) {
  const duration = course.duration || getDurationInMinutes(course.course.type);
  const top = (course.start_time - 480) / 60 * 64;
  const height = duration / 60 * 64;
  const teacherName = course.tutor ? TEACHERS_MAP.get(course.tutor) || course.tutor : 'N/A';

  return (
    <div
      className="absolute w-full p-2 rounded-lg shadow-md flex flex-col text-center justify-center z-10 cursor-pointer"
      style={{
        top: `${top}px`,
        height: `${height}px`,
        backgroundColor: course.course.module.display.color_bg,
        color: course.course.module.display.color_txt,
      }}
      onClick={() => onClick(course)}
    >
      <div className="text-sm font-bold tracking-tight leading-tight">{course.course.module.name}</div>
      <div className="text-xs">Salle: {course.room.name === 'NA' ? 'Nouvel amphi' : (course.room.name === 'BC' ? 'Bloc central' : course.room.name)}</div>
      {duration > 60 && <div className="text-xs">Prof: {teacherName}</div>}
    </div>
  );
}