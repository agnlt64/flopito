'use client';

import { useEffect, useState } from 'react';
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
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedYear, setSelectedYear] = useState<Year>('BUT1');
  const [selectedGroup, setSelectedGroup] = useState<string>(YEAR_GROUPS.BUT1[0].name);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<Course | null>(null);

  useEffect(() => {
    fetch('https://flopedt.iut-amiens.fr/fr/api/fetch/scheduledcourses/?dept=INFO&week=37&year=2025&work_copy=0')
      .then(response => response.json())
      .then(data => {
        setCourses(data);
      });
  }, []);

  const availableGroups = YEAR_GROUPS[selectedYear];

  const filteredCourses = courses.filter(course => {
    const selectedTrainProgForYear = YEAR_TRAIN_PROG_MAP[selectedYear];

    const isGroupMatch = course.course.groups.some(group =>
      group.name === selectedGroup && group.train_prog === selectedTrainProgForYear
    );

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
          <label htmlFor="promo-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Promo</label>
          <select
            id="promo-select"
            onChange={(e) => {
              const year = e.target.value as Year;
              setSelectedYear(year);
              setSelectedGroup(YEAR_GROUPS[year][0].name); // Select first group of new year
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
          <label htmlFor="group-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Groupe</label>
          <select
            id="group-select"
            onChange={(e) => setSelectedGroup(e.target.value)}
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