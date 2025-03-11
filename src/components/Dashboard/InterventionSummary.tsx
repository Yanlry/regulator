import React from 'react';

const interventionData = [
  {
    label: "Patients transportés",
    value: 58,
    percentage: 75,
    barColor: "bg-blue-600",
    comment: "75% de l'objectif quotidien",
  },
  {
    label: "Temps moyen par intervention",
    value: "32 min",
    percentage: 85,
    barColor: "bg-green-600",
    comment: "15% plus rapide que la moyenne",
  },
  {
    label: "Nombre de retard supérieur à 45min",
    value: "14",
    percentage: 96,
    barColor: "bg-yellow-500",
    comment: "Basé sur 42 évaluations",
  },
  {
    label: "Taux d'occupation des ambulances",
    value: "87%",
    percentage: 87,
    barColor: "bg-blue-600",
    comment: "+5% par rapport à hier",
  },
  {
    label: "Bons de transport validés",
    value: 42,
    percentage: 90,
    barColor: "bg-purple-600",
    comment: "90% des demandes traitées",
  },
  {
    label: "Taux d'activité des ambulances",
    value: "92%",
    percentage: 92,
    barColor: "bg-red-600",
    comment: "Exploitation optimale des véhicules",
  },
  {
    label: "Temps de réponse moyen",
    value: "14 min",
    percentage: 80,
    barColor: "bg-teal-600",
    comment: "Objectif de 15 minutes atteint",
  },
];

interface InterventionSummaryProps {
  theme: string; 
}

const InterventionSummary: React.FC<InterventionSummaryProps> = ({ theme }) => {
  // Theme-specific class definitions
  const containerClasses = `
    rounded-xl shadow-md p-2
    ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
  `;

  const selectClasses = `
    text-sm border rounded-md px-2 py-1
    ${theme === 'dark' ? 'bg-gray-700 text-gray-200 border-gray-600' : 'bg-white text-gray-900 border-gray-300'}
  `;

  const labelClasses = `
    text-sm font-medium
    ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}
  `;

  const valueClasses = `
    text-2xl font-bold
    ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}
  `;

  const progressBackgroundClasses = `
    w-full rounded-full h-2
    ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}
  `;

  const commentClasses = `
    text-xs
    ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
  `;

  return (
    <div className={containerClasses}>
      {/* 📌 En-tête */}
      <div className="flex justify-between items-center mb-4">
        <select className={selectClasses}>
          <option>Aujourd'hui</option>
          <option>Cette semaine</option>
          <option>Ce mois</option>
        </select>
      </div>

      {/* 📊 Conteneur Scrollable */}
      <div className="space-y-6">
        {interventionData.map((item, index) => (
          <div key={index}>
            {/* Titre & Valeur */}
            <div className="flex justify-between items-center mb-2">
              <h3 className={labelClasses}>{item.label}</h3>
              <span className={valueClasses}>{item.value}</span>
            </div>
            {/* Barre de progression */}
            <div className={progressBackgroundClasses}>
              <div
                className={`${item.barColor} h-2 rounded-full`}
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
            {/* Commentaire */}
            <p className={commentClasses}>{item.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterventionSummary;