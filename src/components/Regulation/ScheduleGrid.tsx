import React, { useState } from 'react';
import { ScheduleGridProps } from '../Regulation/types';   
import HourBlock from './HourBlock';

const ScheduleGrid: React.FC<Omit<ScheduleGridProps, 'ambulances'>> = ({
  tomorrow,
  setHoveredTimeInfo,
  handleDropCourse,
  handleUnassignCourse,
  getCoursesForHour,
}) => {
  // États pour les heures de début et de fin
  const [startHour, setStartHour] = useState(6);
  const [endHour, setEndHour] = useState(22);

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

  // Fonction pour modifier le nom d'une ambulance
  const handleNameChange = (id: string, newName: string) => {
    setAmbulanceNames((prev) => ({
      ...prev,
      [id]: newName,
    }));
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

  return (
    <div className="bg-white rounded-md shadow-sm overflow-hidden border border-gray-200">
      
      {/* Boutons de réglage des heures et du nombre d'ambulances */}
      <div className="flex justify-between p-4 bg-gray-100">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Début :</span>
          <button 
            onClick={() => setStartHour((prev) => Math.max(prev - 1, 0))}
            className="px-2  bg-gray-300 rounded"
          >-</button>
          <span className="text-sm">{startHour}:00</span>
          <button 
            onClick={() => setStartHour((prev) => Math.min(prev + 1, endHour - 1))}
            className="px-2 bg-gray-300 rounded"
          >+</button>
        </div>

         {/* Boutons pour ajouter et supprimer des ambulances */}
         <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Ambulances :</span>
          <button onClick={removeAmbulance} className="px-2 bg-red-500 text-white rounded">-</button>
          <span className="text-sm">{ambulances.length}</span>
          <button onClick={addAmbulance} className="px-2  bg-green-500 text-white rounded">+</button>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Fin :</span>
          <button 
            onClick={() => setEndHour((prev) => Math.max(prev - 1, startHour + 1))}
            className="px-2 bg-gray-300 rounded"
          >-</button>
          <span className="text-sm">{endHour}:00</span>
          <button 
            onClick={() => setEndHour((prev) => Math.min(prev + 1, 24))}
            className="px-2 bg-gray-300 rounded"
          >+</button>
        </div>
      </div>

      {/* Conteneur principal */}
      <div className="overflow-x-auto">
        <div className="min-w-max">
          
          {/* En-tête */}
          <div className="flex">
            <div className="w-16 bg-gray-100 border-b border-r border-gray-200 font-medium text-xs text-gray-500 flex items-center justify-center">
              Heure
            </div>

            {ambulances.map((ambulance) => (
              <div key={ambulance.id} className="flex-1 min-w-[200px]">
                <div className={`${ambulance.color} text-white p-2 font-medium text-sm flex items-center justify-center shadow-sm`}>
                  <input
                    type="text"
                    value={ambulanceNames[ambulance.id]}
                    onChange={(e) => handleNameChange(ambulance.id, e.target.value)}
                    className="bg-transparent border-none text-white text-center outline-none w-full"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Grille des créneaux horaires */}
          <div className="flex">
            <div className="w-16 bg-gray-50 border-r border-gray-200">
              {hours.map((hour, index) => (
                <div
                  key={`hour-${hour}`}
                  className={`relative flex items-center justify-center font-medium text-xs text-gray-500 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                  }`}
                  style={{ height: "100px" }}
                >
                  {`${hour}:00`}
                </div>
              ))}
            </div>

            {/* Colonnes des ambulances */}
            {ambulances.map((ambulance) => (
              <div key={ambulance.id} className="flex-1 min-w-[200px] border-r border-gray-200">
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
