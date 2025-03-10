import { useState, useEffect, useCallback, useMemo } from 'react';
import { Ambulance, Course } from '../types';
import { generateMockAmbulances, generateMockCourses } from '../utils';
import { START_HOUR, END_HOUR } from '../constants';

export const useScheduleData = () => {
  // État des données
  const [ambulances, setAmbulances] = useState<Ambulance[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setAmbulances(generateMockAmbulances(5));
        setCourses(generateMockCourses(75));
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleUnassignCourse = useCallback((courseId: string) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId
          ? { ...course, assignedTo: null, scheduledTime: null }
          : course
      )
    );
  }, []);

  const handleDropCourse = useCallback(
    (
      courseId: string,
      ambulanceId: string,
      time: Date
    ) => {
      setCourses((prevCourses) => {
        const targetSlotOccupied = prevCourses.some(
          (c) =>
            c.assignedTo === ambulanceId &&
            c.scheduledTime?.getHours() === time.getHours() &&
            c.scheduledTime?.getMinutes() === time.getMinutes() &&
            c.id !== courseId
        );

        if (targetSlotOccupied) {
          return prevCourses;
        }

        return prevCourses.map((course) => {
          if (course.id === courseId) {
            return {
              ...course,
              assignedTo: ambulanceId,
              scheduledTime: time,
            };
          }
          return course;
        });
      });
    },
    []
  );

  const getCoursesForHour = useCallback(
    (ambulanceId: string, hour: number): Course[] => {
      return courses.filter((course) => {
        if (!course.scheduledTime || course.assignedTo !== ambulanceId)
          return false;
        return course.scheduledTime.getHours() === hour;
      });
    },
    [courses]
  );

  const hours = useMemo(
    () => Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i),
    []
  );

  const unassignedCourses = useMemo(
    () => courses.filter((course) => !course.assignedTo),
    [courses]
  );

  const tomorrow = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date;
  }, []);

  return {
    ambulances,
    courses,
    isLoading,
    hours,
    unassignedCourses,
    tomorrow,
    handleUnassignCourse,
    handleDropCourse,
    getCoursesForHour,
  };
};