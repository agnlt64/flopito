'use client';

import { useEffect, useState } from 'react';
import { Course } from '@/lib/types';
import Day from './day';

const days = ['m', 'tu', 'w', 'th', 'f'];
const dayTranslations: { [key: string]: string } = {
  m: 'Lundi',
  tu: 'Mardi',
  w: 'Mercredi',
  th: 'Jeudi',
  f: 'Vendredi',
};

export default function Schedule() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [groups, setGroups] = useState<{ id: number; train_prog: string; name: string; is_structural: boolean; }[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>('All');

  useEffect(() => {
    fetch('https://flopedt.iut-amiens.fr/fr/api/fetch/scheduledcourses/?dept=INFO&week=37&year=2025&work_copy=0')
      .then(response => response.json())
      .then(data => {
        setCourses(data);
        const allGroups = data.flatMap((course: Course) => course.course.groups);
        const uniqueGroupsMap = new Map<number, { id: number; train_prog: string; name: string; is_structural: boolean; }>();
        allGroups.forEach(group => {
          if (!uniqueGroupsMap.has(group.id)) {
            uniqueGroupsMap.set(group.id, group);
          }
        });
        const uniqueGroups = Array.from(uniqueGroupsMap.values());
        setGroups(uniqueGroups);
      });
  }, []);

  const filteredCourses = selectedGroup === 'All'
    ? courses
    : courses.filter(course => {
        const selectedGroupObject = groups.find(g => g.name === selectedGroup);
        if (!selectedGroupObject) return false;

        const selectedTrainProg = selectedGroupObject.train_prog;
        const courseGroups = course.course.groups.map(g => g.name);
        const courseTrainProgs = course.course.groups.map(g => g.train_prog);

        const isGroupMatch = courseGroups.includes(selectedGroup) || courseGroups.includes(selectedGroupObject.train_prog);
        const isAmphiMatch = course.course.room_type === 'AMPHI' && courseTrainProgs.includes(selectedTrainProg);

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

  return (
    <div className="container mx-auto px-4 overflow-hidden">
      <div className="flex justify-end mb-4">
        <select
          onChange={(e) => setSelectedGroup(e.target.value)}
          value={selectedGroup}
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 text-gray-900 dark:text-gray-100"
        >
          <option value="All">All</option>
          {groups.map(group => (
            <option key={group.id} value={group.name}>{group.name}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-[auto_repeat(5,1fr)]">
        <div />
        {days.map(day => (
          <div key={day} className="text-center font-bold">{dayTranslations[day]}</div>
        ))}
      </div>
      <div className="grid grid-cols-[auto_repeat(5,1fr)]">
        <div className="row-span-full flex flex-col text-right pr-2 -mt-3">
          {Array.from({ length: 13 }, (_, i) => (
            <div key={i} className="h-16">{i + 8}:00</div>
          ))}
        </div>
        {days.map((day, index) => (
          <Day key={day} courses={coursesByDay[day] || []} isLast={index === days.length - 1} />
        ))}
      </div>
    </div>
  );
}


