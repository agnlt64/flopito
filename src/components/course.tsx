import { Ellipsis } from 'lucide-react';
import type { Course } from '@/lib/types';
import { TEACHERS_MAP } from '@/lib/teachers-map';
import { getDurationInMinutes, getRoomLabel } from '@/lib/utils';

export default function Course({ course, onClick }: { course: Course, onClick: (course: Course) => void }) {
  const duration = course.duration || getDurationInMinutes(course.course.type);
  const top = (course.start_time - 480) / 60 * 64;
  const height = duration / 60 * 64;
  const teacherName = course.tutor ? TEACHERS_MAP.get(course.tutor) || course.tutor : 'N/A';

  return (
    <div
      className="group absolute w-full p-2 rounded-lg shadow-md flex flex-col text-center justify-center cursor-pointer transition-all duration-300 hover:brightness-90"
      style={{
        top: `${top}px`,
        height: `${height}px`,
        backgroundColor: course.course.module.display.color_bg,
        color: course.course.module.display.color_txt,
      }}
      onClick={() => onClick(course)}
    >
      <div className="absolute top-1 right-2 transition-opacity duration-300">
        <Ellipsis size={20} color={course.course.module.display.color_txt} />
      </div>
      <div className="text-sm font-bold tracking-tight leading-tight hidden sm:block">{course.course.module.name}</div>
      <div className="text-xs sm:text-sm">{getRoomLabel(course.room.name, course.course.room_type)}</div>
      <div className="text-xs sm:hidden">{course.course.module.abbrev}</div>
      {duration > 60 && <div className="text-xs hidden sm:block">Prof: {teacherName}</div>}
    </div>
  );
}