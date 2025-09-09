import Course from './course';
import { Course as CourseType } from '@/lib/types';
import { getDurationInMinutes } from '@/lib/utils';

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

export default function Day({ courses, isLast, onCourseClick }: { courses: CourseType[], isLast?: boolean, onCourseClick: (course: CourseType) => void }) {
  const sortedCourses = courses.sort((a, b) => a.start_time - b.start_time);
  const mergedCourses = mergeConsecutiveCourses(sortedCourses);

  return (
    <div className={`relative h-full border-l ${isLast ? 'border-r' : ''} border-gray-300 dark:border-gray-700`}>
      {Array.from({ length: 13 }, (_, i) => (
        <div key={i} className="h-16 border-t border-b border-gray-300 dark:border-gray-700" />
      ))}
      {mergedCourses.map(course => (
        <Course key={course.id} course={course} onClick={onCourseClick} />
      ))}
    </div>
  );
}