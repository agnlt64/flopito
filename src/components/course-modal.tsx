import React from 'react';
import { Course } from '@/lib/types';
import { TEACHERS_MAP } from '@/lib/teachers-map';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { getDurationInMinutes } from '@/lib/utils';

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
}

const CourseModal: React.FC<CourseModalProps> = ({ course, onClose }) => {
  if (!course) return null;

  // Calculate begin and end times
  const startTime = new Date();
  startTime.setHours(Math.floor(course.start_time / 60), course.start_time % 60, 0, 0);

  const duration = course.duration || getDurationInMinutes(course.course.type);
  const endTime = new Date(startTime.getTime() + duration * 60 * 1000);

  const formatTime = (date: Date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const teacherName = course.tutor ? TEACHERS_MAP.get(course.tutor) || course.tutor : 'N/A';
  const roomName = course.room.name === 'NA' ? 'Nouvel amphi' : (course.room.name === 'BC' ? 'Bloc central' : course.room.name);

  return (
    <Dialog open={!!course} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{course.course.module.name}</DialogTitle>
          <DialogDescription>
            Détails du cours
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p><strong>Type:</strong> {course.course.type}</p>
          <p><strong>Salle:</strong> {roomName}</p>
          <p><strong>Prof:</strong> {teacherName}</p>
          <p><strong>Horaire:</strong> {formatTime(startTime)} - {formatTime(endTime)}</p>
        </div>
        <DialogFooter>
          <Button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
          >
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CourseModal;