'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Course, Year, YEAR_GROUPS } from '@/lib/types';
import Day from './day';
import CourseModal from './course-modal';

const days = ['m', 'tu', 'w', 'th', 'f'];

const YEAR_TRAIN_PROG_MAP: Record<Year, string> = {
  BUT1: 'BUT1',
  BUT2I: 'BUT2',
  BUT3I: 'BUT3',
};

export default function Schedule() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialYear = (searchParams.get('year') as Year) || 'BUT1';
  const initialGroup = searchParams.get('group') || YEAR_GROUPS.BUT1[0].name;

  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedYear, setSelectedYear] = useState<Year>(initialYear);
  const [selectedGroup, setSelectedGroup] = useState<string>(initialGroup);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
        const [selectedCourseForModal, setSelectedCourseForModal] = useState<Course | null>(null);

      const courseCache = useRef(new Map<string, Course[]>());

      useEffect(() => {
        const yearParam = (searchParams.get('year') as Year);
        const groupParam = searchParams.get('group');

        if (yearParam && yearParam !== selectedYear) {
          setSelectedYear(yearParam);
        }
        if (groupParam && groupParam !== selectedGroup) {
          setSelectedGroup(groupParam);
        }
      }, [searchParams]); // Depend on searchParams to re-run when URL changes

  useEffect(() => {
        const today = new Date();
        const currentYear = today.getFullYear();
        const startOfYear = new Date(currentYear, 0, 1);
        const diff = today.getTime() - startOfYear.getTime();
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);
        const currentWeek = Math.ceil((dayOfYear + startOfYear.getDay() + 1) / 7);

        const cacheKey = `${currentWeek}-${currentYear}`;

        if (courseCache.current.has(cacheKey)) {
          setCourses(courseCache.current.get(cacheKey)!);
          return;
        }

        const apiUrl = `https://flopedt.iut-amiens.fr/fr/api/fetch/scheduledcourses/?dept=INFO&week=${currentWeek}&year=${currentYear}&work_copy=0`;

        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            courseCache.current.set(cacheKey, data);
            setCourses(data);
          });
      }, [selectedYear, selectedGroup]);

  const availableGroups = YEAR_GROUPS[selectedYear];

  const filteredCourses = courses.filter(course => {
    const selectedTrainProgForYear = YEAR_TRAIN_PROG_MAP[selectedYear];

    const isGroupMatch = course.course.groups.some(group =>
      group.name === selectedGroup && group.train_prog === selectedTrainProgForYear
    );

    if (selectedYear === 'BUT3I') {
      return isGroupMatch;
    }

    const isAmphiMatch = course.course.room_type === 'AMPHI' &&
                         course.course.groups.some(group => group.train_prog === selectedTrainProgForYear);

    return isGroupMatch || isAmphiMatch;
  });

  const coursesByDay = filteredCourses.reduce((acc, course) => {
    const day = course.day;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(course);
    return acc;
  }, {} as { [key: string]: Course[] });

  const handleCourseClick = (course: Course) => {
    setSelectedCourseForModal(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourseForModal(null);
  };

  return (
    <div className="container mx-auto px-4 py-4 overflow-hidden">
      <div className="flex justify-start mb-4 space-x-4">
        <div>
          <label htmlFor="promo-select" className="block text-md font-medium text-gray-700 dark:text-gray-300">Promo</label>
          <select
            id="promo-select"
            onChange={(e) => {
              const year = e.target.value as Year;
              const newGroup = YEAR_GROUPS[year][0].name;
              const params = new URLSearchParams(searchParams.toString());
              params.set('year', year);
              params.set('group', newGroup);
              router.replace(`?${params.toString()}`);
            }}
            value={selectedYear}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 text-gray-900 dark:text-gray-100"
          >
            {Object.keys(YEAR_GROUPS).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="group-select" className="block text-md font-medium text-gray-700 dark:text-gray-300">Groupe</label>
          <select
            id="group-select"
            onChange={(e) => {
              const newGroup = e.target.value;
              const params = new URLSearchParams(searchParams.toString());
              params.set('group', newGroup);
              router.replace(`?${params.toString()}`);
            }}
            value={selectedGroup}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 text-gray-900 dark:text-gray-100"
          >
            {availableGroups.map(group => (
              <option key={group.name} value={group.name}>{group.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-[auto_repeat(5,1fr)] h-[832px] border-b border-gray-300 dark:border-gray-700">
        <div className="row-span-full flex flex-col text-right pr-2 -mt-3">
          {Array.from({ length: 13 }, (_, i) => (
            <div key={i} className="h-16">{i + 8}:00</div>
          ))}
        </div>
        {days.map((day, index) => (
          <Day key={day} courses={coursesByDay[day] || []} isLast={index === days.length - 1} onCourseClick={handleCourseClick} />
        ))}
      </div>

      {isModalOpen && (
        <CourseModal course={selectedCourseForModal} onClose={handleCloseModal} />
      )}
    </div>
  );
}