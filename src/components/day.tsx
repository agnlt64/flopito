import Course from './course';
import { Course as CourseType } from '@/lib/types';

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

function mergeConsecutiveCourses(courses: CourseType[]): CourseType[] {
  if (courses.length < 2) {
    return courses;
  }

  const mergedCourses: CourseType[] = [];
  let i = 0;

  while (i < courses.length) {
    const currentCourse = { ...courses[i] };
    let j = i + 1;
    let merged = false;
    let totalDuration = getDurationInMinutes(currentCourse.course.type);

    while (
      j < courses.length &&
      currentCourse.course.module.name === courses[j].course.module.name &&
      currentCourse.course.type === courses[j].course.type &&
      currentCourse.room.name === courses[j].room.name &&
      currentCourse.tutor === courses[j].tutor &&
      currentCourse.start_time + totalDuration === courses[j].start_time
    ) {
      totalDuration += getDurationInMinutes(courses[j].course.type);
      merged = true;
      j++;
    }

    if (merged) {
      currentCourse.duration = totalDuration;
    }

    mergedCourses.push(currentCourse);
    i = j;
  }

  return mergedCourses;
}

export default function Day({ courses, isLast }: { courses: CourseType[], isLast?: boolean }) {
  const sortedCourses = courses.sort((a, b) => a.start_time - b.start_time);
  const mergedCourses = mergeConsecutiveCourses(sortedCourses);

  return (
    <div className={`relative h-full border-l border-b ${isLast ? 'border-r' : ''} border-gray-300 dark:border-gray-700`}>
      {Array.from({ length: 13 }, (_, i) => (
        <div key={i} className="h-16 border-t border-gray-300 dark:border-gray-700" />
      ))}
      {mergedCourses.map(course => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
}