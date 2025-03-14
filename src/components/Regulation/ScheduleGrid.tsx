import React, { useState } from 'react';
import { ScheduleGridProps } from '../Regulation/types';   
import HourBlock from './HourBlock';
import { useTheme } from '../../contexts/ThemeContext';

// Interface étendue pour inclure le thème et la fonction pour vider l'ambulance
interface ThemeAwareScheduleGridProps extends Omit<ScheduleGridProps, 'ambulances' | 'theme'> {
  theme?: 'dark' | 'light';
  handleClearAmbulance?: (ambulanceId: string) => void;
}

const ScheduleGrid: React.FC<ThemeAwareScheduleGridProps> = ({
  tomorrow,
  hoveredTimeInfo,
  setHoveredTimeInfo,
  handleDropCourse,
  handleUnassignCourse,
  getCoursesForHour,
  theme: propTheme,
  handleClearAmbulance,
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
    rounded-lg shadow-md overflow-hidden border transition-all duration-300
    ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
  `;

  const controlBarClasses = `
    flex justify-between items-center px-5 py-4 border-b
    ${theme === 'dark' ? 'bg-gray-750 border-gray-700' : 'bg-gray-50 border-gray-200'}
  `;

  const controlButtonClasses = `
    w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200
    ${theme === 'dark' 
      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 active:bg-gray-650' 
      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 active:bg-gray-250'}
  `;

  const infoDisplayClasses = `
    px-3 py-1.5 rounded-md font-medium min-w-[50px] text-center
    ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-700 shadow-sm border border-gray-200'}
  `;

  const removeButtonClasses = `
    w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200
    text-white
    ${theme === 'dark' 
      ? 'bg-red-700 hover:bg-red-600 active:bg-red-650' 
      : 'bg-red-500 hover:bg-red-600 active:bg-red-550'}
  `;

  const addButtonClasses = `
    w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200
    text-white
    ${theme === 'dark' 
      ? 'bg-green-700 hover:bg-green-600 active:bg-green-650' 
      : 'bg-green-500 hover:bg-green-600 active:bg-green-550'}
  `;

  const clearButtonClasses = `
    ml-2 px-3 py-1 text-xs rounded-md text-white font-medium transition-all duration-200
    ${theme === 'dark' 
      ? 'bg-gray-600 hover:bg-gray-500 active:bg-gray-550' 
      : 'bg-gray-500 hover:bg-gray-600 active:bg-gray-550'}
  `;

  const labelClasses = `
    text-sm font-medium mr-2
    ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
  `;

  const headerCellClasses = `
    w-16 border-b border-r font-medium text-xs flex items-center justify-center
    ${theme === 'dark' 
      ? 'bg-gray-750 border-gray-700 text-gray-400' 
      : 'bg-gray-50 border-gray-200 text-gray-500'}
  `;

  const hourColumnClasses = `
    w-16 border-r relative
    ${theme === 'dark' ? 'bg-gray-750 border-gray-700' : 'bg-gray-50 border-gray-200'}
  `;

  const hourCellBaseClasses = `
    relative flex items-center justify-center font-medium text-xs
    ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
  `;

  const hourCellClasses = (index: number) => `
    ${hourCellBaseClasses}
    ${theme === 'dark'
      ? index % 2 === 0 ? 'bg-gray-750' : 'bg-gray-700'
      : index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
  `;

  const timeIndicatorClasses = `
    text-white px-2 py-1 rounded-md text-xs font-medium shadow-lg z-50 transition-all
    ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'}
  `;

  const timeIndicatorLineClasses = `
    absolute left-0 right-0 pointer-events-none transition-all
    ${theme === 'dark' ? 'bg-blue-500' : 'bg-blue-400'}
  `;

  const minuteMarkerClasses = `
    absolute left-0 right-0 border-t border-dashed pointer-events-none
    ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
  `;

  const ambulanceColumnClasses = `
    flex-1 min-w-[200px] border-r
    ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
  `;

  const ambulanceHeaderClasses = `
    text-white rounded-t-lg transition-transform transform hover:translate-y-[-2px]
    shadow-md font-medium text-sm flex items-center justify-center p-2.5
  `;

  const ambulanceNameInputClasses = `
    bg-transparent border-none text-white text-center font-medium outline-none w-full
    focus:bg-white/10 rounded px-2 py-1 transition-all duration-200
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

  // Fonction pour vider les courses d'une ambulance spécifique
  const onClearAmbulance = (ambulanceId: string) => {
    console.log("Vider ambulance", ambulanceId);
    
    if (handleClearAmbulance) {
      handleClearAmbulance(ambulanceId);
    } else {
      console.warn("La fonction handleClearAmbulance n'est pas définie");
    }
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
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-yellow-500', 'bg-lime-500', 
                   'bg-green-500', 'bg-emerald-500', 'bg-teal-500', 'bg-cyan-500', 'bg-sky-500', 
                   'bg-blue-500', 'bg-indigo-500', 'bg-violet-500', 'bg-purple-500', 'bg-fuchsia-500', 
                   'bg-pink-500', 'bg-rose-500'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Déterminer si on doit afficher l'indicateur d'heure
  const showTimeIndicator = isDragging && hoveredTimeInfo;
  const timeIndicatorPosition = getTimeIndicatorPosition();

  return (
    <div className={containerClasses}>
      
      {/* Boutons de réglage des heures et du nombre d'ambulances */}
      <div className={controlBarClasses}>
        <div className="flex items-center">
          <span className={labelClasses}>Début :</span>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setStartHour((prev) => Math.max(prev - 1, 0))}
              className={controlButtonClasses}
              aria-label="Diminuer l'heure de début"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <span className={infoDisplayClasses}>{startHour}:00</span>
            <button 
              onClick={() => setStartHour((prev) => Math.min(prev + 1, endHour - 1))}
              className={controlButtonClasses}
              aria-label="Augmenter l'heure de début"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Boutons pour ajouter et supprimer des ambulances */}
        <div className="flex items-center">
          <span className={labelClasses}>Ambulances :</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={removeAmbulance}
              className={removeButtonClasses}
              aria-label="Supprimer une ambulance"
              disabled={ambulances.length <= 1}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <span className={infoDisplayClasses}>{ambulances.length}</span>
            <button
              onClick={addAmbulance}
              className={addButtonClasses}
              aria-label="Ajouter une ambulance"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <span className={labelClasses}>Fin :</span>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setEndHour((prev) => Math.max(prev - 1, startHour + 1))}
              className={controlButtonClasses}
              aria-label="Diminuer l'heure de fin"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <span className={infoDisplayClasses}>{endHour}:00</span>
            <button 
              onClick={() => setEndHour((prev) => Math.min(prev + 1, 24))}
              className={controlButtonClasses}
              aria-label="Augmenter l'heure de fin"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Conteneur principal */}
      <div className="overflow-x-auto">
        <div className="min-w-max">
          
          {/* En-tête */}
          <div className="flex">
            <div className={headerCellClasses} style={{ height: "52px" }}>
              Heure
            </div>

            {ambulances.map((ambulance) => (
              <div key={ambulance.id} className="flex-1 min-w-[200px]">
                <div className={`${ambulanceHeaderClasses} ${ambulance.color}`}>
                  <input
                    type="text"
                    value={ambulanceNames[ambulance.id]}
                    onChange={(e) => handleNameChange(ambulance.id, e.target.value)}
                    className={ambulanceNameInputClasses}
                    title="Modifier le nom de l'ambulance"
                  />
                  {/* Bouton pour vider la colonne de l'ambulance */}
                  <button 
                    onClick={() => onClearAmbulance(ambulance.id)}
                    className={clearButtonClasses}
                    title="Vider toutes les courses de cette ambulance"
                  >
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Vider
                    </span>
                  </button>
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
                    <div className={`${minuteMarkerClasses} top-[25px] opacity-30`}></div>
                    <div className={`${minuteMarkerClasses} top-[50px] opacity-50`}></div>
                    <div className={`${minuteMarkerClasses} top-[75px] opacity-30`}></div>
                    
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
              className={`${timeIndicatorLineClasses} absolute left-16 right-0 h-[2px] z-10`}
              style={{ top: `${timeIndicatorPosition + 37}px` }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ScheduleGrid);