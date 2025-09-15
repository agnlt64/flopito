import Course from './course';
import { Course as CourseType, DAYS } from '@/lib/types';
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

const CourseGroup = ({ courses, onCourseClick, showAmphiCourses, view }: { courses: CourseType[], onCourseClick: (course: CourseType) => void, showAmphiCourses: boolean, view: 'day' | 'week' }) => {
  const top = (courses[0].start_time - 480) / 60 * 64;
  const duration = courses[0].duration || getDurationInMinutes(courses[0].course.type);
  const height = duration / 60 * 64;

  return (
    <div className="absolute w-full" style={{ top: `${top}px`, height: `${height}px` }}>
      <div className="flex h-full">
        {courses.map((course) => (
          <div key={course.id} className="h-full flex-1">
            <Course
              course={course}
              onClick={onCourseClick}
              showAmphiCourses={showAmphiCourses}
              view={view}
            />
          </div>
        ))}
      </div>
    </div>
  );
};


export default function Day({ courses, isLast, onCourseClick, showAmphiCourses, view, day }: { courses: CourseType[], isLast?: boolean, onCourseClick: (course: CourseType) => void, showAmphiCourses: boolean, view: 'day' | 'week', day: string }) {
  const sortedCourses = courses.sort((a, b) => a.start_time - b.start_time);
  const mergedCourses = mergeConsecutiveCourses(sortedCourses);

  const courseGroups = mergedCourses.reduce((acc, course) => {
    const group = acc.find(g => g[0].start_time === course.start_time);
    if (group) {
      group.push(course);
    } else {
      acc.push([course]);
    }
    return acc;
  }, [] as CourseType[][]);

  const today = new Date();
  const dayIndex = (today.getDay() + 6) % 7;
  const currentDayStr = DAYS[dayIndex];
  const isToday = day === currentDayStr;

  return (
    <div className={`relative h-full border-l ${isLast ? 'border-r' : ''} border-gray-300 dark:border-gray-700 ${isToday ? 'bg-blue-50 dark:bg-blue-950/50' : ''}`}>
      {Array.from({ length: 13 }, (_, i) => (
        <div key={i} className="h-16 border-t border-b border-gray-300 dark:border-gray-700" />
      ))}
      {courseGroups.map((group, index) => (
        <CourseGroup
          key={index}
          courses={group}
          onCourseClick={onCourseClick}
          showAmphiCourses={showAmphiCourses}
          view={view}
        />
      ))}
    </div>
  );
}