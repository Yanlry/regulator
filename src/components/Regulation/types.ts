export interface Ambulance {
  id: string;
  name: string;
  color: string;
}

export interface Course {
  id: string;
  hour: number;
title: string;
  description: string;
  
  minute: number;

  duration: number;

  ambulanceId?: string;
  startTime: string;
  endTime: string;
  patientName: string;
  pickupAddress: string;
  destinationAddress: string;
  appointmentTime: Date;
  assignedTo: string | null;
  scheduledTime: Date | null;
}

export interface CourseGroup {
  id: string;
  courses: Course[];
  startTime: Date;
  endTime: Date;
}

export interface DragItem {
  id: string;
  fromSchedule: boolean;
  type: string;
}

export interface DropPreviewData {
  isVisible: boolean;
  time: Date | null;
  x: number;
  y: number;
}

export interface RegulationScreenProps {
  isOpen: boolean;
}

export interface HourBlockProps {
  hour: number;
  date: Date;
  ambulanceId: string;
  ambulance: Ambulance;
  onDropCourse: (
    courseId: string,
    ambulanceId: string,
    time: Date,
    fromSchedule: boolean
  ) => void;
  scheduledCourses: Course[];
  onRemoveCourse: (courseId: string) => void;
  isAlternateRow: boolean;
  onHoverTimeChange: (hour: number, minute: number) => void;
  onHoverEnd?: () => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

export interface GroupedCoursesCardProps {
  group: CourseGroup;
  ambulance: Ambulance;
  onRemoveCourse: (courseId: string) => void;
}

export interface UnassignedCourseCardProps {
  course: Course;
}

export interface ScheduledCourseCardProps {
  course: Course;
  ambulance: Ambulance;
  onRemove?: () => void;
  isCompact?: boolean;
  hasCollision?: boolean;
}

export interface CourseDragPreviewProps {
  preview: DropPreviewData | null;
}

export interface UnassignedAreaProps {
  courses: Course[];
  ambulances?: Ambulance[];  // Ajout de cette propriété
  onDropCourse: (courseId: string) => void;
  onAutoAssign?: (assignedCourses: { [ambulanceId: string]: Course[] }) => void;  // Ajout de cette propriété
}

export interface ScheduleGridProps {
  ambulances: Ambulance[];
  hours: number[];
  tomorrow: Date;
  hoveredTimeInfo: { hour: number; minute: number } | null;
  setHoveredTimeInfo: (info: { hour: number; minute: number } | null) => void;
  handleDropCourse: (
    courseId: string,
    ambulanceId: string,
    time: Date,
    fromSchedule: boolean
  ) => void;
  handleUnassignCourse: (courseId: string) => void;
  getCoursesForHour: (ambulanceId: string, hour: number) => Course[];
}

export interface ScheduleHeaderProps {
  tomorrow: Date;
}
