import { Course, Ambulance, CourseGroup } from './types';

export const START_HOUR = 6;
export const END_HOUR = 22;
export const TIME_INTERVAL = 5; 

export const COLORS = {
  blue: {
    primary: "bg-blue-600",
    hover: "hover:bg-blue-700",
    light: "bg-blue-50",
    lighter: "bg-blue-25",
    border: "border-blue-200",
    text: "text-blue-600",
  },
  gray: {
    primary: "bg-gray-700",
    hover: "hover:bg-gray-800",
    light: "bg-gray-50",
    lighter: "bg-gray-25",
    border: "border-gray-200",
    text: "text-gray-700",
  },
  teal: {
    primary: "bg-teal-600",
    hover: "hover:bg-teal-700",
    light: "bg-teal-50",
    lighter: "bg-teal-25",
    border: "border-teal-200",
    text: "text-teal-600",
  },
  amber: {
    primary: "bg-amber-600",
    hover: "hover:bg-amber-700",
    light: "bg-amber-50",
    lighter: "bg-amber-25",
    border: "border-amber-200",
    text: "text-amber-600",
  },
  indigo: {
    primary: "bg-indigo-600",
    hover: "hover:bg-indigo-700",
    light: "bg-indigo-50",
    lighter: "bg-indigo-25",
    border: "border-indigo-200",
    text: "text-indigo-600",
  },
};

export const AMBULANCE_COLORS = [
  COLORS.blue,
  COLORS.teal,
  COLORS.indigo,
  COLORS.amber,
  COLORS.gray,
];

export const formatTime = (date: Date | null): string => {
  if (!date) return "";
  return date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const areCoursesTooClose = (
  course1: Course,
  course2: Course,
  minuteThreshold: number = 10
): boolean => {
  if (!course1.scheduledTime || !course2.scheduledTime) return false;

  const time1 = course1.scheduledTime.getTime();
  const time2 = course2.scheduledTime.getTime();
  const diffInMs = Math.abs(time1 - time2);
  const diffInMinutes = diffInMs / (1000 * 60);

  return diffInMinutes < minuteThreshold;
};

export const groupCloseScheduledCourses = (
  courses: Course[],
  minuteThreshold: number = 20
): (Course | CourseGroup)[] => {
  if (courses.length <= 1) return courses;

  const sortedCourses = [...courses].sort((a, b) => {
    if (!a.scheduledTime || !b.scheduledTime) return 0;
    return a.scheduledTime.getTime() - b.scheduledTime.getTime();
  });

  const result: (Course | CourseGroup)[] = [];
  let currentGroup: Course[] = [];

  sortedCourses.forEach((course, index) => {
    if (
      index === 0 ||
      !areCoursesTooClose(course, sortedCourses[index - 1], minuteThreshold)
    ) {
      if (currentGroup.length > 1) {
        const startTime = currentGroup[0].scheduledTime!;
        const endTime = currentGroup[currentGroup.length - 1].scheduledTime!;

        result.push({
          id: `group-${currentGroup.map((c) => c.id).join("-")}`,
          courses: [...currentGroup],
          startTime,
          endTime,
        });

        currentGroup = [course];
      } else if (currentGroup.length === 1) {
        result.push(currentGroup[0]);
        currentGroup = [course];
      } else {
        currentGroup = [course];
      }
    } else {
      currentGroup.push(course);
    }
  });

  if (currentGroup.length > 1) {
    const startTime = currentGroup[0].scheduledTime!;
    const endTime = currentGroup[currentGroup.length - 1].scheduledTime!;

    result.push({
      id: `group-${currentGroup.map((c) => c.id).join("-")}`,
      courses: [...currentGroup],
      startTime,
      endTime,
    });
  } else if (currentGroup.length === 1) {
    result.push(currentGroup[0]);
  }

  return result;
};

export const getAmbulanceColorClass = (colorName: string): string => {
  const baseColor = colorName.split("-")[1];
  return `border-l-2 border-${baseColor}-500`;
};

export const generateMockAmbulances = (count: number): Ambulance[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `amb-${index + 1}`,
    name: `Ambulance ${index + 1}`,
    color: AMBULANCE_COLORS[index % AMBULANCE_COLORS.length].primary,
  }));
};

export const generateMockCourses = (count: number): Course[] => {
  const courses: Course[] = [];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  for (let i = 0; i < count; i++) {
    const minuteIncrement = Math.floor(60 / (count / (END_HOUR - START_HOUR)));
    const totalMinutesPassed = i * minuteIncrement;

    const hour = START_HOUR + Math.floor(totalMinutesPassed / 60);
    const minute = totalMinutesPassed % 60;

    const appointmentTime = new Date(tomorrow);
    appointmentTime.setHours(hour, minute, 0, 0);

    courses.push({
      id: `course-${i + 1}`,
      patientName: `Patient ${i + 1}`,
      pickupAddress: `${Math.floor(Math.random() * 100) + 1} Rue de Paris`,
      destinationAddress: `Hôpital ${String.fromCharCode(
        65 + Math.floor(Math.random() * 5)
      )}`,
      appointmentTime,
      assignedTo: null,
      scheduledTime: null,
    });
  }

  return courses.sort(
    (a, b) => a.appointmentTime.getTime() - b.appointmentTime.getTime()
  );
};