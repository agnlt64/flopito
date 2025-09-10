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
import { getDurationInMinutes, getRoomLabel } from '@/lib/utils';

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
}

const CourseModal: React.FC<CourseModalProps> = ({ course, onClose }) => {
  if (!course) return null;

  const startTime = new Date();
  startTime.setHours(Math.floor(course.start_time / 60), course.start_time % 60, 0, 0);

  const durationMinutes = course.duration || getDurationInMinutes(course.course.type);
  const durationHours = Math.floor(durationMinutes / 60);
  const endTime = new Date(startTime.getTime() + durationMinutes * 60 * 1000);

  const formatTime = (date: Date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const teacherName = course.tutor ? TEACHERS_MAP.get(course.tutor) || course.tutor : '??';
  const roomName = getRoomLabel(course.room.name, course.course.room_type);

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
          <p><strong>Type:</strong> {course.course.type.substring(0, 2)}</p>
          <p><strong>{roomName.split(':')[0]} :</strong> {roomName.split(':')[1]}</p>
          <p><strong>Prof:</strong> {teacherName}</p>
          <p><strong>Durée:</strong> {durationHours}h{durationMinutes % 60}min</p>
          <p><strong>Horaire:</strong> {formatTime(startTime)} - {formatTime(endTime)}</p>
        </div>
        <DialogFooter>
          <Button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-blue-500 border-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
          >
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CourseModal;