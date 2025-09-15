import { Plus } from 'lucide-react';
import type { Course } from '@/lib/types';
import { getDurationInMinutes, getRoomLabel, getTeacherLabel } from '@/lib/utils';

export default function Course({ course, onClick, showAmphiCourses, view }: { course: Course, onClick: (course: Course) => void, showAmphiCourses: boolean, view: 'day' | 'week' }) {
  const duration = course.duration || getDurationInMinutes(course.course.type);
  const top = (course.start_time - 480) / 60 * 64;
  const height = duration / 60 * 64;
  const teacher = getTeacherLabel(course.tutor, 'N/A');

  const isAmphi = course.course.room_type === 'AMPHI';

  if (isAmphi && !showAmphiCourses) {
    return (
      <div
        className="absolute w-full p-2 rounded-lg border-dashed border-2 border-gray-400"
        style={{
          top: `${top}px`,
          height: `${height}px`,
        }}
      />
    );
  }

  const amphiBorderStyle = isAmphi ? 'border-solid border-2 dark:border-white border-black' : '';
  const room = getRoomLabel(course.room.name, course.course.room_type);

  return (
    <div
      className={`group absolute w-full p-2 rounded-lg shadow-md flex flex-col text-center justify-center cursor-pointer ${amphiBorderStyle}`}
      style={{
        top: `${top}px`,
        height: `${height}px`,
        backgroundColor: course.course.module.display.color_bg,
        color: course.course.module.display.color_txt,
      }}
      onClick={() => onClick(course)}
    >
      <div className="absolute top-1 right-1">
        <Plus size={16} color={course.course.module.display.color_txt} />
      </div>
      {view === 'day' ? (
        <div className="text-sm font-bold tracking-tight leading-tight">{course.course.module.name}</div>
      ) : (
        <>
          <div className="text-sm font-bold tracking-tight leading-tight hidden sm:block">{course.course.module.name}</div>
          <div className="text-xs sm:hidden font-bold">{course.course.module.abbrev}</div>
        </>
      )}
      <div className="text-xs">
        <span className={view === 'week' ? 'hidden sm:inline' : ''}>{room.type}: </span>
        {room.name}
      </div>
      {duration > 60 && <div className="text-xs">
        <span className="hidden sm:inline">Prof: </span>
        {teacher.fullName}
      </div>}
    </div>
  );
}