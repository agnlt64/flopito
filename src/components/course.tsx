import { Plus } from 'lucide-react';
import type { Course } from '@/lib/types';
import { getDurationInMinutes, getTeacherLabel, getRoomLabel } from '@/lib/utils';

export default function Course({ course, onClick, showAmphiCourses, view, selectedYear }: { course: Course, onClick: (course: Course) => void, showAmphiCourses: boolean, view: 'day' | 'week', selectedYear: Year }) {
  const duration = course.duration || getDurationInMinutes(course.course.type);
  const height = duration / 60 * 64;
  const teacher = getTeacherLabel(course.tutor, 'N/A');

  const isAmphi = course.course.room_type === 'AMPHI' || course.course.room_type === 'Gd-Amphi';

  if (isAmphi && !showAmphiCourses) {
    return (
      <div
        className="w-full h-full p-2 rounded-lg border-dashed border-2 border-gray-400"
        style={{
          height: `${height}px`,
        }}
      />
    );
  }

  const amphiBorderStyle = isAmphi ? 'border-solid border-2 dark:border-white border-black' : '';
  const room = getRoomLabel(course.room.name, course.course.room_type);
  
  const groupName = course.course.groups[0]?.name || '';
  const isHalfGroupCourse = /\d$/.test(groupName);
  const halfGroupLabel = selectedYear === 'BUT1' && isHalfGroupCourse && !isAmphi ? groupName : null;


  return (
    <div
      className={`group h-full w-full p-2 rounded-lg shadow-md flex flex-col text-center justify-center cursor-pointer ${amphiBorderStyle}`}
      style={{
        height: `${height}px`,
        backgroundColor: course.course.module.display.color_bg,
        color: course.course.module.display.color_txt,
      }}
      onClick={() => onClick(course)}
    >
      <div className="absolute top-1 right-1">
        <Plus size={16} color={course.course.module.display.color_txt} />
      </div>
      {halfGroupLabel && <span className={`absolute top-2 left-2 font-bold ${view === 'week' ? 'text-[10px] sm:text-xs' : 'text-xs'}`}>{halfGroupLabel}</span>}
      {view === 'day' ? (
        <div className="text-sm font-bold tracking-tight leading-tight">{course.course.module.name}</div>
      ) : (
        <>
          <div className="text-sm font-bold tracking-tight leading-tight hidden sm:block">{course.course.module.name}</div>
          <div className="text-[10px] sm:hidden font-bold">{course.course.module.abbrev}</div>
        </>
      )}
      <div className={view === 'week' ? 'text-[10px] sm:text-xs' : 'text-xs'}>
        <span className={view === 'week' ? 'hidden sm:inline' : ''}>{room.type}: </span>
        {room.name}
      </div>
      {duration > 60 && <div className={view === 'week' ? 'text-[10px] sm:text-xs' : 'text-xs'}>
        <span className="hidden sm:inline">Prof: </span>
        {teacher.fullName}
      </div>}
    </div>
  );
}