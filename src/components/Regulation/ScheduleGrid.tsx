import React, { useState } from 'react';
import { ScheduleGridProps } from '../Regulation/types';   
import HourBlock from './HourBlock';
import { useTheme } from '../../contexts/ThemeContext';

// Interface étendue pour inclure le thème
interface ThemeAwareScheduleGridProps extends Omit<ScheduleGridProps, 'ambulances' | 'theme'> {
  theme?: 'dark' | 'light';
}

const ScheduleGrid: React.FC<ThemeAwareScheduleGridProps> = ({
  tomorrow,
  hoveredTimeInfo,
  setHoveredTimeInfo,
  handleDropCourse,
  handleUnassignCourse,
  getCoursesForHour,
  theme: propTheme,
}) => {
  // Récupérer le thème du contexte si non fourni via props
  const themeContext = useTheme();
  const theme = propTheme || themeContext.theme;

  // États pour les heures de début et de fin
  const [startHour, setStartHour] = useState(6);
  const [endHour, setEndHour] = useState(22);

  // État pour suivre si une opération de drag est en cours
  const [isDragging, setIsDragging] = useState(false);

  // Générer les heures dynamiquement
  const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i);

  // État pour stocker dynamiquement les ambulances
  const [ambulances, setAmbulances] = useState([
    { id: '1', name: 'Ambulance 1', color: 'bg-blue-500' },
    { id: '2', name: 'Ambulance 2', color: 'bg-green-500' },
    { id: '3', name: 'Ambulance 3', color: 'bg-purple-500' },
  ]);

  // État pour stocker les noms modifiables des ambulances
  const [ambulanceNames, setAmbulanceNames] = useState(
    ambulances.reduce((acc, ambulance) => {
      acc[ambulance.id] = ambulance.name;
      return acc;
    }, {} as Record<string, string>)
  );

  // Classes CSS adaptatives selon le thème
  const containerClasses = `
    rounded-md shadow-sm overflow-hidden border
    ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'}
  `;

  const controlBarClasses = `
    flex justify-between p-4
    ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}
  `;

  const controlButtonClasses = `
    px-2 rounded 
    ${theme === 'dark' ? 'bg-gray-600 text-gray-300' : 'bg-gray-300 text-gray-700'}
  `;

  const removeButtonClasses = `
    px-2 rounded text-white
    ${theme === 'dark' ? 'bg-red-700 hover:bg-red-800' : 'bg-red-500 hover:bg-red-600'}
  `;

  const addButtonClasses = `
    px-2 rounded text-white
    ${theme === 'dark' ? 'bg-green-700 hover:bg-green-800' : 'bg-green-500 hover:bg-green-600'}
  `;

  const labelClasses = `
    text-sm font-medium
    ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
  `;

  const valueTextClasses = `
    text-sm
    ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
  `;

  const headerCellClasses = `
    w-16 border-b border-r font-medium text-xs flex items-center justify-center
    ${theme === 'dark' 
      ? 'bg-gray-700 border-gray-600 text-gray-400' 
      : 'bg-gray-100 border-gray-200 text-gray-500'}
  `;

  const hourColumnClasses = `
    w-16 border-r relative
    ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}
  `;

  const hourCellBaseClasses = `
    relative flex items-center justify-center font-medium text-xs
    ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
  `;

  const hourCellClasses = (index: number) => `
    ${hourCellBaseClasses}
    ${theme === 'dark'
      ? index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-650'
      : index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'}
  `;

  const timeIndicatorClasses = `
    text-white px-2 py-1 rounded-md text-xs font-medium shadow-md z-50
    ${theme === 'dark' ? 'bg-blue-700' : 'bg-blue-600'}
  `;

  const timeIndicatorLineClasses = `
    absolute left-0 right-0 pointer-events-none
    ${theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'}
  `;

  const minuteMarkerClasses = `
    absolute left-0 right-0 border-t border-dashed pointer-events-none
    ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}
  `;

  const ambulanceColumnClasses = `
    flex-1 min-w-[200px] border-r
    ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}
  `;

  const ambulanceNameInputClasses = `
    bg-transparent border-none text-white text-center outline-none w-full
  `;

  // Fonction pour modifier le nom d'une ambulance
  const handleNameChange = (id: string, newName: string) => {
    setAmbulanceNames((prev) => ({
      ...prev,
      [id]: newName,
    }));
  };

  // Fonctions pour gérer le début et la fin du drag
  const handleDragStart = () => {
    setIsDragging(true);
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
    setHoveredTimeInfo(null);
  };

  // Calculer l'heure formatée avec les minutes
  const getFormattedTime = (hour: number, minute: number) => {
    return `${hour}:${minute.toString().padStart(2, '0')}`;
  };
  
  // Fonction pour déterminer la position verticale de l'indicateur d'heure
  const getTimeIndicatorPosition = () => {
    if (!hoveredTimeInfo) return null;
    
    const { hour, minute } = hoveredTimeInfo;
    // Calculer l'index de l'heure dans notre tableau hours
    const hourIndex = hours.indexOf(hour);
    if (hourIndex === -1) return null;
    
    // Position verticale basée sur l'heure et les minutes (convertit les minutes en pourcentage de 100px)
    return hourIndex * 100 + (minute / 60) * 100;
  };

  // Ajouter une nouvelle ambulance
  const addAmbulance = () => {
    const newId = (ambulances.length + 1).toString();
    const newAmbulance = { 
      id: newId, 
      name: `Ambulance ${newId}`, 
      color: getRandomColor() 
    };

    setAmbulances([...ambulances, newAmbulance]);
    setAmbulanceNames((prev) => ({
      ...prev,
      [newId]: newAmbulance.name,
    }));
  };

  // Supprimer la dernière ambulance
  const removeAmbulance = () => {
    if (ambulances.length > 1) {
      const updatedAmbulances = [...ambulances];
      const removedAmbulance = updatedAmbulances.pop(); // Retire la dernière ambulance
      setAmbulances(updatedAmbulances);

      setAmbulanceNames((prev) => {
        const newNames = { ...prev };
        delete newNames[removedAmbulance!.id]; // Supprime du state des noms
        return newNames;
      });
    }
  };

  // Générer une couleur aléatoire pour l'ambulance
  const getRandomColor = () => {
    const colors = ['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-gray-500'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Déterminer si on doit afficher l'indicateur d'heure
  const showTimeIndicator = isDragging && hoveredTimeInfo;
  const timeIndicatorPosition = getTimeIndicatorPosition();

  return (
    <div className={containerClasses}>
      
      {/* Boutons de réglage des heures et du nombre d'ambulances */}
      <div className={controlBarClasses}>
        <div className="flex items-center space-x-2">
          <span className={labelClasses}>Début :</span>
          <button 
            onClick={() => setStartHour((prev) => Math.max(prev - 1, 0))}
            className={controlButtonClasses}
          >-</button>
          <span className={valueTextClasses}>{startHour}:00</span>
          <button 
            onClick={() => setStartHour((prev) => Math.min(prev + 1, endHour - 1))}
            className={controlButtonClasses}
          >+</button>
        </div>

        {/* Boutons pour ajouter et supprimer des ambulances */}
        <div className="flex items-center space-x-2">
          <span className={labelClasses}>Ambulances :</span>
          <button onClick={removeAmbulance} className={removeButtonClasses}>-</button>
          <span className={valueTextClasses}>{ambulances.length}</span>
          <button onClick={addAmbulance} className={addButtonClasses}>+</button>
        </div>

        <div className="flex items-center space-x-2">
          <span className={labelClasses}>Fin :</span>
          <button 
            onClick={() => setEndHour((prev) => Math.max(prev - 1, startHour + 1))}
            className={controlButtonClasses}
          >-</button>
          <span className={valueTextClasses}>{endHour}:00</span>
          <button 
            onClick={() => setEndHour((prev) => Math.min(prev + 1, 24))}
            className={controlButtonClasses}
          >+</button>
        </div>
      </div>

      {/* Conteneur principal */}
      <div className="overflow-x-auto">
        <div className="min-w-max">
          
          {/* En-tête */}
          <div className="flex">
            <div className={headerCellClasses}>
              Heure
            </div>

            {ambulances.map((ambulance) => (
              <div key={ambulance.id} className="flex-1 min-w-[200px]">
                <div className={`${ambulance.color} text-white p-2 font-medium text-sm flex items-center justify-center shadow-sm`}>
                  <input
                    type="text"
                    value={ambulanceNames[ambulance.id]}
                    onChange={(e) => handleNameChange(ambulance.id, e.target.value)}
                    className={ambulanceNameInputClasses}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Grille des créneaux horaires */}
          <div className="flex">
            {/* Colonne des heures avec indicateur précis */}
            <div className={hourColumnClasses}>
              {hours.map((hour, index) => (
                <div
                  key={`hour-${hour}`}
                  className={hourCellClasses(index)}
                  style={{ height: "100px" }}
                >
                  {`${hour}:00`}
                </div>
              ))}
              
              {/* Indicateur d'heure précise pendant le drag */}
              {showTimeIndicator && timeIndicatorPosition !== null && (
                <div 
                  className="absolute left-0 right-0 flex items-center justify-center pointer-events-none"
                  style={{ top: `${timeIndicatorPosition}px` }}
                >
                  <div className={timeIndicatorClasses}>
                    {getFormattedTime(hoveredTimeInfo.hour, hoveredTimeInfo.minute)}
                  </div>
                  {/* Ligne horizontale traversant toute la grille */}
                  <div className={`${timeIndicatorLineClasses} h-[1px]`}></div>
                </div>
              )}
            </div>

            {/* Colonnes des ambulances */}
            {ambulances.map((ambulance) => (
              <div key={ambulance.id} className={ambulanceColumnClasses}>
                {hours.map((hour, hourIndex) => (
                  <div key={`${ambulance.id}-${hour}`} className="relative">
                    {/* Lignes de marqueurs de minutes (par tranches de 15 minutes) */}
                    <div className={`${minuteMarkerClasses} top-[25px] opacity-50`}></div>
                    <div className={`${minuteMarkerClasses} top-[50px] opacity-70`}></div>
                    <div className={`${minuteMarkerClasses} top-[75px] opacity-50`}></div>
                    
                    {/* Si une course est en cours de déplacement, afficher l'indicateur d'heure comme une ligne horizontale */}
                    {showTimeIndicator && 
                     hoveredTimeInfo.hour === hour && 
                     <div 
                       className={`${timeIndicatorLineClasses} h-[2px] z-10`}
                       style={{ top: `${(hoveredTimeInfo.minute / 60) * 100}px` }}
                     ></div>
                    }
                    
                    <HourBlock
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
                      onHoverEnd={() => !isDragging && setHoveredTimeInfo(null)}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                      theme={theme}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
          
          {/* Ligne indicatrice horizontale qui traverse toute la grille (visible pendant le drag) */}
          {showTimeIndicator && timeIndicatorPosition !== null && (
            <div 
              className={`${timeIndicatorLineClasses} absolute left-16 right-0 h-[1px] z-10`}
              style={{ top: `${timeIndicatorPosition + 37}px` }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ScheduleGrid);