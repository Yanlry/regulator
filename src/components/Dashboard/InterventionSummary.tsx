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

const InterventionSummary = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-2">

      {/* 📌 En-tête */}
      <div className="flex justify-between items-center mb-4">
        <select className="text-sm border rounded-md px-2 py-1">
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
              <h3 className="text-sm font-medium text-gray-500">{item.label}</h3>
              <span className="text-2xl font-bold">{item.value}</span>
            </div>
            {/* Barre de progression */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`${item.barColor} h-2 rounded-full`}
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
            {/* Commentaire */}
            <p className="text-xs text-gray-500 mt-1">{item.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterventionSummary;