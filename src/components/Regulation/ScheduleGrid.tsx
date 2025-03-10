import React from 'react';
import { ScheduleGridProps } from '../Regulation/types';   
import HourBlock from './HourBlock';


const ScheduleGrid: React.FC<ScheduleGridProps> = ({
  ambulances,
  hours,
  tomorrow,
  hoveredTimeInfo,
  setHoveredTimeInfo,
  handleDropCourse,
  handleUnassignCourse,
  getCoursesForHour,
}) => {
  return (
    <div className="bg-white rounded-md shadow-sm overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <div className="min-w-max">
          {/* En-têtes des ambulances */}
          <div className="flex">
            {/* En-tête de la colonne de temps */}
            <div className="w-16 bg-gray-100 border-b border-r border-gray-200 font-medium text-xs text-gray-500 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 mr-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              Heure
            </div>

            {/* En-têtes des ambulances */}
            {ambulances.map((ambulance) => (
              <div key={ambulance.id} className="flex-1 min-w-[200px]">
                <div
                  className={`${ambulance.color} text-white p-2 font-medium text-sm flex items-center justify-center shadow-sm`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-4a1 1 0 00-1-1h-8a1 1 0 00-.8.4L8.65 8H3V4z" />
                  </svg>
                  {ambulance.name}
                </div>
              </div>
            ))}
          </div>

          {/* Grille des créneaux horaires */}
          <div className="flex">
            {/* Colonne des heures avec étiquettes */}
            <div className="w-16 bg-gray-50 border-r border-gray-200">
              {hours.map((hour, index) => (
                <div
                  key={`hour-${hour}`}
                  className={`relative flex items-center justify-center font-medium text-xs text-gray-500 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                  }`}
                  style={{ height: "100px" }}
                >
                  <div className="flex items-center">
                    {hoveredTimeInfo && hoveredTimeInfo.hour === hour ? (
                      <div className="text-blue-700 font-medium">
                        {`${hour}:${hoveredTimeInfo.minute
                          .toString()
                          .padStart(2, "0")}`}
                      </div>
                    ) : (
                      `${hour}:00`
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Colonnes des ambulances */}
            {ambulances.map((ambulance) => (
              <div
                key={ambulance.id}
                className="flex-1 min-w-[200px] border-r border-gray-200"
              >
                {/* Blocs horaires */}
                {hours.map((hour, hourIndex) => (
                  <HourBlock
                    key={`${ambulance.id}-${hour}`}
                    hour={hour}
                    date={tomorrow}
                    ambulanceId={ambulance.id}
                    ambulance={ambulance}
                    onDropCourse={handleDropCourse}
                    onRemoveCourse={handleUnassignCourse}
                    scheduledCourses={getCoursesForHour(ambulance.id, hour)}
                    isAlternateRow={hourIndex % 2 === 0}
                    onHoverTimeChange={(hourVal, minute) =>
                      setHoveredTimeInfo({ hour: hourVal, minute })
                    }
                    onHoverEnd={() => setHoveredTimeInfo(null)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ScheduleGrid);